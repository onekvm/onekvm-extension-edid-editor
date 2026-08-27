# onekvm-extension-edid

OneKVM HDMI EDID editor. It is one possible provider of `kind: edid`
libraries. Core lists every installed extension that declares EDID
directories; a third-party package can replace or coexist with this one.

Preset blobs live in the package (`share/edid`). Custom blobs live in the
extension data directory (`ONEKVM_EXTENSION_DATA/edid`). Core reads and
applies them through `/api/libraries/edid` and `/api/video/edid`.
