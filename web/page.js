(() => {
  const runtime = window.OneKVMPluginUI.v1
  const { computed, defineComponent, h, onMounted, ref } = runtime.vue
  const { NAlert, NButton, NInput, NInputNumber, NSelect, NTabPane, NTabs, useMessage } = runtime.naive
  const t = runtime.i18n.createTranslator({
    default: {
      title: 'EDID files',
      description: 'Presets live in the package. Custom files live in plugin data. Import only fills the editor.',
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
      hex: 'Raw EDID hex',
      filePath: 'File path',
      savePath: 'Save path (plugin data)',
      pathPlaceholder: 'edid/my-display.edid.bin',
      save: 'Save custom file',
      remove: 'Delete custom file',
      apply: 'Apply to HDMI',
      applyHint: 'Writes the current EDID through Core to the capture chip.',
      empty: 'No EDID loaded yet.',
      invalidPath: 'Save path must look like edid/name.edid.bin and cannot be a preset path.',
      invalidEdid: 'EDID blob is invalid.',
      invalidImport: 'Import a file named *.edid.bin. It is only loaded into this page.',
      presetReadOnly: 'Preset files are in the package and cannot be overwritten. Save to a custom path instead.',
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
      description: '预设在软件包目录，自定义文件在插件数据目录。导入只进入本页编辑器，不会写盘。',
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
      hex: '原始 EDID 十六进制',
      filePath: '文件路径',
      savePath: '保存路径（插件数据）',
      pathPlaceholder: 'edid/my-display.edid.bin',
      save: '保存自定义文件',
      remove: '删除自定义文件',
      apply: '应用到 HDMI',
      applyHint: '把当前 EDID 通过 Core 写入采集芯片。',
      empty: '尚未载入 EDID。',
      invalidPath: '保存路径必须是 edid/名称.edid.bin，且不能是预设路径。',
      invalidEdid: 'EDID 内容无效。',
      invalidImport: '请导入名为 *.edid.bin 的文件。导入只进入本页，不会保存。',
      presetReadOnly: '预设文件在软件包里，不能覆盖。请保存到自定义路径。',
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
      description: '預設在套件目錄，自訂檔案在外掛資料目錄。匯入只進入本頁編輯器，不會寫入磁碟。',
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
      hex: '原始 EDID 十六進位',
      filePath: '檔案路徑',
      savePath: '儲存路徑（外掛資料）',
      pathPlaceholder: 'edid/my-display.edid.bin',
      save: '儲存自訂檔案',
      remove: '刪除自訂檔案',
      apply: '套用到 HDMI',
      applyHint: '把目前 EDID 透過 Core 寫入擷取晶片。',
      empty: '尚未載入 EDID。',
      invalidPath: '儲存路徑必須是 edid/名稱.edid.bin，且不能是預設路徑。',
      invalidEdid: 'EDID 內容無效。',
      invalidImport: '請匯入名為 *.edid.bin 的檔案。匯入只進入本頁，不會儲存。',
      presetReadOnly: '預設檔案在套件裡，不能覆蓋。請儲存到自訂路徑。',
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
    return hit ? `${hit.id} · ${hit.name}` : id
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

  function idFromPath(path) {
    const name = String(path || '').trim().split('/').pop() || ''
    if (name.toLowerCase().endsWith(SUFFIX)) return name.slice(0, -SUFFIX.length)
    return ''
  }

  function customPath(id) {
    return `edid/${id}${SUFFIX}`
  }

  function isPresetPath(path) {
    return String(path || '').startsWith('share/edid/')
  }

  function isCustomPath(path) {
    const value = String(path || '').trim()
    return value.startsWith('edid/') && value.endsWith(SUFFIX) && ID_PATTERN.test(idFromPath(value)) && !value.includes('..')
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
      const presets = ref([])
      const custom = ref([])
      const selection = ref('hdmi:current')
      const hdmiHex = ref('')
      const hdmiWritable = ref(false)
      const loadedPath = ref('')
      const savePath = ref('')
      const sourceLabel = ref('')
      const hex = ref('')
      const manufacturer = ref('OKV')
      const monitorName = ref('OneKVM 1080p')
      const timings = ref([cloneTiming(TEMPLATES[0], true)])
      const syncing = ref(false)
      const importInput = ref(null)

      const fileOptions = computed(() => [
        { type: 'group', label: t('groupHdmi'), key: 'hdmi', children: [{ label: t('hdmi'), value: 'hdmi:current' }] },
        {
          type: 'group',
          label: t('presets'),
          key: 'presets',
          children: presets.value.map((file) => ({ label: `${file.id} · ${file.path || customPath(file.id).replace('edid/', 'share/edid/')}`, value: `preset:${file.id}` })),
        },
        {
          type: 'group',
          label: t('custom'),
          key: 'custom',
          children: custom.value.map((file) => ({ label: `${file.id} · ${file.path || customPath(file.id)}`, value: `custom:${file.id}` })),
        },
      ])
      const templateOptions = TEMPLATES.map((item) => ({ label: item.label, value: item.id }))
      const loaded = computed(() => validEdid(bytesFromHex(hex.value)))
      const canDelete = computed(() => isCustomPath(loadedPath.value) && custom.value.some((file) => file.id === idFromPath(loadedPath.value)))
      const pnpOptions = computed(() => [
        ...PNP_PRESETS.map((item) => ({ label: `${item.id} · ${item.name}`, value: item.id })),
        { label: t('customOption'), value: PNP_CUSTOM },
      ])
      const manufacturerSelect = computed(() => (
        PNP_PRESETS.some((item) => item.id === manufacturer.value) ? manufacturer.value : PNP_CUSTOM
      ))

      function applyBytes(data, meta) {
        if (!validEdid(data)) throw new Error(t('invalidEdid'))
        syncing.value = true
        manufacturer.value = manufacturerOf(data) || 'OKV'
        monitorName.value = monitorNameOf(data) || 'OneKVM'
        timings.value = parseTimings(data)
        hex.value = hexFromBytes(data)
        loadedPath.value = meta.path || ''
        sourceLabel.value = meta.source || ''
        if (meta.savePath !== undefined) savePath.value = meta.savePath
        else if (isCustomPath(meta.path)) savePath.value = meta.path
        else if (meta.id) savePath.value = customPath(meta.id)
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
        presets.value = listed?.presets || []
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
            applyBytes(data, { source: t('hdmi'), path: '', savePath: savePath.value || '', id: 'hdmi' })
            return
          }
          const [source, id] = selection.value.split(':')
          const body = await props.host.invoke('read', { source, id })
          applyBytes(bytesFromHex(body.data_hex), {
            source: source === 'preset' ? t('presets') : t('custom'),
            path: body.path || (source === 'preset' ? `share/edid/${id}${SUFFIX}` : customPath(id)),
            id,
          })
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
          error.value = t('invalidImport')
          return
        }
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const data = new Uint8Array(reader.result)
            const id = idFromPath(file.name.toLowerCase())
            applyBytes(data, {
              source: t('importedDraft'),
              path: '',
              savePath: ID_PATTERN.test(id) ? customPath(id) : savePath.value,
            })
            error.value = ''
            tab.value = 'edit'
          } catch (reason) {
            error.value = reasonText(reason)
          }
        }
        reader.readAsArrayBuffer(file)
      }

      function onHexInput(value) {
        hex.value = value
        if (syncing.value) return
        const data = bytesFromHex(value)
        if (!validEdid(data)) return
        applyBytes(data, { source: sourceLabel.value, path: loadedPath.value, savePath: savePath.value })
      }

      async function saveCustom() {
        if (isPresetPath(savePath.value) || isPresetPath(loadedPath.value) && !isCustomPath(savePath.value)) {
          error.value = t('presetReadOnly')
          return
        }
        if (!isCustomPath(savePath.value)) {
          error.value = t('invalidPath')
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
          const id = idFromPath(savePath.value)
          await props.host.invoke('save', { id, data_hex: hexFromBytes(data) })
          await reloadCatalog()
          loadedPath.value = customPath(id)
          sourceLabel.value = t('custom')
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
          await props.host.invoke('delete', { id: idFromPath(loadedPath.value) })
          await reloadCatalog()
          loadedPath.value = ''
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

      onMounted(() => {
        reloadCatalog().then(() => {
          if (hdmiHex.value) return loadSelection()
          const first = presets.value[0]
          if (!first) return
          selection.value = `preset:${first.id}`
          return loadSelection()
        }).catch((reason) => {
          error.value = reasonText(reason)
        })
      })

      const row = (label, control) => h('label', { class: 'edid-row' }, [h('span', label), control])
      const timingLabel = (timing) => `${timing.width}×${timing.height}@${timing.fps}${timing.preferred ? ` · ${t('preferred')}` : ''}`

      const viewPane = () => [
        h('div', { class: 'edid-toolbar' }, [
          h(NSelect, { value: selection.value, options: fileOptions.value, 'onUpdate:value': (value) => { selection.value = value } }),
          h(NButton, { loading: busy.value === 'load', onClick: loadSelection }, { default: () => t('load') }),
        ]),
        row(t('filePath'), h(NInput, { value: loadedPath.value || t('hdmi'), readonly: true })),
        row(t('source'), h('p', { class: 'edid-hint' }, sourceLabel.value || t('empty'))),
        loaded.value ? h('dl', { class: 'edid-props' }, [
          h('dt', t('manufacturer')), h('dd', pnpLabel(manufacturer.value)),
          h('dt', t('name')), h('dd', monitorName.value),
          h('dt', t('size')), h('dd', `${(hex.value.length / 2) | 0} B`),
          h('dt', t('timings')), h('dd', timings.value.map(timingLabel).join(', ')),
        ]) : h('p', t('empty')),
        h('div', { class: 'edid-actions' }, [
          h(NButton, { type: 'primary', disabled: !loaded.value || !hdmiWritable.value, loading: busy.value === 'apply', onClick: applyHdmi }, { default: () => t('apply') }),
        ]),
        h('p', { class: 'edid-hint' }, t('applyHint')),
      ]

      const editPane = () => [
        h('input', {
          type: 'file',
          accept: '.edid.bin,application/octet-stream',
          style: 'display:none',
          ref: (el) => { importInput.value = el },
          onChange: importFile,
        }),
        h('div', { class: 'edid-toolbar' }, [
          h(NButton, { onClick: openImport }, { default: () => t('importFile') }),
          h('p', { class: 'edid-hint' }, t('invalidImport')),
        ]),
        row(t('savePath'), h(NInput, {
          value: savePath.value,
          placeholder: t('pathPlaceholder'),
          maxlength: 80,
          'onUpdate:value': (value) => { savePath.value = String(value || '').trim() },
        })),
        isPresetPath(loadedPath.value) ? h(NAlert, { type: 'info', showIcon: false }, { default: () => t('presetReadOnly') }) : null,
        h('h3', t('identity')),
        row(t('manufacturerPreset'), h(NSelect, {
          value: manufacturerSelect.value,
          options: pnpOptions.value,
          filterable: true,
          'onUpdate:value': (value) => {
            if (!value || value === PNP_CUSTOM) {
              if (PNP_PRESETS.some((item) => item.id === manufacturer.value)) manufacturer.value = ''
              return
            }
            manufacturer.value = value
            rebuildFromFields()
          },
        })),
        row(t('manufacturerCustom'), h(NInput, {
          value: manufacturer.value,
          maxlength: 3,
          placeholder: 'OKV',
          'onUpdate:value': (value) => {
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
            row(t('pixclk'), h(NInputNumber, { value: timing.pixclk, min: 2500, max: 60000, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { pixclk: value ?? timing.pixclk }) })),
            row(t('hblank'), h(NInputNumber, { value: timing.hblank, min: 16, max: 1024, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { hblank: value ?? timing.hblank }) })),
            row(t('vblank'), h(NInputNumber, { value: timing.vblank, min: 4, max: 256, precision: 0, 'onUpdate:value': (value) => updateTiming(index, { vblank: value ?? timing.vblank }) })),
          ]),
        ])),
        h('h3', t('hex')),
        h(NInput, { type: 'textarea', value: hex.value, autosize: { minRows: 6, maxRows: 12 }, 'onUpdate:value': onHexInput }),
        h('div', { class: 'edid-actions' }, [
          h(NButton, { type: 'primary', disabled: !loaded.value, loading: busy.value === 'save', onClick: saveCustom }, { default: () => t('save') }),
          h(NButton, { disabled: !canDelete.value, loading: busy.value === 'delete', onClick: deleteCustom }, { default: () => t('remove') }),
        ]),
      ]

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
      .edid-editor { display: grid; gap: 12px; }
      .edid-editor h2, .edid-editor h3, .edid-editor p { margin: 0; }
      .edid-toolbar { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; align-items: center; }
      .edid-row { display: grid; gap: 6px; }
      .edid-row > span { font-size: 13px; font-weight: 600; }
      .edid-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
      .edid-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      .edid-hint { opacity: 0.78; font-size: 13px; }
      .edid-props { display: grid; grid-template-columns: auto 1fr; gap: 6px 14px; margin: 0; }
      .edid-props dt { font-weight: 600; }
      .edid-props dd { margin: 0; }
      .edid-timing { display: grid; gap: 8px; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.08); }
      .edid-timing-head { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
      @media (max-width: 720px) {
        .edid-toolbar { grid-template-columns: 1fr; }
      }
    `],
  })
})()
