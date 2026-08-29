# onekvm-extension-edid

OneKVM HDMI EDID 文件编辑器。预设在软件包 `share/edid/*.edid.bin`，自定义
文件在插件数据目录 `ONEKVM_EXTENSION_DATA/edid/*.edid.bin`。保存不会覆盖
软件包里的预设。

本插件只编辑文件。Core 通过 `PUT /api/video/edid` 把选中的文件写到采集芯片。
