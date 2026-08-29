# onekvm-extension-edid

OneKVM HDMI EDID 文件编辑器。机型预设留在软件包里，供 Core 显示设置应用。
自定义文件在插件数据目录 `ONEKVM_EXTENSION_DATA/edid/*.edid.bin`。编辑器只
显示自定义文件名，不列出机型预设。

本插件只编辑文件。Core 通过 `PUT /api/video/edid` 把选中的文件写到采集芯片。

NanoKVM Cube / PCIe / Lite 的机型预设：

- `720p90.edid.bin` — 1280×720 @ 90 Hz
- `1080p60.edid.bin` — 1920×1080 @ 60 Hz
- `1440p30.edid.bin` — 2560×1440 @ 30 Hz（2K @ 30）
