(() => {
  const runtime = window.OneKVMPluginUI.v1
  const { computed, defineComponent, h, onMounted, ref } = runtime.vue
  const { NAlert, NButton, NInput, NInputNumber, NSelect, useMessage } = runtime.naive
  const t = runtime.i18n.createTranslator({
    default: {
      title: 'EDID file editor',
      description: 'Edit manufacturer, name and preferred timing, then save a custom file. Core applies a saved file to the HDMI capture chip.',
      open: 'Open file',
      load: 'Load',
      importBin: 'Import .bin',
      loadHdmi: 'Load current HDMI',
      identity: 'Identity',
      manufacturer: 'Manufacturer (3 letters)',
      name: 'Monitor name',
      timing: 'Preferred timing',
      template: 'Timing template',
      width: 'Width',
      height: 'Height',
      fps: 'Refresh (Hz)',
      pixclk: 'Pixel clock (10 kHz)',
      hblank: 'H blank',
      vblank: 'V blank',
      hex: 'Raw EDID hex',
      saveAs: 'Save as custom file',
      fileId: 'Custom file id',
      save: 'Save file',
      remove: 'Delete custom file',
      apply: 'Apply to HDMI',
      applyHint: 'Writes the current draft through Core. This does not save a file.',
      empty: 'No EDID loaded yet.',
      invalidId: 'Use a lowercase id: start with a letter or digit, then letters, digits, ".", "_" or "-".',
      invalidEdid: 'EDID blob is invalid.',
      saved: 'Custom EDID file saved.',
      deleted: 'Custom EDID file deleted.',
      applied: 'Core applied the EDID to the capture chip.',
      appliedHotplug: 'Core applied the EDID. Re-detect the display on the controlled host.',
      appliedReboot: 'Core wrote the EDID. Restart this device before the host sees it.',
      appliedPower: 'Core wrote the EDID. Power-cycle this device before the host sees it.',
      hdmi: 'Current HDMI',
      presets: 'Presets',
      custom: 'Custom files',
      groupHdmi: 'HDMI',
      noHdmi: 'Current HDMI EDID is unavailable.',
    },
    zh: {
      title: 'EDID 文件编辑器',
      description: '编辑厂商、名称和首选时序，然后保存为自定义文件。Core 负责把保存的文件应用到 HDMI 采集芯片。',
      open: '打开文件',
      load: '打开',
      importBin: '导入 .bin',
      loadHdmi: '载入当前 HDMI',
      identity: '标识',
      manufacturer: '厂商（3 个字母）',
      name: '显示器名称',
      timing: '首选时序',
      template: '时序模板',
      width: '宽度',
      height: '高度',
      fps: '刷新率（Hz）',
      pixclk: '像素时钟（10 kHz）',
      hblank: '水平消隐',
      vblank: '垂直消隐',
      hex: '原始 EDID 十六进制',
      saveAs: '保存为自定义文件',
      fileId: '自定义文件 id',
      save: '保存文件',
      remove: '删除自定义文件',
      apply: '应用到 HDMI',
      applyHint: '把当前草稿通过 Core 写入采集芯片，不会保存文件。',
      empty: '尚未载入 EDID。',
      invalidId: '自定义 id 需小写：以字母或数字开头，后面可以是字母、数字、"."、"_" 或 "-"。',
      invalidEdid: 'EDID 内容无效。',
      saved: '已保存自定义 EDID 文件。',
      deleted: '已删除自定义 EDID 文件。',
      applied: 'Core 已把 EDID 应用到采集芯片。',
      appliedHotplug: 'Core 已写入 EDID。请在被控主机上重新检测显示器。',
      appliedReboot: 'Core 已写入 EDID。重启本机后，被控主机才会看到新 EDID。',
      appliedPower: 'Core 已写入 EDID。给本机断电再上电后，被控主机才会看到新 EDID。',
      hdmi: '当前 HDMI',
      presets: '预设',
      custom: '自定义文件',
      groupHdmi: 'HDMI',
      noHdmi: '当前 HDMI EDID 不可用。',
    },
    'zh-TW': {
      title: 'EDID 檔案編輯器',
      description: '編輯廠商、名稱與首選時序，然後儲存為自訂檔案。Core 負責把儲存的檔案套用到 HDMI 擷取晶片。',
      open: '開啟檔案',
      load: '開啟',
      importBin: '匯入 .bin',
      loadHdmi: '載入目前 HDMI',
      identity: '識別',
      manufacturer: '廠商（3 個字母）',
      name: '顯示器名稱',
      timing: '首選時序',
      template: '時序範本',
      width: '寬度',
      height: '高度',
      fps: '重新整理（Hz）',
      pixclk: '像素時脈（10 kHz）',
      hblank: '水平消隱',
      vblank: '垂直消隱',
      hex: '原始 EDID 十六進位',
      saveAs: '儲存為自訂檔案',
      fileId: '自訂檔案 id',
      save: '儲存檔案',
      remove: '刪除自訂檔案',
      apply: '套用到 HDMI',
      applyHint: '把目前草稿透過 Core 寫入擷取晶片，不會儲存檔案。',
      empty: '尚未載入 EDID。',
      invalidId: '自訂 id 需小寫：以字母或數字開頭，後面可以是字母、數字、"."、"_" 或 "-"。',
      invalidEdid: 'EDID 內容無效。',
      saved: '已儲存自訂 EDID 檔案。',
      deleted: '已刪除自訂 EDID 檔案。',
      applied: 'Core 已把 EDID 套用到擷取晶片。',
      appliedHotplug: 'Core 已寫入 EDID。請在被控主機上重新偵測顯示器。',
      appliedReboot: 'Core 已寫入 EDID。重新啟動本機後，被控主機才會看到新 EDID。',
      appliedPower: 'Core 已寫入 EDID。為本機斷電再上電後，被控主機才會看到新 EDID。',
      hdmi: '目前 HDMI',
      presets: '預設',
      custom: '自訂檔案',
      groupHdmi: 'HDMI',
      noHdmi: '目前 HDMI EDID 無法取得。',
    },
  })

  const BLOCK = 128
  const ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,62}$/
  const TEMPLATES = [
    { id: '1080p60', label: '1920×1080 @ 60', width: 1920, height: 1080, fps: 60, pixclk: 14850, hblank: 280, vblank: 45, hso: 88, hsw: 44, vso: 4, vsw: 5, vics: [16, 31, 4, 3], name: 'OneKVM 1080p' },
    { id: '1440p30', label: '2560×1440 @ 30', width: 2560, height: 1440, fps: 30, pixclk: 14625, hblank: 160, vblank: 37, hso: 48, hsw: 32, vso: 3, vsw: 5, vics: [16, 4], name: 'OneKVM 1440p' },
    { id: '720p120', label: '1280×720 @ 120', width: 1280, height: 720, fps: 120, pixclk: 14850, hblank: 370, vblank: 30, hso: 110, hsw: 40, vso: 5, vsw: 5, vics: [47, 4, 16], name: 'OneKVM 720p' },
    { id: '1080p30', label: '1920×1080 @ 30', width: 1920, height: 1080, fps: 30, pixclk: 7425, hblank: 280, vblank: 45, hso: 88, hsw: 44, vso: 4, vsw: 5, vics: [34, 16, 4], name: 'OneKVM 1080p' },
    { id: '720p60', label: '1280×720 @ 60', width: 1280, height: 720, fps: 60, pixclk: 7425, hblank: 370, vblank: 30, hso: 110, hsw: 40, vso: 5, vsw: 5, vics: [4, 16], name: 'OneKVM 720p' },
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
    const id = ((text.charCodeAt(0) - 64) << 10) | ((text.charCodeAt(1) - 64) << 5) | (text.charCodeAt(2) - 64)
    data[8] = (id >> 8) & 0xff
    data[9] = id & 0xff
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

  function writeCEA(dst, vics) {
    dst.fill(0)
    dst[0] = 0x02
    dst[1] = 0x03
    let offset = 4
    dst[offset] = 0x40 | (vics.length + 1)
    dst[offset + 1] = 0x00
    for (let i = 0; i < vics.length; i++) dst[offset + 2 + i] = vics[i] & 0xff
    dst[2] = offset + 2 + vics.length
  }

  function preferredOf(data) {
    if (data.length < 72 || data[18] < 1) return null
    const pixclk = data[54] | (data[55] << 8)
    if (pixclk === 0) return null
    const width = data[56] | ((data[58] >> 4) << 8)
    const hblank = data[57] | ((data[58] & 0x0f) << 8)
    const height = data[59] | ((data[61] >> 4) << 8)
    const vblank = data[60] | ((data[61] & 0x0f) << 8)
    const hso = data[62] | ((data[65] >> 6) << 8)
    const hsw = data[63] | (((data[65] >> 4) & 0x03) << 8)
    const vso = ((data[64] >> 4) & 0x0f) | (((data[65] >> 2) & 0x03) << 4)
    const vsw = (data[64] & 0x0f) | ((data[65] & 0x03) << 4)
    const htotal = width + hblank
    const vtotal = height + vblank
    const fps = htotal > 0 && vtotal > 0 ? Math.round((pixclk * 10000) / (htotal * vtotal)) : 0
    return { width, height, fps, pixclk, hblank, vblank, hso, hsw, vso, vsw }
  }

  function buildNamed(fields) {
    const data = new Uint8Array(256)
    data.set([0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00])
    writeManufacturer(data, fields.manufacturer || 'OKV')
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
    writeDTD(data.subarray(54, 72), fields)
    writeName(data.subarray(72, 90), fields.name)
    writeRange(data.subarray(90, 108), fields.fps)
    data[126] = 1
    writeCEA(data.subarray(128, 256), fields.vics || [16, 4])
    fixChecksums(data)
    return data
  }

  function patchEdid(base, fields) {
    const data = base && base.length >= BLOCK ? Uint8Array.from(base) : buildNamed(fields)
    if (data.length < 128) return null
    writeManufacturer(data, fields.manufacturer)
    writeDTD(data.subarray(54, 72), fields)
    let nameAt = -1
    let rangeAt = -1
    for (let offset = 72; offset + 18 <= BLOCK; offset += 18) {
      if (data[offset] === 0 && data[offset + 1] === 0 && data[offset + 2] === 0 && data[offset + 3] === 0xfc) nameAt = offset
      if (data[offset] === 0 && data[offset + 1] === 0 && data[offset + 2] === 0 && data[offset + 3] === 0xfd) rangeAt = offset
    }
    writeName(data.subarray(nameAt >= 0 ? nameAt : 72, (nameAt >= 0 ? nameAt : 72) + 18), fields.name)
    writeRange(data.subarray(rangeAt >= 0 ? rangeAt : 90, (rangeAt >= 0 ? rangeAt : 90) + 18), fields.fps)
    fixChecksums(data)
    return validEdid(data) ? data : null
  }

  function parseFields(data) {
    const timing = preferredOf(data) || TEMPLATES[0]
    const matched = TEMPLATES.find((item) => item.width === timing.width && item.height === timing.height && item.fps === timing.fps)
    return {
      manufacturer: manufacturerOf(data) || 'OKV',
      name: monitorNameOf(data) || 'OneKVM',
      width: timing.width,
      height: timing.height,
      fps: timing.fps,
      pixclk: timing.pixclk,
      hblank: timing.hblank,
      vblank: timing.vblank,
      hso: timing.hso ?? matched?.hso ?? 88,
      hsw: timing.hsw ?? matched?.hsw ?? 44,
      vso: timing.vso ?? matched?.vso ?? 4,
      vsw: timing.vsw ?? matched?.vsw ?? 5,
      vics: matched?.vics || [16, 4],
      template: matched?.id || '',
    }
  }

  function reasonText(reason) {
    if (reason instanceof Error) return reason.message
    return String(reason)
  }

  const Page = defineComponent({
    name: 'EdidExtensionPage',
    props: { host: { type: Object, required: true } },
    setup(props) {
      const message = useMessage()
      const error = ref('')
      const busy = ref('')
      const presets = ref([])
      const custom = ref([])
      const selection = ref('hdmi:current')
      const hdmiHex = ref('')
      const hdmiWritable = ref(false)
      const fileId = ref('')
      const hex = ref('')
      const manufacturer = ref('OKV')
      const monitorName = ref('OneKVM 1080p')
      const width = ref(1920)
      const height = ref(1080)
      const fps = ref(60)
      const pixclk = ref(14850)
      const hblank = ref(280)
      const vblank = ref(45)
      const hso = ref(88)
      const hsw = ref(44)
      const vso = ref(4)
      const vsw = ref(5)
      const vics = ref([16, 31, 4, 3])
      const template = ref('1080p60')
      const syncing = ref(false)

      const fileOptions = computed(() => [
        {
          type: 'group',
          label: t('groupHdmi'),
          key: 'hdmi',
          children: [{ label: t('hdmi'), value: 'hdmi:current' }],
        },
        {
          type: 'group',
          label: t('presets'),
          key: 'presets',
          children: presets.value.map((file) => ({ label: file.id, value: `preset:${file.id}` })),
        },
        {
          type: 'group',
          label: t('custom'),
          key: 'custom',
          children: custom.value.map((file) => ({ label: file.id, value: `custom:${file.id}` })),
        },
      ])
      const templateOptions = TEMPLATES.map((item) => ({ label: item.label, value: item.id }))
      const loaded = computed(() => validEdid(bytesFromHex(hex.value)))
      const canDelete = computed(() => ID_PATTERN.test(fileId.value) && custom.value.some((file) => file.id === fileId.value))

      function fields() {
        return {
          manufacturer: manufacturer.value,
          name: monitorName.value,
          width: width.value | 0,
          height: height.value | 0,
          fps: fps.value | 0,
          pixclk: pixclk.value | 0,
          hblank: hblank.value | 0,
          vblank: vblank.value | 0,
          hso: hso.value | 0,
          hsw: hsw.value | 0,
          vso: vso.value | 0,
          vsw: vsw.value | 0,
          vics: vics.value,
        }
      }

      function applyBytes(data, id) {
        if (!validEdid(data)) throw new Error(t('invalidEdid'))
        const parsed = parseFields(data)
        syncing.value = true
        manufacturer.value = parsed.manufacturer
        monitorName.value = parsed.name
        width.value = parsed.width
        height.value = parsed.height
        fps.value = parsed.fps
        pixclk.value = parsed.pixclk
        hblank.value = parsed.hblank
        vblank.value = parsed.vblank
        hso.value = parsed.hso
        hsw.value = parsed.hsw
        vso.value = parsed.vso
        vsw.value = parsed.vsw
        vics.value = parsed.vics
        template.value = parsed.template
        hex.value = hexFromBytes(data)
        if (id) fileId.value = id
        syncing.value = false
      }

      function rebuildFromFields() {
        if (syncing.value) return
        const base = bytesFromHex(hex.value)
        const data = patchEdid(base, fields()) || buildNamed(fields())
        syncing.value = true
        hex.value = hexFromBytes(data)
        syncing.value = false
      }

      function setTemplate(id) {
        const item = TEMPLATES.find((entry) => entry.id === id)
        if (!item) return
        syncing.value = true
        template.value = item.id
        width.value = item.width
        height.value = item.height
        fps.value = item.fps
        pixclk.value = item.pixclk
        hblank.value = item.hblank
        vblank.value = item.vblank
        hso.value = item.hso
        hsw.value = item.hsw
        vso.value = item.vso
        vsw.value = item.vsw
        vics.value = item.vics
        if (!monitorName.value) monitorName.value = item.name
        syncing.value = false
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
            applyBytes(data, fileId.value || 'current')
            return
          }
          const [source, id] = selection.value.split(':')
          const body = await props.host.invoke('read', { source, id })
          applyBytes(bytesFromHex(body.data_hex), body.id)
          if (source === 'custom') fileId.value = id
        } catch (reason) {
          error.value = reasonText(reason)
        } finally {
          busy.value = ''
        }
      }

      async function loadHdmi() {
        selection.value = 'hdmi:current'
        await reloadCatalog()
        await loadSelection()
      }

      function importBin(event) {
        const file = event.target.files && event.target.files[0]
        event.target.value = ''
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const data = new Uint8Array(reader.result)
            applyBytes(data, file.name.replace(/\.bin$/i, '').toLowerCase())
            error.value = ''
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
        applyBytes(data, fileId.value)
      }

      async function saveCustom() {
        if (!ID_PATTERN.test(fileId.value)) {
          error.value = t('invalidId')
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
          await props.host.invoke('save', { id: fileId.value, data_hex: hexFromBytes(data) })
          await reloadCatalog()
          selection.value = `custom:${fileId.value}`
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
          await props.host.invoke('delete', { id: fileId.value })
          await reloadCatalog()
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

      return () => h('section', { class: 'edid-editor' }, [
        h('h2', t('title')),
        h('p', t('description')),
        error.value ? h(NAlert, { type: 'error', showIcon: false }, { default: () => error.value }) : null,
        h('div', { class: 'edid-toolbar' }, [
          h(NSelect, {
            value: selection.value,
            options: fileOptions.value,
            'onUpdate:value': (value) => { selection.value = value },
          }),
          h(NButton, { loading: busy.value === 'load', onClick: loadSelection }, { default: () => t('load') }),
          h(NButton, { loading: busy.value === 'load', onClick: loadHdmi }, { default: () => t('loadHdmi') }),
          h('label', { class: 'edid-import' }, [
            t('importBin'),
            h('input', { type: 'file', accept: '.bin,application/octet-stream', onChange: importBin }),
          ]),
        ]),
        h('h3', t('identity')),
        row(t('manufacturer'), h(NInput, {
          value: manufacturer.value,
          maxlength: 3,
          'onUpdate:value': (value) => { manufacturer.value = String(value || '').toUpperCase(); rebuildFromFields() },
        })),
        row(t('name'), h(NInput, {
          value: monitorName.value,
          maxlength: 13,
          'onUpdate:value': (value) => { monitorName.value = value; rebuildFromFields() },
        })),
        h('h3', t('timing')),
        row(t('template'), h(NSelect, {
          value: template.value || null,
          options: templateOptions,
          clearable: true,
          'onUpdate:value': (value) => { if (value) setTemplate(value) },
        })),
        h('div', { class: 'edid-grid' }, [
          row(t('width'), h(NInputNumber, { value: width.value, min: 640, max: 4096, precision: 0, 'onUpdate:value': (value) => { width.value = value ?? width.value; rebuildFromFields() } })),
          row(t('height'), h(NInputNumber, { value: height.value, min: 480, max: 2160, precision: 0, 'onUpdate:value': (value) => { height.value = value ?? height.value; rebuildFromFields() } })),
          row(t('fps'), h(NInputNumber, { value: fps.value, min: 24, max: 240, precision: 0, 'onUpdate:value': (value) => { fps.value = value ?? fps.value; rebuildFromFields() } })),
          row(t('pixclk'), h(NInputNumber, { value: pixclk.value, min: 2500, max: 60000, precision: 0, 'onUpdate:value': (value) => { pixclk.value = value ?? pixclk.value; rebuildFromFields() } })),
          row(t('hblank'), h(NInputNumber, { value: hblank.value, min: 16, max: 1024, precision: 0, 'onUpdate:value': (value) => { hblank.value = value ?? hblank.value; rebuildFromFields() } })),
          row(t('vblank'), h(NInputNumber, { value: vblank.value, min: 4, max: 256, precision: 0, 'onUpdate:value': (value) => { vblank.value = value ?? vblank.value; rebuildFromFields() } })),
        ]),
        h('h3', t('hex')),
        loaded.value ? null : h('p', t('empty')),
        h(NInput, {
          type: 'textarea',
          value: hex.value,
          autosize: { minRows: 6, maxRows: 12 },
          'onUpdate:value': onHexInput,
        }),
        h('h3', t('saveAs')),
        row(t('fileId'), h(NInput, { value: fileId.value, maxlength: 63, 'onUpdate:value': (value) => { fileId.value = String(value || '').trim() } })),
        h('div', { class: 'edid-actions' }, [
          h(NButton, { type: 'primary', disabled: !loaded.value, loading: busy.value === 'save', onClick: saveCustom }, { default: () => t('save') }),
          h(NButton, { disabled: !canDelete.value, loading: busy.value === 'delete', onClick: deleteCustom }, { default: () => t('remove') }),
          h(NButton, { type: 'primary', secondary: true, disabled: !loaded.value || !hdmiWritable.value, loading: busy.value === 'apply', onClick: applyHdmi }, { default: () => t('apply') }),
        ]),
        h('p', { class: 'edid-hint' }, t('applyHint')),
      ])
    },
  })

  runtime.register('edid', {
    apiVersion: 1,
    component: Page,
    styles: [`
      .edid-editor { display: grid; gap: 12px; }
      .edid-editor h2, .edid-editor h3, .edid-editor p { margin: 0; }
      .edid-toolbar { display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; gap: 8px; align-items: center; }
      .edid-import { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; }
      .edid-import input { max-width: 180px; }
      .edid-row { display: grid; gap: 6px; }
      .edid-row > span { font-size: 13px; font-weight: 600; }
      .edid-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
      .edid-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      .edid-hint { opacity: 0.78; font-size: 13px; }
      @media (max-width: 720px) {
        .edid-toolbar { grid-template-columns: 1fr; }
      }
    `],
  })
})()
