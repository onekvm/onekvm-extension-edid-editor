# onekvm-extension-edid

OneKVM HDMI EDID file editor. Machine presets stay in the package for
Core Display settings. Custom blobs live in the extension data
directory (`ONEKVM_EXTENSION_DATA/edid/*.edid.bin`). The editor only
shows custom file names, not package presets.

This extension edits files. Core applies a chosen blob to the capture
chip through `PUT /api/video/edid`.
