"""Native CLI contract checks; no device or HDMI writes."""
import json
import os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import socket
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def edid(blocks=1):
    data = bytearray(128 * blocks)
    data[:8] = bytes.fromhex('00ffffffffffff00')
    data[126] = blocks - 1
    data[127] = -sum(data[:127]) % 256
    return bytes(data)


class CLITest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.build = tempfile.TemporaryDirectory(prefix='onekvm-edid-cli-')
        cls.binary = str(Path(cls.build.name) / 'edid')
        cls.control_socket = str(Path(cls.build.name) / 'control.sock')
        subprocess.run(['cc', '-std=c17', '-Wall', '-Wextra', '-Wpedantic', '-Werror',
                        '-DCONTROL_SOCKET="' + cls.control_socket + '"',
                        str(ROOT / 'src/cli.c'), '-o', cls.binary], check=True)

    @classmethod
    def tearDownClass(cls):
        cls.build.cleanup()

    def setUp(self):
        self.data = tempfile.TemporaryDirectory(prefix='onekvm-edid-data-')
        self.addCleanup(self.data.cleanup)
        self.env = {**os.environ, 'ONEKVM_EXTENSION_DATA': self.data.name}

    def invoke(self, *args, ok=True):
        result = subprocess.run([self.binary, *args], env=self.env, capture_output=True, text=True)
        self.assertEqual(result.returncode == 0, ok, result.stderr)
        return json.loads(result.stdout) if ok else result.stderr

    def test_file_roundtrip_replacement_and_delete(self):
        for blocks in [1, 2, 4]:
            content = edid(blocks).hex()
            self.invoke('save', 'test-edid', content)
            listed = self.invoke('list')['custom']
            self.assertEqual([(f['id'], f['size']) for f in listed], [('test-edid', blocks * 128)])
            self.assertEqual(self.invoke('read', 'custom', 'test-edid')['data_hex'], content)
        self.invoke('delete', 'test-edid')
        self.assertEqual(self.invoke('list')['custom'], [])

    def test_validation_and_rejections_preserve_saved_file(self):
        content = edid().hex()
        self.invoke('save', 'original', content)
        self.assertEqual(self.invoke('validate', content), {'ok': True, 'valid': True, 'size': 128, 'blocks': 1})
        for bad in ['', '00', 'ff' * 128, edid().hex()[:-2] + '00', edid(4).hex() + '00']:
            self.invoke('validate', bad, ok=False)
            self.invoke('save', 'original', bad, ok=False)
            self.assertEqual(self.invoke('read', 'custom', 'original')['data_hex'], content)
        for bad_id in ['../original', 'x"', 'original","data_hex":"00', 'A', 'a' * 64]:
            self.invoke('save', bad_id, content, ok=False)
            self.invoke('read', 'custom', bad_id, ok=False)
            self.invoke('delete', bad_id, ok=False)
        self.invoke('read', 'other', 'original', ok=False)
        self.assertIn('mode must', self.invoke('apply-hdmi', content, 'auto', ok=False))
        self.assertIn('invalid', self.invoke('apply-hdmi', '00', 'temporary', ok=False))
        self.assertEqual(self.invoke('list')['custom'][0]['id'], 'original')

    def test_oversized_files_are_not_silently_truncated(self):
        directory = Path(self.data.name) / 'edid'
        directory.mkdir()
        (directory / 'oversize.edid.bin').write_bytes(edid(4) + b'\0')
        self.invoke('read', 'custom', 'oversize', ok=False)
        self.assertEqual(self.invoke('list')['custom'], [])

    def mock_control(self, args, response, ok=True):
        def serve(listener):
            connection, _ = listener.accept()
            with connection:
                connection.settimeout(5)
                request = b''
                while b'\r\n\r\n' not in request:
                    request += connection.recv(4096)
                headers, body = request.split(b'\r\n\r\n', 1)
                length = next(int(line.split(b':', 1)[1]) for line in headers.split(b'\r\n') if line.startswith(b'Content-Length:'))
                while len(body) < length:
                    body += connection.recv(4096)
                for chunk in response:
                    connection.sendall(chunk)
                return headers.decode(), body.decode()

        with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as listener:
            listener.settimeout(5)
            listener.bind(self.control_socket)
            try:
                listener.listen(1)
                with ThreadPoolExecutor(max_workers=1) as executor:
                    future = executor.submit(serve, listener)
                    result = self.invoke(*args, ok=ok)
                    request = future.result(timeout=5)
            finally:
                os.unlink(self.control_socket)
        self.assertIn('X-OneKVM-Extension: edid-editor', request[0])
        return result, request

    def test_managed_control_requests_and_http_errors(self):
        body = b'{"supported":true,"data_hex":"fixture"}'
        response = [b'HTTP/1.0 200 OK\r\ncontent-length: ' + str(len(body)).encode() + b'\r\n\r\n', body[:10], body[10:]]
        result, request = self.mock_control(['read-hdmi'], response)
        self.assertTrue(result['supported'])
        self.assertTrue(request[0].startswith('GET /api/video/edid HTTP/1.0'))
        self.assertEqual(request[1], '')
        for mode in ['temporary', 'permanent']:
            result, request = self.mock_control(['apply-hdmi', edid().hex().upper(), mode], response)
            self.assertTrue(request[0].startswith('PUT /api/video/edid HTTP/1.0'))
            self.assertEqual(json.loads(request[1]), {'data_hex': edid().hex(), 'mode': mode})
        error, _ = self.mock_control(['read-hdmi'], [b'HTTP/1.0 403 Forbidden\r\n\r\n{"error":"denied"}'], ok=False)
        self.assertIn('denied', error)
        error, _ = self.mock_control(['read-hdmi'], [b'HTTP/1.0 200 OK\r\nContent-Length: 100\r\n\r\n{}'], ok=False)
        self.assertIn('incomplete', error)

    def test_tool_schemas_methods_and_translations(self):
        manifest = json.loads((ROOT / 'manifest.json.in').read_text())
        methods = {m['name']: m for m in manifest['methods']}
        self.assertEqual(len(manifest['contributions']), 7)
        self.assertEqual(set(manifest['capabilities']), {'video.edid.read', 'video.edid.write'})
        for tool in manifest['contributions']:
            data = tool['data']
            args = methods[tool['method']]['args']
            self.assertEqual(set(data['inputSchema']['properties']), {a['name'] for a in args})
            self.assertEqual(set(data['inputSchema']['required']), {a['name'] for a in args if a['required']})
            self.assertFalse(data['inputSchema']['additionalProperties'])
            self.assertEqual(data['i18n']['default'], {'title': data['title'], 'description': data['description']})
            for locale in ['default', 'zh', 'zh-TW']:
                self.assertTrue(data['i18n'][locale]['title'])
                self.assertTrue(data['i18n'][locale]['description'])
            self.assertLess(len(json.dumps(tool, ensure_ascii=False).encode()), 16384)


if __name__ == '__main__':
    unittest.main()
