# onekvm-extension-edid-editor

OneKVM HDMI EDID 文件编辑器。编辑器分组显示内置机型预设和自定义文件。
预设可以查看，并作为编辑起点；保存时写入自定义文件，保留内置预设原件。
当前机型包在 `/usr/share/onekvm/edid/presets/*.edid.bin` 提供只读预设，
编辑器自身不携带预设。
自定义文件在插件数据目录 `ONEKVM_EXTENSION_DATA/edid/*.edid.bin`。
Core 显示设置也可以直接应用内置机型预设，不依赖安装本编辑器。

概览分开显示厂商名称和 PNP ID，并显示来源、EDID 版本和首选模式。
未知厂商保留原始 ID，不猜测品牌。HEX 默认折叠，查看页只读；切到编辑页才可修改。
自定义厂商 ID 必须是完整的三个字母才能保存。文件读取失败会清除上一份信息并禁用应用。
首次打开或切回当前 HDMI 时重新读取 EDID；读取期间显示加载图标，完成后再显示信息或错误。

插件没有常驻后端或健康检查。manifest 为文件管理、校验和 HDMI 方法
分别声明插件自带的 CLI 命令及有类型的参数；Extension Host 只在收到方法调用
时启动命令，并返回命令输出的 JSON。

本插件管理 EDID 文件，并通过 Core 的 `PUT /api/video/edid` 应用到采集芯片。

支持 NanoKVM Cube/PCIe/Lite、NanoKVM Pro 和 NanoKVM Go。预装时默认启用，文件操作按需执行，
不运行常驻进程。

NanoKVM 预设源码和支持模式见
[onekvm-nanokvm-machine](https://github.com/onekvm/onekvm-nanokvm-machine)。

## MCP 工具

启用 EDID 编辑器，并在 MCP 的插件工具策略中允许接入后，可使用以下工具。
工具显示文案支持简体、繁体和英文。

| 工具 | 参数 | 结果 |
| --- | --- | --- |
| `edid-editor__list-edids` | 无 | 列出内置预设和自定义文件的 ID、路径和大小。 |
| `edid-editor__read-edid` | `source: preset/custom`、`id` | 以 `data_hex` 返回文件内容。 |
| `edid-editor__save-edid` | `id`、`data_hex` | 新建或替换自定义文件，另行应用到 HDMI。 |
| `edid-editor__delete-edid` | `id` | 删除自定义文件，当前 HDMI 继续使用已应用的 EDID。 |
| `edid-editor__validate-edid` | `data_hex` | 校验长度、头部和各块校验和，返回字节数和块数。 |
| `edid-editor__read-hdmi` | 无 | 返回当前 HDMI EDID、显示摘要、写入模式和硬件限制。 |
| `edid-editor__apply-hdmi` | `data_hex`、`mode: temporary/permanent` | 应用到 HDMI，返回 `apply_required`。 |

应用前先读取 HDMI 能力。temporary 写入 RAM，permanent 永久保存；不支持的模式会失败。
应用可能中断视频。返回的 `apply_required` 为 `none`、`hotplug`、`reboot` 或
`power_cycle`，所需操作另行执行。

HDMI 方法需要支持受管 EDID 控制接口的 Core，分别使用 `video.edid.read` 和
`video.edid.write` 能力，并沿用 Web UI 的硬件校验。内置预设只读；自定义文件支持
128–512 字节，以 128 字节为一块。MCP 的 `data_hex` 使用不含空白的十六进制字符串。

本地检查：`python3 tests/cli.test.py -v`、`node tests/edid-format.test.cjs`。
CLI 检查编译本机测试程序并使用临时自定义文件目录，不写入 HDMI。
