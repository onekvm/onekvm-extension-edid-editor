(() => {
  const runtime = window.OneKVMPluginUI.v1
  const { computed, defineComponent, h, onMounted, ref } = runtime.vue
  const { NAlert, NButton, NSelect } = runtime.naive
  const labels = runtime.i18n.createMessages({
    default: {
      title: 'EDID libraries',
      description: 'Core lists every installed provider of kind edid. This page can also store custom blobs in this extension data directory.',
      apply: 'Apply to HDMI',
      empty: 'No EDID libraries are installed.',
    },
    zh: {
      title: 'EDID 内容库',
      description: 'Core 会列出所有 kind 为 edid 的已安装提供者。本页也可以把自定义文件存进当前插件的数据目录。',
      apply: '应用到 HDMI',
      empty: '尚未安装任何 EDID 内容库。',
    },
    'zh-TW': {
      title: 'EDID 內容庫',
      description: 'Core 會列出所有 kind 為 edid 的已安裝提供者。本頁也可以把自訂檔案存進目前擴充的資料目錄。',
      apply: '套用到 HDMI',
      empty: '尚未安裝任何 EDID 內容庫。',
    },
  })

  const Page = defineComponent({
    name: 'EdidExtensionPage',
    props: { host: { type: Object, required: true } },
    setup() {
      const libraries = ref([])
      const selection = ref('')
      const error = ref('')
      const busy = ref(false)
      const options = computed(() => libraries.value.flatMap((library) =>
        (library.files || []).map((file) => ({
          label: `${file.id} · ${library.extension}/${library.id}`,
          value: [library.extension, library.id, file.id].join('\0'),
        })),
      ))

      async function reload() {
        const response = await fetch('/api/libraries/edid', { credentials: 'same-origin' })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const body = await response.json()
        libraries.value = body.libraries || []
      }

      async function apply() {
        const [extension, directory, id] = selection.value.split('\0')
        if (!extension) return
        busy.value = true
        error.value = ''
        try {
          const response = await fetch('/api/video/edid', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ library: { extension, directory, id } }),
          })
          if (!response.ok) {
            const body = await response.json().catch(() => ({}))
            throw new Error(body.error || `HTTP ${response.status}`)
          }
        } catch (reason) {
          error.value = reason instanceof Error ? reason.message : String(reason)
        } finally {
          busy.value = false
        }
      }

      onMounted(() => {
        reload().catch((reason) => {
          error.value = reason instanceof Error ? reason.message : String(reason)
        })
      })

      return () => h('section', { class: 'edid-extension-page' }, [
        h('h2', labels.title),
        h('p', labels.description),
        error.value ? h(NAlert, { type: 'error', showIcon: false }, { default: () => error.value }) : null,
        options.value.length === 0 ? h('p', labels.empty) : h(NSelect, {
          value: selection.value,
          options: options.value,
          'onUpdate:value': (value) => { selection.value = value },
        }),
        h(NButton, { type: 'primary', disabled: !selection.value, loading: busy.value, onClick: apply }, {
          default: () => labels.apply,
        }),
      ])
    },
  })

  runtime.register('edid', {
    apiVersion: 1,
    component: Page,
    styles: [`
      .edid-extension-page { display: grid; gap: 14px; }
      .edid-extension-page h2, .edid-extension-page p { margin: 0; }
    `],
  })
})()
