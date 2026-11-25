# onekvm-extension-edid-editor

OneKVM HDMI EDID file editor. The editor lists built-in machine presets and
custom files separately. Presets can be viewed and used as a starting point
for editing; saving creates a custom file and keeps the machine preset intact.
Core and the current machine package supply read-only presets in
`/usr/share/onekvm/edid/presets/*.edid.bin` (Core installs the factory preset
every machine shares); this extension bundles no presets.
Custom blobs live in the extension data directory
(`ONEKVM_EXTENSION_DATA/edid/*.edid.bin`). Core Display settings can also apply
the machine presets, even when this extension is not installed.

The overview separates the manufacturer name and PNP ID, shows the source and
EDID version, and marks the preferred display mode. Unknown manufacturer IDs
remain visible without guessing a brand. HEX is collapsed by default and read-only
in View; switch to Edit to change bytes. An incomplete custom PNP ID cannot be
saved. Failed file loads clear the previous identity and disable Apply.
Opening the page or switching back to Current HDMI reads the EDID again, with a
loading indicator until the display information or error is available.

The extension has no resident backend or health check. Its manifest declares
the bundled CLI command and typed arguments for file management, validation
and HDMI methods. The Extension Host starts that command only for a method
request and returns its JSON output.

The extension manages EDID files and applies blobs to the capture chip through
Core's `PUT /api/video/edid`.

## MCP tools

Enable EDID Editor and allow it under MCP's plugin tools policy to use these
tools. Their display text follows the UI language (English, Simplified Chinese
or Traditional Chinese).

| Tool | Arguments | Result |
| --- | --- | --- |
| `edid-editor__list-edids` | none | Built-in presets and custom file IDs, paths and sizes. |
| `edid-editor__read-edid` | `source: preset/custom`, `id` | File bytes as `data_hex`. |
| `edid-editor__save-edid` | `id`, `data_hex` | Creates or replaces a custom file; apply it separately. |
| `edid-editor__delete-edid` | `id` | Deletes a custom file; current HDMI EDID remains in use. |
| `edid-editor__validate-edid` | `data_hex` | Checks length, header and each block checksum; returns size and block count. |
| `edid-editor__read-hdmi` | none | Current HDMI EDID, display summary, write modes and hardware limits. |
| `edid-editor__apply-hdmi` | `data_hex`, `mode: temporary/permanent` | Applies to HDMI and returns `apply_required`. |

Read HDMI capabilities before applying. Temporary mode writes RAM; permanent
mode saves persistently. An unsupported mode fails. Applying can interrupt
video. The returned `apply_required` is `none`, `hotplug`, `reboot` or
`power_cycle`; perform the indicated action separately.

HDMI methods require a Core build with the managed EDID control interface.
They use separate `video.edid.read` and `video.edid.write` capabilities and the
same hardware validation as the Web UI. Presets are read-only. Custom files
accept 128–512 bytes in 128-byte blocks, with compact hexadecimal MCP input.

## Checks

```sh
python3 tests/cli.test.py -v
node tests/edid-format.test.cjs
```

The CLI checks compile a native test executable and use temporary custom-file
directories. They do not write to HDMI.

The editor supports NanoKVM Cube/PCIe/Lite, NanoKVM Pro, NanoKVM Go and PicoKVM. Preinstalled copies
are enabled by default; file operations run on demand without a resident process.

For NanoKVM preset sources and supported modes, see
[onekvm-nanokvm-machine](https://github.com/onekvm/onekvm-nanokvm-machine).
