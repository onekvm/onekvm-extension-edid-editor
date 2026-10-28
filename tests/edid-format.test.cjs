const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const source = fs.readFileSync(path.join(__dirname, '../web/page.js'), 'utf8')
const context = vm.createContext({ TextEncoder, TextDecoder })
vm.runInContext(source.slice(source.indexOf('  const BLOCK ='), source.indexOf('  function fileIdFromName')) + '\nglobalThis.edid = {writeName, writeCEA, rebuildEdid, TEMPLATES, validEdid};', context)
const {writeName, writeCEA, rebuildEdid, TEMPLATES, validEdid} = context.edid
for (const name of ['OneKVM', '1234567890123', '显示器😀'.repeat(8), 'bad\nname\0']) {
  const bytes = new Uint8Array(20).fill(0xaa)
  writeName(bytes.subarray(1, 19), name)
  assert.equal(bytes[0], 0xaa)
  assert.equal(bytes[19], 0xaa)
  assert.deepEqual(Array.from(bytes.slice(1, 6)), [0, 0, 0, 0xfc, 0])
  assert.ok(Array.from(bytes.slice(6, 19)).every(b => b === 10 || (b >= 32 && b <= 126)))
}
for (const vics of [[16], [16, 4], [95, 16, 4]]) {
  const cta = new Uint8Array(128)
  writeCEA(cta, vics, [TEMPLATES[2]])
  assert.equal(cta[4] >> 5, 2)
  assert.equal(cta[4] & 31, vics.length)
  assert.deepEqual(Array.from(cta.slice(5, 5 + vics.length)), vics)
  assert.equal(cta[2], 5 + vics.length)
  assert.notEqual(cta[cta[2]] | cta[cta[2] + 1] << 8, 0)
}
for (const template of TEMPLATES) {
  const bytes = rebuildEdid(null, 'OKV', 'OneKVM', [{...template, preferred: true}])
  assert.ok(validEdid(bytes))
  assert.equal(bytes[75], 0xfc)
  const length = bytes[132] & 31
  assert.ok(Array.from(bytes.slice(133, 133 + length)).every(vic => vic > 0 && vic < 128))
}
console.log('EDID descriptor bounds/ASCII, CTA VIC payload/DTD boundary and preset rebuild checks passed')
