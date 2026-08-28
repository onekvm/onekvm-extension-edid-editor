# onekvm-extension-edid

OneKVM HDMI EDID file editor. It stores preset blobs in the package
(`share/edid`) and custom blobs in the extension data directory
(`ONEKVM_EXTENSION_DATA/edid`).

This extension edits files. Core discovers every installed `kind=edid`
directory with the internal `ListDirectories("edid")` method and applies a
chosen blob to the capture chip through `PUT /api/video/edid`.
