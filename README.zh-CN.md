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

插件没有常驻后端或健康检查。manifest 为 `list`、`read`、`save`、`delete`
分别声明插件自带的 CLI 命令及有类型的参数；Extension Host 只在收到方法调用
时启动命令，并返回命令输出的 JSON。

本插件只编辑文件。Core 通过 `PUT /api/video/edid` 把选中的文件写到采集芯片。

支持 NanoKVM Cube/PCIe/Lite 和 NanoKVM Pro。预装时默认启用，文件操作按需执行，
不运行常驻进程。

NanoKVM 预设源码和支持模式见
[onekvm-nanokvm-machine](https://github.com/onekvm/onekvm-nanokvm-machine)。
