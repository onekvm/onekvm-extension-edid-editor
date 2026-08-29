# onekvm-extension-edid

OneKVM HDMI EDID file editor. Preset blobs live in the package
(`share/edid/*.edid.bin`). Custom blobs live in the extension data
directory (`ONEKVM_EXTENSION_DATA/edid/*.edid.bin`). Saving never
overwrites package presets.

This extension edits files. Core applies a chosen blob to the capture
chip through `PUT /api/video/edid`.
