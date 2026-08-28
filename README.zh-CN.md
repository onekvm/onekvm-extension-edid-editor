# onekvm-extension-edid

OneKVM HDMI EDID 文件编辑器。预设文件在软件包内的 `share/edid`，自定义文件在
插件数据目录 `ONEKVM_EXTENSION_DATA/edid`。

本插件只编辑文件。Core 用内部方法 `ListDirectories("edid")` 发现所有
`kind=edid` 目录，通过 `PUT /api/video/edid` 把选中的文件写到采集芯片。
