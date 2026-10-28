(() => {
  const runtime = window.OneKVMPluginUI.v1
  const { computed, defineComponent, h, onMounted, ref, watch } = runtime.vue
  const { NAlert, NButton, NCollapse, NCollapseItem, NInput, NInputNumber, NSelect, NSpin, NTabPane, NTabs, useDialog, useMessage } = runtime.naive
  const t = runtime.i18n.createTranslator({
    default: {
      title: 'EDID files',
      description: 'View display identity and modes, or edit a preset and save a custom EDID.',
      tabView: 'View',
      tabEdit: 'Edit',
      load: 'Load',
      importFile: 'Import',
      identity: 'Identity',
      manufacturer: 'Manufacturer',
      manufacturerId: 'PNP ID',
      manufacturerInvalid: 'Enter exactly three letters (A–Z).',
      version: 'EDID version',
      manufacturerPreset: 'Vendor preset',
      manufacturerCustom: 'Custom ID',
      customOption: 'Custom…',
      manufacturerHint: 'EDID encodes the vendor as three A–Z letters (VESA PNP). Pick a preset or type your own. Put the full model in the monitor name (13 characters).',
      name: 'Monitor name',
      timings: 'Declared timings',
      preferred: 'Preferred',
      addTiming: 'Add timing',
      addCustomTiming: 'Add custom timing',
      removeTiming: 'Remove',
      template: 'Add from template',
      width: 'Width',
      height: 'Height',
      fps: 'Refresh (Hz)',
      pixclk: 'Pixel clock (10 kHz)',
      hblank: 'H blank',
      vblank: 'V blank',
      hex: 'EDID hex',
      hexViewer: 'HEX viewer',
      hexEditor: 'HEX editor',
      hexHint: 'Click a byte, then type 0-9 or A-F. Drag or Shift-click to select a range. Digits overwrite in place.',
      customParams: 'Custom parameters',
      importAlert: 'Import a *.edid.bin file into this editor. It is not saved until you click Save.',
      imported: 'Imported into the editor. Save if you want to keep the file.',
      hso: 'H sync start',
      hsw: 'H sync width',
      vso: 'V sync start',
      vsw: 'V sync width',
      fileName: 'File name',
      filePlaceholder: 'my-display.edid.bin',
      save: 'Save custom file',
      remove: 'Delete custom file',
      apply: 'Apply to HDMI',
      applyHint: 'Apply the current EDID to the HDMI input.',
      empty: 'No EDID loaded yet.',
      invalidName: 'Use a file name like my-display.edid.bin.',
      invalidEdid: 'EDID blob is invalid.',
      invalidImport: 'Import a file named *.edid.bin. It is only loaded into this page.',
      presetReadOnly: 'Machine presets cannot be overwritten here. Save a custom file name instead.',
      saved: 'Custom EDID file saved.',
      deleted: 'Custom EDID file deleted.',
      applied: 'Applied.',
      appliedHotplug: 'Applied.',
      appliedReboot: 'Saved. It takes effect after this device restarts.',
      appliedPower: 'Saved. It takes effect after this device is powered off and on again.',
      hdmi: 'Current HDMI',
      loadingHdmi: 'Reading current HDMI EDID…',
      loadingFile: 'Loading EDID…',
      presets: 'Built-in presets', common: 'Common',
      factory: 'Factory preset',
      custom: 'Custom files',
      groupHdmi: 'HDMI',
      noHdmi: 'Current HDMI EDID is unavailable.',
      source: 'Source',
      size: 'Size',
      importedDraft: 'Imported into editor (not saved)',
    },
    zh: {
      title: 'EDID 文件',
      description: '查看显示器信息和支持模式，或编辑预设后另存为自定义 EDID。',
      tabView: '查看',
      tabEdit: '编辑',
      load: '打开',
      importFile: '导入',
      identity: '标识',
      manufacturer: '厂商',
      manufacturerId: 'PNP 厂商 ID',
      manufacturerInvalid: '请输入完整的 3 个 A–Z 字母。',
      version: 'EDID 版本',
      manufacturerPreset: '厂商预设',
      manufacturerCustom: '自定义 ID',
      customOption: '自定义…',
      manufacturerHint: 'EDID 只能把厂商编码成 3 个 A–Z 字母（VESA PNP）。可从列表选择，或自己输入。完整型号写在显示器名称里（最多 13 个字符）。',
      name: '显示器名称',
      timings: '声明的时序',
      preferred: '首选',
      addTiming: '添加时序',
      addCustomTiming: '添加自定义时序',
      removeTiming: '删除',
      template: '从模板添加',
      width: '宽度',
      height: '高度',
      fps: '刷新率（Hz）',
      pixclk: '像素时钟（10 kHz）',
      hblank: '水平消隐',
      vblank: '垂直消隐',
      hex: 'EDID 十六进制',
      hexViewer: 'HEX 查看器',
      hexEditor: 'HEX 编辑器',
      hexHint: '点击字节，再输入 0-9 或 A-F。拖动或按住 Shift 点击可以框选。按位覆盖，不会插入。',
      customParams: '自定义参数',
      importAlert: '导入 *.edid.bin 到本页编辑器。点保存之前不会写盘。',
      imported: '已导入编辑器。若要保留文件，请再保存。',
      hso: '水平同步起点',
      hsw: '水平同步宽度',
      vso: '垂直同步起点',
      vsw: '垂直同步宽度',
      fileName: '文件名',
      filePlaceholder: 'my-display.edid.bin',
      save: '保存自定义文件',
      remove: '删除自定义文件',
      apply: '应用到 HDMI',
      applyHint: '将当前 EDID 应用到 HDMI 输入。',
      empty: '尚未载入 EDID。',
      invalidName: '文件名形如 my-display.edid.bin。',
      invalidEdid: 'EDID 内容无效。',
      invalidImport: '请导入名为 *.edid.bin 的文件。导入只进入本页，不会保存。',
      presetReadOnly: '机型预设不能在这里覆盖。请另存为自定义文件名。',
      saved: '已保存自定义 EDID 文件。',
      deleted: '已删除自定义 EDID 文件。',
      applied: '已应用。',
      appliedHotplug: '已应用。',
      appliedReboot: '已写入。重启本机后才会生效。',
      appliedPower: '已写入。给本机断电再上电后才会生效。',
      hdmi: '当前 HDMI',
      loadingHdmi: '正在读取当前 HDMI EDID…',
      loadingFile: '正在载入 EDID…',
      presets: '内置预设', common: '常用',
      factory: '出厂预设',
      custom: '自定义文件',
      groupHdmi: 'HDMI',
      noHdmi: '当前 HDMI EDID 不可用。',
      source: '来源',
      size: '大小',
      importedDraft: '已导入编辑器（未保存）',
    },
    'zh-TW': {
      title: 'EDID 檔案',
      description: '檢視顯示器資訊和支援模式，或編輯預設後另存為自訂 EDID。',
      tabView: '檢視',
      tabEdit: '編輯',
      load: '開啟',
      importFile: '匯入',
      identity: '識別',
      manufacturer: '廠商',
      manufacturerId: 'PNP 廠商 ID',
      manufacturerInvalid: '請輸入完整的 3 個 A–Z 字母。',
      version: 'EDID 版本',
      manufacturerPreset: '廠商預設',
      manufacturerCustom: '自訂 ID',
      customOption: '自訂…',
      manufacturerHint: 'EDID 只能把廠商編碼成 3 個 A–Z 字母（VESA PNP）。可從清單選擇，或自行輸入。完整型號寫在顯示器名稱裡（最多 13 個字元）。',
      name: '顯示器名稱',
      timings: '宣告的時序',
      preferred: '首選',
      addTiming: '新增時序',
      addCustomTiming: '新增自訂時序',
      removeTiming: '刪除',
      template: '從範本新增',
      width: '寬度',
      height: '高度',
      fps: '重新整理（Hz）',
      pixclk: '像素時脈（10 kHz）',
      hblank: '水平消隱',
      vblank: '垂直消隱',
      hex: 'EDID 十六進位',
      hexViewer: 'HEX 檢視器',
      hexEditor: 'HEX 編輯器',
      hexHint: '點一下位元組，再輸入 0-9 或 A-F。拖曳或按住 Shift 點擊可以框選。就地覆蓋，不會插入。',
      customParams: '自訂參數',
      importAlert: '匯入 *.edid.bin 到本頁編輯器。按儲存之前不會寫入磁碟。',
      imported: '已匯入編輯器。若要保留檔案，請再儲存。',
      hso: '水平同步起點',
      hsw: '水平同步寬度',
      vso: '垂直同步起點',
      vsw: '垂直同步寬度',
      fileName: '檔名',
      filePlaceholder: 'my-display.edid.bin',
      save: '儲存自訂檔案',
      remove: '刪除自訂檔案',
      apply: '套用到 HDMI',
      applyHint: '將目前 EDID 套用至 HDMI 輸入。',
      empty: '尚未載入 EDID。',
      invalidName: '檔名形如 my-display.edid.bin。',
      invalidEdid: 'EDID 內容無效。',
      invalidImport: '請匯入名為 *.edid.bin 的檔案。匯入只進入本頁，不會儲存。',
      presetReadOnly: '機型預設不能在這裡覆蓋。請另存為自訂檔名。',
      saved: '已儲存自訂 EDID 檔案。',
      deleted: '已刪除自訂 EDID 檔案。',
      applied: '已套用。',
      appliedHotplug: '已套用。',
      appliedReboot: '已寫入。重新啟動本機後才會生效。',
      appliedPower: '已寫入。為本機斷電再上電後才會生效。',
      hdmi: '目前 HDMI',
      loadingHdmi: '正在讀取目前 HDMI EDID…',
      loadingFile: '正在載入 EDID…',
      presets: '內建預設', common: '常用',
      factory: '出廠預設',
      custom: '自訂檔案',
      groupHdmi: 'HDMI',
      noHdmi: '目前 HDMI EDID 無法取得。',
      source: '來源',
      size: '大小',
      importedDraft: '已匯入編輯器（未儲存）',
    },
  })

  const BLOCK = 128
  const SUFFIX = '.edid.bin'
  const ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,62}$/
  const PNP_CUSTOM = '__custom__'
  const PNP_PRESETS = [
    { id: 'OKV', name: 'OneKVM' },
    { id: 'SAM', name: 'Samsung' },
    { id: 'LGD', name: 'LG Display' },
    { id: 'GSM', name: 'LG' },
    { id: 'DEL', name: 'Dell' },
    { id: 'HPN', name: 'HP' },
    { id: 'ACR', name: 'Acer' },
    { id: 'AUS', name: 'ASUS' },
    { id: 'MSI', name: 'MSI' },
    { id: 'LEN', name: 'Lenovo' },
    { id: 'APP', name: 'Apple' },
    { id: 'SNY', name: 'Sony' },
    { id: 'VSC', name: 'ViewSonic' },
    { id: 'BNQ', name: 'BenQ' },
    { id: 'AOC', name: 'AOC' },
    { id: 'PHL', name: 'Philips' },
    { id: 'SHP', name: 'Sharp' },
    { id: 'TSB', name: 'Toshiba' },
    { id: 'NEC', name: 'NEC' },
    { id: 'IVM', name: 'Iiyama' },
    { id: 'AUO', name: 'AU Optronics' },
    { id: 'BOE', name: 'BOE' },
    { id: 'CMN', name: 'Chi Mei' },
    { id: 'QDS', name: 'Quanta Display' },
  ]
  function pnpLabel(id) {
    const hit = PNP_PRESETS.find((item) => item.id === id)
    return hit ? hit.name : /^[A-Z]{3}$/.test(id) ? id : '—'
  }
  const TEMPLATES = [
    { id: '1620p30', label: '2880×1620 @ 30', width: 2880, height: 1620, fps: 30, pixclk: 15048, hblank: 160, vblank: 30, hso: 48, hsw: 32, vso: 3, vsw: 5 },
    { id: '1080p60', label: '1920×1080 @ 60', width: 1920, height: 1080, fps: 60, pixclk: 14850, hblank: 280, vblank: 45, hso: 88, hsw: 44, vso: 4, vsw: 5 },
    { id: '1440p30', label: '2560×1440 @ 30', width: 2560, height: 1440, fps: 30, pixclk: 12036, hblank: 160, vblank: 35, hso: 48, hsw: 32, vso: 3, vsw: 5 },
    { id: '720p90', label: '1280×720 @ 90', width: 1280, height: 720, fps: 90, pixclk: 11286, hblank: 370, vblank: 40, hso: 110, hsw: 40, vso: 5, vsw: 5 },
    { id: '720p120', label: '1280×720 @ 120', width: 1280, height: 720, fps: 120, pixclk: 14850, hblank: 370, vblank: 30, hso: 110, hsw: 40, vso: 5, vsw: 5 },
    { id: '1080p30', label: '1920×1080 @ 30', width: 1920, height: 1080, fps: 30, pixclk: 7425, hblank: 280, vblank: 45, hso: 88, hsw: 44, vso: 4, vsw: 5 },
    { id: '720p60', label: '1280×720 @ 60', width: 1280, height: 720, fps: 60, pixclk: 7425, hblank: 370, vblank: 30, hso: 110, hsw: 40, vso: 5, vsw: 5 },
  ]

  function clampInt(value, min, max, fallback) {
    const n = value | 0
    if (!Number.isFinite(n)) return fallback
    if (n < min) return min
    if (n > max) return max
    return n
  }

  function timingFromMode(width, height, fps) {
    const mode = {
      width: clampInt(width, 640, 4096, 1920),
      height: clampInt(height, 480, 2160, 1080),
      fps: clampInt(fps, 24, 240, 60),
    }
    const known = TEMPLATES.find((item) => item.width === mode.width && item.height === mode.height && item.fps === mode.fps)
    if (known) return { width: known.width, height: known.height, fps: known.fps, pixclk: known.pixclk, hblank: known.hblank, vblank: known.vblank, hso: known.hso, hsw: known.hsw, vso: known.vso, vsw: known.vsw }
    const hblank = 160
    const hso = 48
    const hsw = 32
    const vso = 3
    const vsw = 5
    const htotal = mode.width + hblank
    for (let vblank = 25; vblank <= 120; vblank++) {
      const vtotal = mode.height + vblank
      const product = mode.fps * htotal * vtotal
      if (product % 10000 !== 0) continue
      const pixclk = product / 10000
      if (pixclk < 2500 || pixclk > 60000) continue
      if (((pixclk * 10000) / (htotal * vtotal) | 0) !== mode.fps) continue
      return { ...mode, pixclk, hblank, vblank, hso, hsw, vso, vsw }
    }
    const vblank = 37
    const pixclk = clampInt(Math.round(mode.fps * htotal * (mode.height + vblank) / 10000), 2500, 60000, 14850)
    return { ...mode, pixclk, hblank, vblank, hso, hsw, vso, vsw }
  }
  const VICS = [
    { vic: 4, width: 1280, height: 720, fps: 60 },
    { vic: 16, width: 1920, height: 1080, fps: 60 },
    { vic: 31, width: 1920, height: 1080, fps: 50 },
    { vic: 34, width: 1920, height: 1080, fps: 30 },
    { vic: 47, width: 1280, height: 720, fps: 120 },
    { vic: 63, width: 1920, height: 1080, fps: 120 },
    { vic: 95, width: 3840, height: 2160, fps: 30 },
    { vic: 97, width: 3840, height: 2160, fps: 60 },
  ]

  function bytesFromHex(value) {
    const hex = String(value || '').replace(/\s+/g, '')
    if (!hex || hex.length % 2 !== 0 || /[^0-9a-fA-F]/.test(hex)) return null
    const out = new Uint8Array(hex.length / 2)
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
    return out
  }

  function hexFromBytes(data) {
    return Array.from(data, (value) => value.toString(16).padStart(2, '0')).join('')
  }

  function validEdid(data) {
    if (!data || data.length < BLOCK || data.length % BLOCK !== 0 || data.length > 512) return false
    const header = [0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00]
    for (let i = 0; i < 8; i++) if (data[i] !== header[i]) return false
    for (let block = 0; block < data.length / BLOCK; block++) {
      let sum = 0
      for (let i = 0; i < BLOCK; i++) sum = (sum + data[block * BLOCK + i]) & 0xff
      if (sum !== 0) return false
    }
    return true
  }

  function fixChecksums(data) {
    for (let block = 0; block < data.length / BLOCK; block++) {
      const start = block * BLOCK
      let sum = 0
      for (let i = 0; i < BLOCK - 1; i++) sum = (sum + data[start + i]) & 0xff
      data[start + BLOCK - 1] = (-sum) & 0xff
    }
  }

  function manufacturerOf(data) {
    const id = (data[8] << 8) | data[9]
    const letters = String.fromCharCode(((id >> 10) & 0x1f) + 64, ((id >> 5) & 0x1f) + 64, (id & 0x1f) + 64)
    return /^[A-Z]{3}$/.test(letters) ? letters : ''
  }

  function writeManufacturer(data, value) {
    const text = String(value || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3).padEnd(3, 'A')
    const packed = ((text.charCodeAt(0) - 64) << 10) | ((text.charCodeAt(1) - 64) << 5) | (text.charCodeAt(2) - 64)
    data[8] = (packed >> 8) & 0xff
    data[9] = packed & 0xff
  }

  function monitorNameOf(data) {
    for (let offset = 54; offset + 18 <= BLOCK; offset += 18) {
      if (data[offset] !== 0 || data[offset + 1] !== 0 || data[offset + 2] !== 0 || data[offset + 3] !== 0xfc) continue
      return new TextDecoder().decode(data.subarray(offset + 5, offset + 18)).split('\n')[0].trim()
    }
    return ''
  }

  function writeName(dst, name) {
    dst.fill(0)
    dst[3] = 0xfc
    const text = new TextEncoder().encode(String(name || '').replace(/[^\x20-\x7e]/g, '?').slice(0, 13))
    dst.set(text, 5)
    if (text.length < 13) {
      dst[5 + text.length] = 0x0a
      dst.fill(0x20, 6 + text.length, 18)
    }
  }

  function writeRange(dst, fps) {
    dst.fill(0)
    dst[3] = 0xfd
    dst[5] = 15
    dst[6] = Math.max(15, Math.min(255, fps | 0))
    dst[7] = 15
    dst[8] = 255
    dst[9] = 0
    dst[10] = 0x0a
    dst.fill(0x20, 11, 18)
  }

  function writeDTD(dst, fields) {
    dst.fill(0)
    dst[0] = fields.pixclk & 0xff
    dst[1] = (fields.pixclk >> 8) & 0xff
    dst[2] = fields.width & 0xff
    dst[3] = fields.hblank & 0xff
    dst[4] = ((fields.width >> 8) << 4) | ((fields.hblank >> 8) & 0x0f)
    dst[5] = fields.height & 0xff
    dst[6] = fields.vblank & 0xff
    dst[7] = ((fields.height >> 8) << 4) | ((fields.vblank >> 8) & 0x0f)
    dst[8] = fields.hso & 0xff
    dst[9] = fields.hsw & 0xff
    dst[10] = ((fields.vso & 0x0f) << 4) | (fields.vsw & 0x0f)
    dst[11] = ((fields.hso >> 8) << 6) | ((fields.hsw >> 8) << 4) | ((fields.vso >> 8) << 2) | (fields.vsw >> 8)
    dst[17] = 0x1e
  }

  function parseDTD(data, offset) {
    if (offset + 18 > data.length) return null
    if (data[offset] === 0 && data[offset + 1] === 0) return null
    const pixclk = data[offset] | (data[offset + 1] << 8)
    if (pixclk === 0) return null
    const width = data[offset + 2] | ((data[offset + 4] >> 4) << 8)
    const hblank = data[offset + 3] | ((data[offset + 4] & 0x0f) << 8)
    const height = data[offset + 5] | ((data[offset + 7] >> 4) << 8)
    const vblank = data[offset + 6] | ((data[offset + 7] & 0x0f) << 8)
    const hso = data[offset + 8] | ((data[offset + 11] >> 6) << 8)
    const hsw = data[offset + 9] | (((data[offset + 11] >> 4) & 0x03) << 8)
    const vso = ((data[offset + 10] >> 4) & 0x0f) | (((data[offset + 11] >> 2) & 0x03) << 4)
    const vsw = (data[offset + 10] & 0x0f) | ((data[offset + 11] & 0x03) << 4)
    const htotal = width + hblank
    const vtotal = height + vblank
    const fps = htotal > 0 && vtotal > 0 ? Math.round((pixclk * 10000) / (htotal * vtotal)) : 0
    if (!width || !height) return null
    return { width, height, fps, pixclk, hblank, vblank, hso, hsw, vso, vsw, preferred: false }
  }

  function parseTimings(data) {
    const timings = []
    const first = parseDTD(data, 54)
    if (first) {
      first.preferred = true
      timings.push(first)
    }
    for (let offset = 72; offset + 18 <= BLOCK; offset += 18) {
      const timing = parseDTD(data, offset)
      if (timing) timings.push(timing)
    }
    if (data.length >= 256 && data[128] === 0x02) {
      const dtdOff = data[130]
      if (dtdOff >= 4) {
        for (let offset = 128 + dtdOff; offset + 18 <= 255; offset += 18) {
          const timing = parseDTD(data, offset)
          if (timing) timings.push(timing)
        }
      }
    }
    if (!timings.length) timings.push({ ...TEMPLATES[0], preferred: true })
    return timings
  }

  function vicsFor(timings) {
    const vics = []
    for (const timing of timings) {
      const hit = VICS.find((item) => item.width === timing.width && item.height === timing.height && item.fps === timing.fps)
      if (hit && !vics.includes(hit.vic)) vics.push(hit.vic)
    }
    // Do not claim a CTA VIC that is absent from the requested timings.  The
    // base-block DTD remains the preferred mode; VIC 1 is only a safe legacy
    // fallback for sources that require a CTA video mode.
    return vics.length ? vics : [1]
  }

  function writeCEA(dst, vics, extra) {
    dst.fill(0)
    dst[0] = 0x02
    dst[1] = 0x03
    // The preferred timing is in the base block.  CTA DTDs are additional
    // modes, so none of them is marked native.
    dst[3] = 0xf0
    let offset = 4
    dst[offset] = 0x40 | vics.length
    for (let i = 0; i < vics.length; i++) dst[offset + 1 + i] = vics[i] & 0xff
    offset += 1 + vics.length
    dst[2] = offset
    for (const timing of extra) {
      if (offset + 18 > 127) break
      writeDTD(dst.subarray(offset, offset + 18), timing)
      offset += 18
    }
  }

  function rebuildEdid(base, manufacturer, name, timings) {
    const list = timings.length ? timings : [{ ...TEMPLATES[0], preferred: true }]
    const preferred = list.find((item) => item.preferred) || list[0]
    const extras = list.filter((item) => item !== preferred)
    const data = new Uint8Array(256)
    if (base && base.length) data.set(base.subarray(0, Math.min(base.length, 256)))
    else {
      data.set([0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00])
      data[10] = 0x01
      data[16] = 1
      data[17] = 36
      data[18] = 1
      data[19] = 4
      data[20] = 0x80
      data[21] = 37
      data[22] = 21
      data[23] = 120
      data[24] = 0x0a
    }
    writeManufacturer(data, manufacturer)
    writeDTD(data.subarray(54, 72), preferred)
    writeName(data.subarray(72, 90), name)
    writeRange(data.subarray(90, 108), Math.max(...list.map((item) => item.fps | 0)))
    let ceaExtras = extras
    if (extras.length) {
      writeDTD(data.subarray(108, 126), extras[0])
      ceaExtras = extras.slice(1)
    } else data.fill(0, 108, 126)
    data[126] = 1
    writeCEA(data.subarray(128, 256), vicsFor(list), ceaExtras)
    fixChecksums(data)
    return data
  }

  function fileIdFromName(value) {
    let name = String(value || '').trim().split('/').pop() || ''
    const lower = name.toLowerCase()
    if (lower.endsWith(SUFFIX)) return name.slice(0, -SUFFIX.length)
    if (lower.endsWith('.bin')) return name.slice(0, -4)
    return name
  }

  function fileLabel(id) {
    return id ? `${id}${SUFFIX}` : ''
  }

  function presetLabel(id) {
    if (id === 'factory') return t('factory')
    const mode = presetMode(id)
    return mode ? `${mode[0]}×${mode[1]} @ ${mode[2]} Hz` : id
  }

  const ASPECT_RATIOS = ['1:1', '5:4', '4:3', '3:2', '16:10', '16:9', '17:9', '21:9', '32:9', '9:16']
  function presetMode(id) {
    const explicit = /^(\d{3,4})x(\d{3,4})p(\d{2,3})$/.exec(id)
    if (explicit) return explicit.slice(1).map(Number)
    const labels = {
      '720p60': [1280, 720, 60], '720p90': [1280, 720, 90], '720p120': [1280, 720, 120],
      '1080p60': [1920, 1080, 60], '1080p120': [1920, 1080, 120],
      '1440p30': [2560, 1440, 30], '1440p60': [2560, 1440, 60],
      '1620p30': [2880, 1620, 30], '2160p30': [3840, 2160, 30],
    }
    return labels[id]
  }

  function presetAliases(mode) {
    if (!mode) return []
    return ({
      '640x480': ['480p', 'VGA'], '854x480': ['480p', 'FWVGA'],
      '1280x720': ['720p', 'HD'], '1920x1080': ['1080p', 'FHD'],
      '2560x1440': ['2K', 'QHD', '1440p'], '3840x2160': ['4K', 'UHD', '2160p'],
    })[`${mode[0]}x${mode[1]}`] || []
  }

  function presetAspect(mode) {
    return mode && ASPECT_RATIOS.find((aspect) => {
      const [w, h] = aspect.split(':').map(Number)
      return Math.abs((mode[0] / mode[1]) / (w / h) - 1) < 0.02
    })
  }

  function filterEdidOption(pattern, option) {
    const normalize = (value) => value.toLowerCase().replace(/[×*]/g, 'x').replace(/\s+/g, '')
    const text = normalize(String(option.search ?? option.label ?? ''))
    const query = pattern.replace(/\s*([x×*:])\s*/gi, '$1').replace(/(\d)\s+(hz)\b/gi, '$1$2')
    return query.trim().split(/\s+/).every((part) => text.includes(normalize(part)))
  }

  function isValidFileId(value) {
    const id = fileIdFromName(value)
    return ID_PATTERN.test(id) && !id.includes('/')
  }

  function reasonText(reason) {
    if (reason instanceof Error) return reason.message
    return String(reason)
  }

  function cloneTiming(timing, preferred) {
    return {
      width: timing.width, height: timing.height, fps: timing.fps, pixclk: timing.pixclk,
      hblank: timing.hblank, vblank: timing.vblank, hso: timing.hso, hsw: timing.hsw,
      vso: timing.vso, vsw: timing.vsw, preferred: Boolean(preferred),
    }
  }

  const Page = defineComponent({
    name: 'EdidExtensionPage',
    props: { host: { type: Object, required: true } },
    setup(props) {
      const message = useMessage()
      const tab = ref('view')
      const error = ref('')
      const busy = ref('load')
      const presets = ref([])
      const custom = ref([])
      const selection = ref('hdmi:current')
      const hdmiWritable = ref(false)
      const loadedKind = ref('')
      const loadedId = ref('')
      const fileName = ref('')
      const pnpCustom = ref(false)
      const hex = ref('')
      const manufacturer = ref('')
      const monitorName = ref('')
      const timings = ref([cloneTiming(TEMPLATES[0], true)])
      const syncing = ref(false)
      const importInput = ref(null)
      const hexGridEl = ref(null)
      const hexCursor = ref({ index: 0, nibble: 0, pane: 'hex' })
      const hexAnchor = ref(0)
      let hexDrag = null
      const timingAdvanced = ref({})
      const dialog = useDialog()
      let loadGeneration = 0

      const fileOptions = computed(() => {
        const options = [{ label: t('hdmi'), value: 'hdmi:current' }]
        const files = presets.value.map((file) => {
          const mode = presetMode(file.id)
          const aspect = presetAspect(mode)
          const label = presetLabel(file.id)
          const aliases = presetAliases(mode)
          return { label, mode, aspect, aliases, value: `preset:${file.id}`,
            search: `${label} ${file.id} ${aspect || ''} ${aliases.join(' ')} ${aliases.map((alias) => alias + mode[2]).join(' ')}` }
        })
        const common = files.filter((file) => file.aliases.length).sort((a, b) =>
          b.mode[1] - a.mode[1] || b.mode[0] - a.mode[0] || b.mode[2] - a.mode[2]).map((file) => ({
            ...file, label: `${file.aliases.join(' / ')} · ${file.label}`, value: `${file.value}:common`,
          }))
        if (common.length) options.push({ type: 'group', key: 'common', label: t('common'), children: common })
        const other = files.filter((file) => !file.aspect)
        if (other.length) options.push({ type: 'group', key: 'preset', label: t('presets'), children: other })
        for (const aspect of ASPECT_RATIOS) {
          const children = files.filter((file) => file.aspect === aspect).sort((a, b) =>
            a.mode[1] - b.mode[1] || a.mode[0] - b.mode[0] || a.mode[2] - b.mode[2])
          if (children.length) options.push({ type: 'group', key: `preset:${aspect}`, label: aspect, children })
        }
        if (custom.value.length) options.push({ type: 'group', key: 'custom', label: t('custom'),
          children: custom.value.map((file) => ({ label: fileLabel(file.id), value: `custom:${file.id}` })) })
        return options
      })
      const templateOptions = TEMPLATES.map((item) => ({ label: item.label, value: item.id }))
      const loaded = computed(() => validEdid(bytesFromHex(hex.value)))
      const manufacturerValid = computed(() => /^[A-Z]{3}$/.test(manufacturer.value))
      const loadedSource = computed(() => ({ hdmi: t('hdmi'), preset: t('presets'), custom: t('custom'), draft: t('importedDraft') })[loadedKind.value] || '—')
      const canDelete = computed(() => loadedKind.value === 'custom' && custom.value.some((file) => file.id === loadedId.value))
      const pnpOptions = computed(() => [
        ...PNP_PRESETS.map((item) => ({ label: `${item.id} - ${item.name}`, value: item.id })),
        { label: t('customOption'), value: PNP_CUSTOM },
      ])
      const manufacturerSelect = computed(() => (
        pnpCustom.value || !PNP_PRESETS.some((item) => item.id === manufacturer.value)
          ? PNP_CUSTOM
          : manufacturer.value
      ))

      function applyBytes(data, meta) {
        if (!validEdid(data)) throw new Error(t('invalidEdid'))
        syncing.value = true
        manufacturer.value = manufacturerOf(data)
        monitorName.value = monitorNameOf(data)
        timings.value = parseTimings(data)
        hex.value = hexFromBytes(data)
        loadedKind.value = meta.kind || ''
        loadedId.value = meta.id || ''
        pnpCustom.value = !PNP_PRESETS.some((item) => item.id === manufacturer.value)
        if (meta.kind === 'custom' && meta.id) fileName.value = fileLabel(meta.id)
        else if (meta.kind === 'preset' && meta.id) fileName.value = fileLabel(`${meta.id}-custom`)
        else if (meta.fileName) fileName.value = meta.fileName
        const last = Math.max(0, data.length - 1)
        if (hexCursor.value.index > last) {
          hexCursor.value = { index: last, nibble: 0, pane: hexCursor.value.pane || 'hex' }
        }
        if (hexAnchor.value > last) hexAnchor.value = last
        syncing.value = false
      }

      function rebuildFromFields() {
        if (syncing.value || !manufacturerValid.value) return
        const data = rebuildEdid(bytesFromHex(hex.value), manufacturer.value, monitorName.value, timings.value)
        syncing.value = true
        hex.value = hexFromBytes(data)
        syncing.value = false
      }

      function updateTiming(index, patch) {
        timings.value = timings.value.map((item, current) => {
          if (current !== index) return item
          const next = { ...item, ...patch }
          if (patch.width != null || patch.height != null || patch.fps != null) {
            return { ...item, ...timingFromMode(next.width, next.height, next.fps), preferred: item.preferred }
          }
          return next
        })
        rebuildFromFields()
      }

      function setPreferred(index) {
        timings.value = timings.value.map((item, current) => ({ ...item, preferred: current === index }))
        rebuildFromFields()
      }

      function addTiming(id) {
        const template = TEMPLATES.find((item) => item.id === id) || TEMPLATES[0]
        timings.value = [...timings.value, cloneTiming(template, timings.value.length === 0)]
        rebuildFromFields()
      }

      function addCustomTiming() {
        const last = timings.value[timings.value.length - 1]
        const timing = last
          ? timingFromMode(last.width, last.height, last.fps)
          : timingFromMode(1920, 1080, 60)
        timings.value = [...timings.value, cloneTiming(timing, timings.value.length === 0)]
        rebuildFromFields()
      }

      function removeTiming(index) {
        if (timings.value.length <= 1) return
        const next = timings.value.filter((_, current) => current !== index)
        if (!next.some((item) => item.preferred)) next[0].preferred = true
        timings.value = next
        rebuildFromFields()
      }

      async function reloadCatalog() {
        const listed = await props.host.invoke('list', {})
        presets.value = listed?.presets || []
        custom.value = listed?.custom || []
      }

      async function loadSelection() {
        const generation = ++loadGeneration
        busy.value = 'load'
        error.value = ''
        try {
          let data
          let meta
          if (selection.value === 'hdmi:current') {
            const response = await fetch('/api/video/edid', { credentials: 'same-origin', cache: 'no-store' })
            if (!response.ok) {
              hdmiWritable.value = false
              throw new Error(t('noHdmi'))
            }
            const body = await response.json()
            if (generation !== loadGeneration) return
            hdmiWritable.value = Boolean(body.writable)
            data = bytesFromHex(body.data_hex || '')
            if (!data) throw new Error(t('noHdmi'))
            meta = { kind: 'hdmi', id: '' }
          } else {
            const [source, id] = selection.value.split(':')
            if (!['preset', 'custom'].includes(source) || !id) return
            const body = await props.host.invoke('read', { source, id })
            data = bytesFromHex(body.data_hex)
            meta = { kind: source, id: body.id || id }
          }
          if (generation === loadGeneration) applyBytes(data, meta)
        } catch (reason) {
          if (generation !== loadGeneration) return
          hex.value = ''
          manufacturer.value = ''
          monitorName.value = ''
          timings.value = []
          loadedKind.value = ''
          loadedId.value = ''
          error.value = reasonText(reason)
        } finally {
          if (generation === loadGeneration) busy.value = ''
        }
      }

      function openImport() {
        importInput.value?.click()
      }

      function importFile(event) {
        const file = event.target.files && event.target.files[0]
        event.target.value = ''
        if (!file) return
        if (!file.name.toLowerCase().endsWith(SUFFIX)) {
          dialog.warning({ title: t('importFile'), content: t('invalidImport'), positiveText: 'OK' })
          return
        }
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const data = new Uint8Array(reader.result)
            const id = fileIdFromName(file.name.toLowerCase())
            applyBytes(data, {
              kind: 'draft',
              id: '',
              fileName: isValidFileId(id) ? fileLabel(id) : fileName.value,
            })
            error.value = ''
            tab.value = 'edit'
            message.success(t('imported'))
          } catch (reason) {
            error.value = reasonText(reason)
          }
        }
        reader.readAsArrayBuffer(file)
      }

      async function saveCustom() {
        if (!manufacturerValid.value) {
          error.value = t('manufacturerInvalid')
          return
        }
        if (!isValidFileId(fileName.value)) {
          error.value = t('invalidName')
          return
        }
        const data = bytesFromHex(hex.value)
        if (!validEdid(data)) {
          error.value = t('invalidEdid')
          return
        }
        busy.value = 'save'
        error.value = ''
        try {
          const id = fileIdFromName(fileName.value)
          await props.host.invoke('save', { id, data_hex: hexFromBytes(data) })
          await reloadCatalog()
          loadedKind.value = 'custom'
          loadedId.value = id
          fileName.value = fileLabel(id)
          selection.value = `custom:${id}`
          message.success(t('saved'))
        } catch (reason) {
          error.value = reasonText(reason)
        } finally {
          busy.value = ''
        }
      }

      async function deleteCustom() {
        if (!canDelete.value) return
        busy.value = 'delete'
        error.value = ''
        try {
          await props.host.invoke('delete', { id: loadedId.value })
          await reloadCatalog()
          loadedKind.value = ''
          loadedId.value = ''
          fileName.value = ''
          selection.value = 'hdmi:current'
          message.success(t('deleted'))
        } catch (reason) {
          error.value = reasonText(reason)
        } finally {
          busy.value = ''
        }
      }

      async function applyHdmi() {
        const data = bytesFromHex(hex.value)
        if (!validEdid(data)) {
          error.value = t('invalidEdid')
          return
        }
        busy.value = 'apply'
        error.value = ''
        try {
          const response = await fetch('/api/video/edid', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data_hex: hexFromBytes(data) }),
          })
          const body = await response.json().catch(() => ({}))
          if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`)
          const required = body.apply_required
          if (required === 'reboot') message.warning(t('appliedReboot'))
          else if (required === 'power_cycle') message.warning(t('appliedPower'))
          else if (required === 'hotplug') message.success(t('appliedHotplug'))
          else message.success(t('applied'))
          await reloadCatalog()
        } catch (reason) {
          error.value = reasonText(reason)
        } finally {
          busy.value = ''
        }
      }

      watch(selection, () => {
        loadSelection()
      })

      onMounted(() => {
        reloadCatalog().then(() => loadSelection()).catch((reason) => {
          error.value = reasonText(reason)
        }).finally(() => {
          busy.value = ''
        })
      })

      const row = (label, control) => h('label', { class: 'edid-row' }, [h('span', label), control])
      const timingLabel = (timing) => `${timing.width}×${timing.height} @ ${timing.fps} Hz${timing.preferred ? ` · ${t('preferred')}` : ''}`

      function currentBytes() {
        return bytesFromHex(hex.value) || new Uint8Array(0)
      }

      function moveCursor(index, nibble, pane, extend) {
        const data = currentBytes()
        const nextPane = pane || hexCursor.value.pane || 'hex'
        if (!data.length) {
          hexCursor.value = { index: 0, nibble: 0, pane: nextPane }
          hexAnchor.value = 0
          return
        }
        const next = Math.max(0, Math.min(data.length - 1, index))
        hexCursor.value = { index: next, nibble: nibble ? 1 : 0, pane: nextPane }
        if (!extend) hexAnchor.value = next
      }

      function hexSelection() {
        const start = Math.min(hexAnchor.value, hexCursor.value.index)
        const end = Math.max(hexAnchor.value, hexCursor.value.index)
        return { start, end, multi: start !== end }
      }

      function byteFromPoint(event) {
        const node = document.elementFromPoint(event.clientX, event.clientY)
        const el = node && node.closest ? node.closest('[data-byte]') : null
        if (!el || !hexGridEl.value || !hexGridEl.value.contains(el)) return null
        const index = Number(el.dataset.byte)
        if (!Number.isInteger(index)) return null
        return { index, pane: el.dataset.pane === 'ascii' ? 'ascii' : 'hex' }
      }

      function onHexPointerDown(event) {
        if (event.button !== 0) return
        const hit = byteFromPoint(event)
        if (!hit) return
        event.preventDefault()
        hexGridEl.value?.focus({ preventScroll: true })
        hexDrag = { pointerId: event.pointerId, pane: hit.pane }
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* capture is optional */ }
        moveCursor(hit.index, 0, hit.pane, event.shiftKey)
      }

      function onHexPointerMove(event) {
        if (!hexDrag || hexDrag.pointerId !== event.pointerId) return
        const hit = byteFromPoint(event)
        if (!hit || hit.index === hexCursor.value.index) return
        moveCursor(hit.index, 0, hexDrag.pane, true)
      }

      function onHexPointerUp(event) {
        if (!hexDrag || hexDrag.pointerId !== event.pointerId) return
        hexDrag = null
        try { event.currentTarget.releasePointerCapture(event.pointerId) } catch { /* already released */ }
      }

      function selectedHexText() {
        const data = currentBytes()
        const { start, end } = hexSelection()
        const parts = []
        for (let index = start; index <= end && index < data.length; index += 1) {
          parts.push(data[index].toString(16).padStart(2, '0'))
        }
        return parts.join(' ')
      }

      function commitBytes(data, cursor) {
        const index = Math.max(0, Math.min(data.length - 1, cursor.index))
        if (index % BLOCK !== BLOCK - 1) fixChecksums(data)
        hex.value = hexFromBytes(data)
        if (validEdid(data)) {
          syncing.value = true
          manufacturer.value = manufacturerOf(data)
          monitorName.value = monitorNameOf(data)
          timings.value = parseTimings(data)
          pnpCustom.value = !PNP_PRESETS.some((item) => item.id === manufacturer.value)
          syncing.value = false
        }
        hexCursor.value = { index, nibble: cursor.nibble ? 1 : 0, pane: cursor.pane || 'hex' }
        hexAnchor.value = index
      }

      function writeNibble(digit) {
        const value = parseInt(digit, 16)
        if (Number.isNaN(value)) return
        const data = Uint8Array.from(currentBytes())
        if (!data.length) return
        const cursor = hexCursor.value
        const index = Math.max(0, Math.min(data.length - 1, cursor.index))
        data[index] = cursor.nibble === 0
          ? ((value << 4) | (data[index] & 0x0f))
          : ((data[index] & 0xf0) | value)
        if (cursor.nibble === 0) commitBytes(data, { index, nibble: 1, pane: 'hex' })
        else commitBytes(data, { index: index + 1, nibble: 0, pane: 'hex' })
      }

      function writeAscii(character) {
        if (character.length !== 1) return
        const data = Uint8Array.from(currentBytes())
        if (!data.length) return
        const index = Math.max(0, Math.min(data.length - 1, hexCursor.value.index))
        data[index] = character.charCodeAt(0) & 0xff
        commitBytes(data, { index: index + 1, nibble: 0, pane: 'ascii' })
      }

      function onHexKey(event) {
        const data = currentBytes()
        if (!data.length) return
        const key = event.key.toLowerCase()
        if ((event.ctrlKey || event.metaKey) && key === 'a') {
          event.preventDefault()
          hexAnchor.value = 0
          hexCursor.value = { index: data.length - 1, nibble: 0, pane: hexCursor.value.pane || 'hex' }
          return
        }
        if ((event.ctrlKey || event.metaKey) && key === 'c') {
          event.preventDefault()
          const text = selectedHexText()
          if (text && navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
          return
        }
        if (event.ctrlKey || event.metaKey || event.altKey) return
        const cursor = hexCursor.value
        const extend = event.shiftKey
        if (cursor.pane === 'ascii') {
          if (!extend && event.key.length === 1) {
            event.preventDefault()
            writeAscii(event.key)
            return
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            moveCursor(cursor.index - 1, 0, 'ascii', extend)
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            moveCursor(cursor.index + 1, 0, 'ascii', extend)
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            moveCursor(cursor.index - 16, 0, 'ascii', extend)
          } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            moveCursor(cursor.index + 16, 0, 'ascii', extend)
          } else if (event.key === 'Backspace' && !extend) {
            event.preventDefault()
            moveCursor(cursor.index - 1, 0, 'ascii')
          }
          return
        }
        if (!extend && /^[0-9a-fA-F]$/.test(event.key)) {
          event.preventDefault()
          writeNibble(event.key)
          return
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          if (extend) moveCursor(cursor.index - 1, 0, 'hex', true)
          else if (cursor.nibble === 1) moveCursor(cursor.index, 0, 'hex')
          else moveCursor(cursor.index - 1, 1, 'hex')
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          if (extend) moveCursor(cursor.index + 1, 0, 'hex', true)
          else if (cursor.nibble === 0) moveCursor(cursor.index, 1, 'hex')
          else moveCursor(cursor.index + 1, 0, 'hex')
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          moveCursor(cursor.index - 16, extend ? 0 : cursor.nibble, 'hex', extend)
        } else if (event.key === 'ArrowDown') {
          event.preventDefault()
          moveCursor(cursor.index + 16, extend ? 0 : cursor.nibble, 'hex', extend)
        } else if (event.key === 'Backspace' && !extend) {
          event.preventDefault()
          if (cursor.nibble === 1) moveCursor(cursor.index, 0, 'hex')
          else moveCursor(cursor.index - 1, 1, 'hex')
        } else if (event.key === 'Tab') {
          event.preventDefault()
          moveCursor(cursor.index, 0, cursor.pane === 'hex' ? 'ascii' : 'hex')
        }
      }

      const hexField = (editable) => {
        const data = currentBytes()
        const cursor = hexCursor.value
        const range = hexSelection()
        const rows = []
        for (let offset = 0; offset < data.length; offset += 16) {
          const left = []
          const right = []
          const ascii = []
          for (let col = 0; col < 16; col++) {
            const index = offset + col
            const group = col < 8 ? left : right
            if (index >= data.length) {
              group.push(h('span', { class: 'edid-hex-byte is-empty' }, '  '))
              ascii.push(h('span', { class: 'edid-hex-asc is-empty' }, ' '))
              continue
            }
            const inRange = editable && index >= range.start && index <= range.end
            const caret = inRange && cursor.index === index
            const ch = data[index] >= 32 && data[index] < 127 ? String.fromCharCode(data[index]) : '.'
            const text = data[index].toString(16).padStart(2, '0')
            group.push(h(editable ? 'button' : 'span', {
              type: 'button',
              tabindex: -1,
              'data-byte': String(index),
              'data-pane': 'hex',
              class: ['edid-hex-byte', inRange ? 'is-selected' : '', caret && range.multi && cursor.pane === 'hex' ? 'is-caret' : ''].filter(Boolean).join(' '),
            }, [
              h('span', { class: caret && cursor.pane === 'hex' && cursor.nibble === 0 ? 'is-nib' : '' }, text[0]),
              h('span', { class: caret && cursor.pane === 'hex' && cursor.nibble === 1 ? 'is-nib' : '' }, text[1]),
            ]))
            ascii.push(h(editable ? 'button' : 'span', {
              type: 'button',
              tabindex: -1,
              'data-byte': String(index),
              'data-pane': 'ascii',
              class: ['edid-hex-asc', inRange ? 'is-selected' : '', caret && range.multi && cursor.pane === 'ascii' ? 'is-caret' : ''].filter(Boolean).join(' '),
            }, ch))
          }
          rows.push(h('div', { class: 'edid-hex-row' }, [
            h('span', { class: 'edid-hex-off' }, offset.toString(16).padStart(4, '0')),
            h('div', { class: 'edid-hex-bytes' }, [
              h('div', { class: 'edid-hex-group' }, left),
              h('div', { class: 'edid-hex-group' }, right),
            ]),
            h('div', { class: 'edid-hex-ascii' }, ascii),
          ]))
        }
        return h('div', { class: 'edid-hex-wrap' }, [
          editable ? h('p', { class: 'edid-hint' }, t('hexHint')) : null,
          h('div', {
            class: ['edid-hex-grid', editable ? 'is-edit' : 'is-view'].join(' '),
            tabindex: editable ? 0 : -1,
            ref: editable ? (el) => { hexGridEl.value = el } : undefined,
            onKeydown: editable ? onHexKey : undefined,
            onPointerdown: editable ? onHexPointerDown : undefined,
            onPointermove: editable ? onHexPointerMove : undefined,
            onPointerup: editable ? onHexPointerUp : undefined,
            onPointercancel: editable ? onHexPointerUp : undefined,
          }, rows.length ? rows : [h('p', t('empty'))]),
        ])
      }

      const hexSection = (editable) => h(NCollapse, { class: 'edid-hex-collapse' }, {
        default: () => h(NCollapseItem, { name: 'hex', title: t(editable ? 'hexEditor' : 'hexViewer') }, {
          default: () => hexField(editable),
        }),
      })

      const viewPane = () => h('div', { class: 'edid-split' }, [
        h('div', { class: 'edid-form' }, [
          h(NSelect, {
            value: selection.value,
            options: fileOptions.value,
            menuProps: { class: 'edid-editor-source-menu' },
            virtualScroll: false,
            filterable: true,
            filter: filterEdidOption,
            disabled: Boolean(busy.value),
            loading: busy.value === 'load',
            'onUpdate:value': (value) => { selection.value = value },
          }),
          busy.value === 'load' ? h('div', { class: 'edid-loading', role: 'status' }, [
            h(NSpin, { class: 'edid-loading-spin', size: 18 }),
            h('span', selection.value === 'hdmi:current' ? t('loadingHdmi') : t('loadingFile')),
          ]) : loaded.value ? h('dl', { class: 'edid-props' }, [
            h('dt', t('manufacturer')), h('dd', { class: 'edid-vendor-name' }, pnpLabel(manufacturer.value)),
            h('dt', t('manufacturerId')), h('dd', manufacturer.value || '—'),
            h('dt', t('name')), h('dd', monitorName.value || '—'),
            h('dt', t('source')), h('dd', loadedSource.value),
            h('dt', t('version')), h('dd', `${currentBytes()[18]}.${currentBytes()[19]} · ${(hex.value.length / 2) | 0} B`),
            h('dt', t('timings')), h('dd', { class: 'edid-mode-list' }, timings.value.map(timing => h('span', {
              class: ['edid-mode', timing.preferred ? 'is-preferred' : ''],
            }, timingLabel(timing)))),
          ]) : h('p', { class: 'edid-empty' }, t('empty')),
          h('div', { class: 'edid-actions' }, [
            h(NButton, { type: 'primary', disabled: !loaded.value || !manufacturerValid.value || !hdmiWritable.value || Boolean(busy.value), loading: busy.value === 'apply', onClick: applyHdmi }, { default: () => t('apply') }),
          ]),
          h('p', { class: 'edid-hint' }, t('applyHint')),
        ]),
        loaded.value && busy.value !== 'load' ? hexSection(false) : null,
      ])

      const editPane = () => h('div', { class: 'edid-split' }, [
        h('div', { class: 'edid-form' }, [
          h('input', {
            type: 'file',
            accept: '.edid.bin,application/octet-stream',
            style: 'display:none',
            ref: (el) => { importInput.value = el },
            onChange: importFile,
          }),
          h(NAlert, { type: 'info', showIcon: false, class: 'edid-import-alert' }, {
            default: () => h('div', { class: 'edid-import-body' }, [
              h('span', t('importAlert')),
              h(NButton, { class: 'edid-import-btn', onClick: openImport }, { default: () => t('importFile') }),
            ]),
          }),
          h('h3', t('identity')),
          h('div', { class: 'edid-identity' }, [
            row(t('manufacturerPreset'), h(NSelect, {
              value: manufacturerSelect.value,
              options: pnpOptions.value,
              filterable: true,
              'onUpdate:value': (value) => {
                if (value === PNP_CUSTOM) {
                  pnpCustom.value = true
                  return
                }
                pnpCustom.value = false
                manufacturer.value = value
                rebuildFromFields()
              },
            })),
            row(t('name'), h(NInput, {
              value: monitorName.value,
              maxlength: 13,
              'onUpdate:value': (value) => { monitorName.value = value; rebuildFromFields() },
            })),
          ]),
          manufacturerSelect.value === PNP_CUSTOM ? row(t('manufacturerCustom'), h(NInput, {
            value: manufacturer.value,
            maxlength: 3,
            status: manufacturerValid.value ? undefined : 'error',
            placeholder: 'OKV',
            'onUpdate:value': (value) => {
              pnpCustom.value = true
              manufacturer.value = String(value || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
              rebuildFromFields()
            },
          })) : null,
          manufacturerSelect.value === PNP_CUSTOM && !manufacturerValid.value ? h('p', { class: 'edid-field-error' }, t('manufacturerInvalid')) : null,
          manufacturerSelect.value === PNP_CUSTOM ? h('p', { class: 'edid-hint' }, t('manufacturerHint')) : null,
          h('h3', t('timings')),
          h('div', { class: 'edid-timing-add' }, [
            h('div', { class: 'edid-timing-add-select' }, [
              h(NSelect, {
                value: null,
                options: templateOptions,
                placeholder: t('template'),
                'onUpdate:value': (value) => { if (value) addTiming(value) },
              }),
            ]),
            h(NButton, { class: 'edid-timing-add-btn', onClick: addCustomTiming }, { default: () => t('addCustomTiming') }),
          ]),
          ...timings.value.map((timing, index) => h('div', { class: 'edid-timing' }, [
            h('div', { class: 'edid-timing-head' }, [
              h('strong', timingLabel(timing)),
              h(NButton, { size: 'small', disabled: timing.preferred, onClick: () => setPreferred(index) }, { default: () => t('preferred') }),
              h(NButton, { size: 'small', disabled: timings.value.length <= 1, onClick: () => removeTiming(index) }, { default: () => t('removeTiming') }),
            ]),
            h('div', { class: 'edid-grid edid-grid-mode' }, [
              row(t('width'), h(NInputNumber, { value: timing.width, min: 640, max: 4096, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { width: value ?? timing.width }) })),
              row(t('height'), h(NInputNumber, { value: timing.height, min: 480, max: 2160, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { height: value ?? timing.height }) })),
              row(t('fps'), h(NInputNumber, { value: timing.fps, min: 24, max: 240, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { fps: value ?? timing.fps }) })),
            ]),
            h(NButton, {
              size: 'small',
              quaternary: true,
              class: 'edid-advanced-toggle',
              onClick: () => { timingAdvanced.value = { ...timingAdvanced.value, [index]: !timingAdvanced.value[index] } },
            }, { default: () => t('customParams') }),
            timingAdvanced.value[index] ? h('div', { class: 'edid-grid edid-grid-params' }, [
              row(t('pixclk'), h(NInputNumber, { value: timing.pixclk, min: 2500, max: 60000, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { pixclk: value ?? timing.pixclk }) })),
              row(t('hblank'), h(NInputNumber, { value: timing.hblank, min: 16, max: 1024, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hblank: value ?? timing.hblank }) })),
              row(t('vblank'), h(NInputNumber, { value: timing.vblank, min: 4, max: 256, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vblank: value ?? timing.vblank }) })),
              row(t('hso'), h(NInputNumber, { value: timing.hso, min: 0, max: 1023, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hso: value ?? timing.hso }) })),
              row(t('hsw'), h(NInputNumber, { value: timing.hsw, min: 1, max: 1023, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hsw: value ?? timing.hsw }) })),
              row(t('vso'), h(NInputNumber, { value: timing.vso, min: 0, max: 63, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vso: value ?? timing.vso }) })),
              row(t('vsw'), h(NInputNumber, { value: timing.vsw, min: 1, max: 63, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vsw: value ?? timing.vsw }) })),
            ]) : null,
          ])),
          h('div', { class: 'edid-savebar' }, [
            row(t('fileName'), h(NInput, {
              value: fileName.value,
              placeholder: t('filePlaceholder'),
              maxlength: 72,
              'onUpdate:value': (value) => { fileName.value = String(value || '').trim() },
            })),
            h('div', { class: 'edid-actions' }, [
              h(NButton, { type: 'primary', disabled: !loaded.value || !manufacturerValid.value || Boolean(busy.value), loading: busy.value === 'save', onClick: saveCustom }, { default: () => t('save') }),
              h(NButton, { disabled: !canDelete.value || Boolean(busy.value), loading: busy.value === 'delete', onClick: deleteCustom }, { default: () => t('remove') }),
            ]),
          ]),
          loadedKind.value === 'preset' ? h('p', { class: 'edid-hint' }, t('presetReadOnly')) : null,
        ]),
        loaded.value ? hexSection(true) : null,
      ])

      return () => h('section', { class: 'edid-editor' }, [
        h('p', { class: 'edid-hint' }, t('description')),
        error.value ? h(NAlert, { type: 'error', showIcon: false }, { default: () => error.value }) : null,
        h(NTabs, { value: tab.value, type: 'line', 'onUpdate:value': (value) => { tab.value = value } }, {
          default: () => [
            h(NTabPane, { name: 'view', tab: t('tabView') }, { default: viewPane }),
            h(NTabPane, { name: 'edit', tab: t('tabEdit'), disabled: busy.value === 'load' }, { default: editPane }),
          ],
        }),
      ])
    },
  })

  runtime.register('edid-editor', {
    apiVersion: 1,
    component: Page,
    styles: [`
      .edid-editor { display: grid; gap: 12px; min-width: 0; }
      .edid-editor h3 { margin: 0; }
      .edid-editor p { margin: 0; }
      .n-base-select-menu.edid-editor-source-menu .n-base-select-option .n-base-select-option__content { white-space: normal; overflow-wrap: anywhere; }
      .edid-split { display: grid; gap: 16px; min-width: 0; }
      .edid-form { container-type: inline-size; display: grid; gap: 12px; min-width: 0; align-content: start; }
      .edid-import-alert { margin: 0; }
      .edid-import-body { display: flex; gap: 12px; align-items: center; }
      .edid-import-body > span { flex: 1 1 auto; min-width: 0; }
      .edid-import-btn { flex: 0 0 auto; }
      .edid-timing-add, .edid-savebar { display: flex; gap: 12px; align-items: center; }
      .edid-savebar { align-items: end; }
      .edid-timing-add-select, .edid-savebar > .edid-row { flex: 1 1 auto; min-width: 0; }
      .edid-timing-add-btn { flex: 0 0 auto; white-space: nowrap; }
      .edid-identity { display: grid; gap: 12px; }
      @container (max-width: 520px) {
        .edid-timing-add, .edid-savebar { flex-wrap: wrap; }
      }
      .edid-row { display: grid; gap: 6px; min-width: 0; }
      .edid-row > span { font-size: 13px; font-weight: 600; }
      .edid-grid { display: grid; gap: 12px; }
      .edid-grid-mode { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .edid-grid-params { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      @container (max-width: 380px) {
        .edid-grid-mode, .edid-grid-params { grid-template-columns: 1fr; }
      }
      .edid-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      .edid-loading { display: flex; align-items: center; gap: 10px; min-height: 72px; color: var(--muted-foreground); font-size: 13px; }
      .edid-loading .edid-loading-spin { position: static; transform: none; flex-shrink: 0; }
      .edid-advanced-toggle { justify-self: start; }
      .edid-hint, .edid-empty { color: var(--muted-foreground); font-size: 13px; line-height: 1.5; }
      .edid-field-error { color: var(--destructive); font-size: 12px; }
      .edid-props { display: grid; grid-template-columns: max-content minmax(0, 1fr); align-items: baseline; gap: 10px 20px; margin: 0; padding: 16px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--onekvm-surface-raised); }
      .edid-props dt { color: var(--muted-foreground); font-size: 13px; }
      .edid-props dd { margin: 0; min-width: 0; overflow-wrap: anywhere; }
      .edid-vendor-name { font-weight: 600; }
      .edid-mode-list { display: flex; flex-wrap: wrap; gap: 6px; }
      .edid-mode { padding: 3px 7px; border-radius: 4px; background: var(--accent); font-size: 12px; font-variant-numeric: tabular-nums; }
      .edid-mode.is-preferred { color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent); }
      .edid-hex-collapse { min-width: 0; padding-top: 4px; }
      .edid-timing { display: grid; gap: 12px; padding: 14px; border: 1px solid rgba(127,127,127,0.28); border-radius: 10px; }
      .edid-timing-head { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
      .edid-timing-head strong { flex: 1 1 auto; min-width: 0; }
      .edid-hex-wrap { display: grid; gap: 8px; min-width: 0; }
      .edid-hex-grid {
        outline: none;
        padding: 12px;
        overflow: auto;
        border-radius: 10px;
        background: rgba(127,127,127,0.12);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 12px;
        line-height: 1.5;
        user-select: none;
        -webkit-user-select: none;
      }
      .edid-hex-grid.is-edit:focus { box-shadow: inset 0 0 0 1px rgba(24,160,88,0.7); }
      .edid-hex-grid.is-view { user-select: text; -webkit-user-select: text; }
      .edid-hex-row { display: grid; grid-template-columns: 3.2em max-content max-content; gap: 8px; align-items: center; }
      .edid-hex-off { opacity: 0.55; }
      .edid-hex-bytes { display: flex; gap: 8px; }
      .edid-hex-group { display: grid; grid-template-columns: repeat(8, 1.55em); }
      .edid-hex-ascii { display: grid; grid-template-columns: repeat(16, 1em); }
      .edid-hex-byte, .edid-hex-asc {
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 3px;
        background: transparent;
        color: inherit;
        font: inherit;
        line-height: 1.5;
        text-align: center;
        cursor: default;
      }
      .edid-hex-grid.is-edit .edid-hex-byte, .edid-hex-grid.is-edit .edid-hex-asc { cursor: text; }
      .edid-hex-byte:focus, .edid-hex-asc:focus { outline: none; }
      .edid-hex-byte.is-selected, .edid-hex-asc.is-selected { background: #18a058; color: #fff; }
      .edid-hex-byte.is-caret, .edid-hex-asc.is-caret { box-shadow: inset 0 0 0 1px #fff; }
      .edid-hex-byte .is-nib { text-decoration: underline; }
    `],
  })
})()
