# onekvm-extension-edid

OneKVM HDMI EDID file editor. Machine presets stay in the package for
Core Display settings. Custom blobs live in the extension data
directory (`ONEKVM_EXTENSION_DATA/edid/*.edid.bin`). The editor only
shows custom file names, not package presets.

This extension edits files. Core applies a chosen blob to the capture
chip through `PUT /api/video/edid`.

NanoKVM Cube / PCIe / Lite machine presets:

- `720p90.edid.bin` — 1280×720 @ 90 Hz
- `1080p60.edid.bin` — 1920×1080 @ 60 Hz
- `1440p30.edid.bin` — 2560×1440 @ 30 Hz (`2K @ 30`)
