# onekvm-extension-edid

OneKVM HDMI EDID 编辑器。它只是 `kind: edid` 内容库的一个提供者。Core
会列出所有声明了 EDID 目录的已安装插件；第三方插件可以取代或与本插件并存。

预设文件在软件包内的 `share/edid`，自定义文件在插件数据目录
`ONEKVM_EXTENSION_DATA/edid`。Core 通过 `/api/libraries/edid` 读取，
通过 `/api/video/edid` 写入采集芯片。
