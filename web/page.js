(() => {
  const runtime = window.OneKVMPluginUI.v1
  const { computed, defineComponent, h, onMounted, ref, watch } = runtime.vue
  const { NAlert, NButton, NInput, NInputNumber, NSelect, NTabPane, NTabs, useDialog, useMessage } = runtime.naive
  const t = runtime.i18n.createTranslator({
    default: {
      title: 'EDID files',
      description: 'Edit custom EDID files. Machine presets are applied in Display settings, not here.',
      tabView: 'View',
      tabEdit: 'Edit',
      load: 'Load',
      importFile: 'Import',
      identity: 'Identity',
      manufacturer: 'PNP manufacturer ID',
      manufacturerPreset: 'Vendor preset',
      manufacturerCustom: 'Custom ID',
      customOption: 'Custom…',
      manufacturerHint: 'EDID encodes the vendor as three A–Z letters (VESA PNP). Pick a preset or type your own. Put the full model in the monitor name (13 characters).',
      name: 'Monitor name',
      timings: 'Declared timings',
      preferred: 'Preferred',
      addTiming: 'Add timing',
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
      hexHint: 'Click a byte, then type 0-9 or A-F. Digits overwrite in place.',
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
      applyHint: 'Writes the current EDID through Core to the capture chip.',
      empty: 'No EDID loaded yet.',
      invalidName: 'Use a file name like my-display.edid.bin.',
      invalidEdid: 'EDID blob is invalid.',
      invalidImport: 'Import a file named *.edid.bin. It is only loaded into this page.',
      presetReadOnly: 'Machine presets cannot be overwritten here. Save a custom file name instead.',
      saved: 'Custom EDID file saved.',
      deleted: 'Custom EDID file deleted.',
      applied: 'Core applied the EDID to the capture chip.',
      appliedHotplug: 'Core applied the EDID. Re-detect the display on the controlled host.',
      appliedReboot: 'Core wrote the EDID. Restart this device before the host sees it.',
      appliedPower: 'Core wrote the EDID. Power-cycle this device before the host sees it.',
      hdmi: 'Current HDMI',
      presets: 'Presets (package)',
      custom: 'Custom (plugin data)',
      groupHdmi: 'HDMI',
      noHdmi: 'Current HDMI EDID is unavailable.',
      source: 'Source',
      size: 'Size',
      importedDraft: 'Imported into editor (not saved)',
    },
    zh: {
      title: 'EDID 文件',
      description: '编辑自定义 EDID 文件。机型预设请在显示设置里应用，不会出现在本页。',
      tabView: '查看',
      tabEdit: '编辑',
      load: '打开',
      importFile: '导入',
      identity: '标识',
      manufacturer: 'PNP 厂商 ID',
      manufacturerPreset: '厂商预设',
      manufacturerCustom: '自定义 ID',
      customOption: '自定义…',
      manufacturerHint: 'EDID 只能把厂商编码成 3 个 A–Z 字母（VESA PNP）。可从列表选择，或自己输入。完整型号写在显示器名称里（最多 13 个字符）。',
      name: '显示器名称',
      timings: '声明的时序',
      preferred: '首选',
      addTiming: '添加时序',
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
      hexHint: '点击字节，再输入 0-9 或 A-F。按位覆盖，不会插入。',
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
      applyHint: '把当前 EDID 通过 Core 写入采集芯片。',
      empty: '尚未载入 EDID。',
      invalidName: '文件名形如 my-display.edid.bin。',
      invalidEdid: 'EDID 内容无效。',
      invalidImport: '请导入名为 *.edid.bin 的文件。导入只进入本页，不会保存。',
      presetReadOnly: '机型预设不能在这里覆盖。请另存为自定义文件名。',
      saved: '已保存自定义 EDID 文件。',
      deleted: '已删除自定义 EDID 文件。',
      applied: 'Core 已把 EDID 应用到采集芯片。',
      appliedHotplug: 'Core 已写入 EDID。请在被控主机上重新检测显示器。',
      appliedReboot: 'Core 已写入 EDID。重启本机后，被控主机才会看到新 EDID。',
      appliedPower: 'Core 已写入 EDID。给本机断电再上电后，被控主机才会看到新 EDID。',
      hdmi: '当前 HDMI',
      presets: '预设（软件包）',
      custom: '自定义（插件数据）',
      groupHdmi: 'HDMI',
      noHdmi: '当前 HDMI EDID 不可用。',
      source: '来源',
      size: '大小',
      importedDraft: '已导入编辑器（未保存）',
    },
    'zh-TW': {
      title: 'EDID 檔案',
      description: '編輯自訂 EDID 檔案。機型預設請在顯示設定裡套用，不會出現在本頁。',
      tabView: '檢視',
      tabEdit: '編輯',
      load: '開啟',
      importFile: '匯入',
      identity: '識別',
      manufacturer: 'PNP 廠商 ID',
      manufacturerPreset: '廠商預設',
      manufacturerCustom: '自訂 ID',
      customOption: '自訂…',
      manufacturerHint: 'EDID 只能把廠商編碼成 3 個 A–Z 字母（VESA PNP）。可從清單選擇，或自行輸入。完整型號寫在顯示器名稱裡（最多 13 個字元）。',
      name: '顯示器名稱',
      timings: '宣告的時序',
      preferred: '首選',
      addTiming: '新增時序',
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
      hexHint: '點一下位元組，再輸入 0-9 或 A-F。就地覆蓋，不會插入。',
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
      applyHint: '把目前 EDID 透過 Core 寫入擷取晶片。',
      empty: '尚未載入 EDID。',
      invalidName: '檔名形如 my-display.edid.bin。',
      invalidEdid: 'EDID 內容無效。',
      invalidImport: '請匯入名為 *.edid.bin 的檔案。匯入只進入本頁，不會儲存。',
      presetReadOnly: '機型預設不能在這裡覆蓋。請另存為自訂檔名。',
      saved: '已儲存自訂 EDID 檔案。',
      deleted: '已刪除自訂 EDID 檔案。',
      applied: 'Core 已把 EDID 套用到擷取晶片。',
      appliedHotplug: 'Core 已寫入 EDID。請在被控主機上重新偵測顯示器。',
      appliedReboot: 'Core 已寫入 EDID。重新啟動本機後，被控主機才會看到新 EDID。',
      appliedPower: 'Core 已寫入 EDID。為本機斷電再上電後，被控主機才會看到新 EDID。',
      hdmi: '目前 HDMI',
      presets: '預設（套件）',
      custom: '自訂（外掛資料）',
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
    return hit ? `${hit.id} - ${hit.name}` : id
  }
  const TEMPLATES = [
    { id: '1080p60', label: '1920×1080 @ 60', width: 1920, height: 1080, fps: 60, pixclk: 14850, hblank: 280, vblank: 45, hso: 88, hsw: 44, vso: 4, vsw: 5 },
    { id: '1440p30', label: '2560×1440 @ 30', width: 2560, height: 1440, fps: 30, pixclk: 14625, hblank: 160, vblank: 37, hso: 48, hsw: 32, vso: 3, vsw: 5 },
    { id: '720p120', label: '1280×720 @ 120', width: 1280, height: 720, fps: 120, pixclk: 14850, hblank: 370, vblank: 30, hso: 110, hsw: 40, vso: 5, vsw: 5 },
    { id: '1080p30', label: '1920×1080 @ 30', width: 1920, height: 1080, fps: 30, pixclk: 7425, hblank: 280, vblank: 45, hso: 88, hsw: 44, vso: 4, vsw: 5 },
    { id: '720p60', label: '1280×720 @ 60', width: 1280, height: 720, fps: 60, pixclk: 7425, hblank: 370, vblank: 30, hso: 110, hsw: 40, vso: 5, vsw: 5 },
  ]
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
    const text = new TextEncoder().encode(String(name || '').slice(0, 13))
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
    return vics.length ? vics : [16, 4]
  }

  function writeCEA(dst, vics, extra) {
    dst.fill(0)
    dst[0] = 0x02
    dst[1] = 0x03
    let offset = 4
    dst[offset] = 0x40 | (vics.length + 1)
    dst[offset + 1] = 0x00
    for (let i = 0; i < vics.length; i++) dst[offset + 2 + i] = vics[i] & 0xff
    offset += 2 + vics.length
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
      const busy = ref('')
      const custom = ref([])
      const selection = ref('hdmi:current')
      const hdmiHex = ref('')
      const hdmiWritable = ref(false)
      const loadedKind = ref('')
      const loadedId = ref('')
      const fileName = ref('')
      const pnpCustom = ref(false)
      const hex = ref('')
      const manufacturer = ref('OKV')
      const monitorName = ref('OneKVM 1080p')
      const timings = ref([cloneTiming(TEMPLATES[0], true)])
      const syncing = ref(false)
      const importInput = ref(null)
      const hexGridEl = ref(null)
      const hexCursor = ref({ index: 0, nibble: 0 })
      const dialog = useDialog()

      const fileOptions = computed(() => [
        { label: t('hdmi'), value: 'hdmi:current' },
        ...custom.value.map((file) => ({ label: fileLabel(file.id), value: `custom:${file.id}` })),
      ])
      const templateOptions = TEMPLATES.map((item) => ({ label: item.label, value: item.id }))
      const loaded = computed(() => validEdid(bytesFromHex(hex.value)))
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
        manufacturer.value = manufacturerOf(data) || 'OKV'
        monitorName.value = monitorNameOf(data) || 'OneKVM'
        timings.value = parseTimings(data)
        hex.value = hexFromBytes(data)
        loadedKind.value = meta.kind || ''
        loadedId.value = meta.id || ''
        pnpCustom.value = !PNP_PRESETS.some((item) => item.id === manufacturer.value)
        if (meta.kind === 'custom' && meta.id) fileName.value = fileLabel(meta.id)
        else if (meta.fileName) fileName.value = meta.fileName
        if (hexCursor.value.index >= data.length) hexCursor.value = { index: Math.max(0, data.length - 1), nibble: 0 }
        syncing.value = false
      }

      function rebuildFromFields() {
        if (syncing.value) return
        const data = rebuildEdid(bytesFromHex(hex.value), manufacturer.value, monitorName.value, timings.value)
        syncing.value = true
        hex.value = hexFromBytes(data)
        syncing.value = false
      }

      function updateTiming(index, patch) {
        timings.value = timings.value.map((item, current) => current === index ? { ...item, ...patch } : item)
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

      function removeTiming(index) {
        if (timings.value.length <= 1) return
        const next = timings.value.filter((_, current) => current !== index)
        if (!next.some((item) => item.preferred)) next[0].preferred = true
        timings.value = next
        rebuildFromFields()
      }

      async function reloadCatalog() {
        const listed = await props.host.invoke('list', {})
        custom.value = listed?.custom || []
        const response = await fetch('/api/video/edid', { credentials: 'same-origin' })
        if (!response.ok) {
          hdmiHex.value = ''
          hdmiWritable.value = false
          return
        }
        const body = await response.json()
        hdmiHex.value = body.data_hex || ''
        hdmiWritable.value = Boolean(body.writable)
      }

      async function loadSelection() {
        busy.value = 'load'
        error.value = ''
        try {
          if (selection.value === 'hdmi:current') {
            const data = bytesFromHex(hdmiHex.value)
            if (!data) throw new Error(t('noHdmi'))
            applyBytes(data, { kind: 'hdmi', id: '' })
            return
          }
          const [source, id] = selection.value.split(':')
          if (source !== 'custom' || !id) return
          const body = await props.host.invoke('read', { source, id })
          applyBytes(bytesFromHex(body.data_hex), { kind: 'custom', id: body.id || id })
        } catch (reason) {
          error.value = reasonText(reason)
        } finally {
          busy.value = ''
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
        })
      })

      const row = (label, control) => h('label', { class: 'edid-row' }, [h('span', label), control])
      const timingLabel = (timing) => `${timing.width}×${timing.height}@${timing.fps}${timing.preferred ? ` - ${t('preferred')}` : ''}`

      function currentBytes() {
        return bytesFromHex(hex.value) || new Uint8Array(0)
      }

      function moveCursor(index, nibble) {
        const data = currentBytes()
        if (!data.length) {
          hexCursor.value = { index: 0, nibble: 0 }
          return
        }
        const next = Math.max(0, Math.min(data.length - 1, index))
        hexCursor.value = { index: next, nibble: nibble ? 1 : 0 }
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
        fixChecksums(data)
        if (!validEdid(data)) return
        applyBytes(data, { kind: loadedKind.value, id: loadedId.value, fileName: fileName.value })
        if (cursor.nibble === 0) moveCursor(index, 1)
        else moveCursor(index + 1, 0)
      }

      function onHexKey(event) {
        const data = currentBytes()
        if (!data.length) return
        const cursor = hexCursor.value
        if (/^[0-9a-fA-F]$/.test(event.key)) {
          event.preventDefault()
          writeNibble(event.key)
          return
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          if (cursor.nibble === 1) moveCursor(cursor.index, 0)
          else moveCursor(cursor.index - 1, 1)
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          if (cursor.nibble === 0) moveCursor(cursor.index, 1)
          else moveCursor(cursor.index + 1, 0)
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          moveCursor(cursor.index - 16, cursor.nibble)
        } else if (event.key === 'ArrowDown') {
          event.preventDefault()
          moveCursor(cursor.index + 16, cursor.nibble)
        } else if (event.key === 'Backspace') {
          event.preventDefault()
          if (cursor.nibble === 1) moveCursor(cursor.index, 0)
          else moveCursor(cursor.index - 1, 1)
        }
      }

      function selectByte(index) {
        moveCursor(index, 0)
        hexGridEl.value?.focus()
      }

      const hexField = (editable) => {
        const data = currentBytes()
        const rows = []
        for (let offset = 0; offset < data.length; offset += 16) {
          const cells = []
          let ascii = ''
          for (let col = 0; col < 16; col++) {
            const index = offset + col
            if (index >= data.length) {
              cells.push(h('span', { class: 'edid-hex-byte is-empty' }, '  '))
              ascii += ' '
              continue
            }
            const selected = editable && hexCursor.value.index === index
            ascii += data[index] >= 32 && data[index] < 127 ? String.fromCharCode(data[index]) : '.'
            const text = data[index].toString(16).padStart(2, '0')
            cells.push(h('button', {
              type: 'button',
              class: ['edid-hex-byte', selected ? 'is-selected' : '', col === 8 ? 'is-gap' : ''].filter(Boolean).join(' '),
              onClick: () => { if (editable) selectByte(index) },
            }, [
              h('span', { class: selected && hexCursor.value.nibble === 0 ? 'is-nib' : '' }, text[0]),
              h('span', { class: selected && hexCursor.value.nibble === 1 ? 'is-nib' : '' }, text[1]),
            ]))
          }
          rows.push(h('div', { class: 'edid-hex-row' }, [
            h('span', { class: 'edid-hex-off' }, offset.toString(16).padStart(4, '0')),
            h('div', { class: 'edid-hex-bytes' }, cells),
            h('span', { class: 'edid-hex-ascii' }, ascii),
          ]))
        }
        return h('div', { class: 'edid-hex-wrap' }, [
          h('h3', editable ? t('hexEditor') : t('hexViewer')),
          h('p', { class: 'edid-hint' }, editable ? t('hexHint') : null),
          h('div', {
            class: ['edid-hex-grid', editable ? 'is-edit' : 'is-view'].join(' '),
            tabindex: editable ? 0 : -1,
            ref: editable ? (el) => { hexGridEl.value = el } : undefined,
            onKeydown: editable ? onHexKey : undefined,
          }, rows.length ? rows : [h('p', t('empty'))]),
        ])
      }

      const viewPane = () => h('div', { class: 'edid-pane' }, [
        h(NSelect, {
          value: selection.value,
          options: fileOptions.value,
          loading: busy.value === 'load',
          'onUpdate:value': (value) => { selection.value = value },
        }),
        row(t('fileName'), h(NInput, {
          value: loadedKind.value === 'custom' ? fileLabel(loadedId.value) : (loadedKind.value === 'hdmi' ? t('hdmi') : fileName.value),
          readonly: true,
        })),
        loaded.value ? h('dl', { class: 'edid-props' }, [
          h('dt', t('manufacturer')), h('dd', pnpLabel(manufacturer.value)),
          h('dt', t('name')), h('dd', monitorName.value),
          h('dt', t('size')), h('dd', `${(hex.value.length / 2) | 0} B`),
          h('dt', t('timings')), h('dd', timings.value.map(timingLabel).join(', ')),
        ]) : h('p', t('empty')),
        hexField(true),
        h('div', { class: 'edid-actions' }, [
          h(NButton, { type: 'primary', disabled: !loaded.value || !hdmiWritable.value, loading: busy.value === 'apply', onClick: applyHdmi }, { default: () => t('apply') }),
        ]),
        h('p', { class: 'edid-hint' }, t('applyHint')),
      ])

      const editPane = () => h('div', { class: 'edid-pane' }, [
        h('input', {
          type: 'file',
          accept: '.edid.bin,application/octet-stream',
          style: 'display:none',
          ref: (el) => { importInput.value = el },
          onChange: importFile,
        }),
        h(NAlert, { type: 'info', showIcon: false }, { default: () => t('importAlert') }),
        h('div', { class: 'edid-toolbar' }, [
          h(NButton, { onClick: openImport }, { default: () => t('importFile') }),
        ]),
        h('h3', t('identity')),
        row(t('manufacturerPreset'), h(NSelect, {
          value: manufacturerSelect.value,
          options: pnpOptions.value,
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
        row(t('manufacturerCustom'), h(NInput, {
          value: manufacturer.value,
          maxlength: 3,
          placeholder: 'OKV',
          'onUpdate:value': (value) => {
            pnpCustom.value = true
            manufacturer.value = String(value || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
            rebuildFromFields()
          },
        })),
        h('p', { class: 'edid-hint' }, t('manufacturerHint')),
        row(t('name'), h(NInput, {
          value: monitorName.value,
          maxlength: 13,
          'onUpdate:value': (value) => { monitorName.value = value; rebuildFromFields() },
        })),
        h('h3', t('timings')),
        row(t('template'), h(NSelect, {
          value: null,
          options: templateOptions,
          placeholder: t('addTiming'),
          'onUpdate:value': (value) => { if (value) addTiming(value) },
        })),
        ...timings.value.map((timing, index) => h('div', { class: 'edid-timing' }, [
          h('div', { class: 'edid-timing-head' }, [
            h('strong', timingLabel(timing)),
            h(NButton, { size: 'small', disabled: timing.preferred, onClick: () => setPreferred(index) }, { default: () => t('preferred') }),
            h(NButton, { size: 'small', disabled: timings.value.length <= 1, onClick: () => removeTiming(index) }, { default: () => t('removeTiming') }),
          ]),
          h('div', { class: 'edid-grid' }, [
            row(t('width'), h(NInputNumber, { value: timing.width, min: 640, max: 4096, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { width: value ?? timing.width }) })),
            row(t('height'), h(NInputNumber, { value: timing.height, min: 480, max: 2160, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { height: value ?? timing.height }) })),
            row(t('fps'), h(NInputNumber, { value: timing.fps, min: 24, max: 240, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { fps: value ?? timing.fps }) })),
          ]),
          h('h4', t('customParams')),
          h('div', { class: 'edid-grid' }, [
            row(t('pixclk'), h(NInputNumber, { value: timing.pixclk, min: 2500, max: 60000, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { pixclk: value ?? timing.pixclk }) })),
            row(t('hblank'), h(NInputNumber, { value: timing.hblank, min: 16, max: 1024, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hblank: value ?? timing.hblank }) })),
            row(t('vblank'), h(NInputNumber, { value: timing.vblank, min: 4, max: 256, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vblank: value ?? timing.vblank }) })),
            row(t('hso'), h(NInputNumber, { value: timing.hso, min: 0, max: 1023, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hso: value ?? timing.hso }) })),
            row(t('hsw'), h(NInputNumber, { value: timing.hsw, min: 1, max: 1023, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hsw: value ?? timing.hsw }) })),
            row(t('vso'), h(NInputNumber, { value: timing.vso, min: 0, max: 63, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vso: value ?? timing.vso }) })),
            row(t('vsw'), h(NInputNumber, { value: timing.vsw, min: 1, max: 63, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vsw: value ?? timing.vsw }) })),
          ]),
        ])),
        hexField(true),
        row(t('fileName'), h(NInput, {
          value: fileName.value,
          placeholder: t('filePlaceholder'),
          maxlength: 72,
          'onUpdate:value': (value) => { fileName.value = String(value || '').trim() },
        })),
        h('div', { class: 'edid-actions' }, [
          h(NButton, { type: 'primary', disabled: !loaded.value, loading: busy.value === 'save', onClick: saveCustom }, { default: () => t('save') }),
          h(NButton, { disabled: !canDelete.value, loading: busy.value === 'delete', onClick: deleteCustom }, { default: () => t('remove') }),
        ]),
      ])

      return () => h('section', { class: 'edid-editor' }, [
        h('h2', t('title')),
        h('p', t('description')),
        error.value ? h(NAlert, { type: 'error', showIcon: false }, { default: () => error.value }) : null,
        h(NTabs, { value: tab.value, type: 'line', 'onUpdate:value': (value) => { tab.value = value } }, {
          default: () => [
            h(NTabPane, { name: 'view', tab: t('tabView') }, { default: viewPane }),
            h(NTabPane, { name: 'edit', tab: t('tabEdit') }, { default: editPane }),
          ],
        }),
      ])
    },
  })

  runtime.register('edid', {
    apiVersion: 1,
    component: Page,
    styles: [`
      .edid-editor { display: grid; gap: 16px; }
      .edid-editor h2 { margin: 0; }
      .edid-editor h3 { margin: 8px 0 0; }
      .edid-editor h4 { margin: 4px 0 0; font-size: 13px; }
      .edid-editor p { margin: 0; }
      .edid-pane { display: grid; gap: 16px; padding-top: 8px; }
      .edid-toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
      .edid-row { display: grid; gap: 8px; }
      .edid-row > span { font-size: 13px; font-weight: 600; }
      .edid-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px 14px; }
      .edid-actions { display: flex; flex-wrap: wrap; gap: 10px; padding-top: 4px; }
      .edid-hint { opacity: 0.78; font-size: 13px; }
      .edid-props { display: grid; grid-template-columns: max-content 1fr; gap: 8px 16px; margin: 0; }
      .edid-props dt { font-weight: 600; }
      .edid-props dd { margin: 0; }
      .edid-timing { display: grid; gap: 12px; padding: 14px; border: 1px solid rgba(127,127,127,0.28); border-radius: 10px; }
      .edid-timing-head { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
      .edid-hex-wrap { display: grid; gap: 10px; }
      .edid-hex-grid {
        outline: none;
        padding: 12px;
        overflow: auto;
        border-radius: 10px;
        background: rgba(127,127,127,0.12);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 12px;
        line-height: 1.5;
      }
      .edid-hex-grid.is-edit:focus { box-shadow: inset 0 0 0 1px rgba(24,160,88,0.7); }
      .edid-hex-row { display: grid; grid-template-columns: 3.2em minmax(18em, 1fr) 12em; gap: 10px; align-items: center; }
      .edid-hex-off { opacity: 0.55; }
      .edid-hex-bytes { display: grid; grid-template-columns: repeat(16, 1.7em); column-gap: 4px; }
      .edid-hex-byte {
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 3px;
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: center;
        cursor: default;
      }
      .edid-hex-grid.is-edit .edid-hex-byte { cursor: text; }
      .edid-hex-byte.is-gap { margin-left: 6px; }
      .edid-hex-byte.is-selected { background: #18a058; color: #fff; }
      .edid-hex-byte .is-nib { text-decoration: underline; }
      .edid-hex-ascii { opacity: 0.7; letter-spacing: 0.04em; }
    `],
  })
})()
