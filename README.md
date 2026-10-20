# onekvm-extension-edid-editor

OneKVM HDMI EDID file editor. The editor lists built-in machine presets and
custom files separately. Presets can be viewed and used as a starting point
for editing; saving creates a custom file and keeps the machine preset intact.
The current machine package supplies read-only presets in
`/usr/share/onekvm/edid/presets/*.edid.bin`; this extension bundles no presets.
Custom blobs live in the extension data directory
(`ONEKVM_EXTENSION_DATA/edid/*.edid.bin`). Core Display settings can also apply
the machine presets, even when this extension is not installed.

The overview separates the manufacturer name and PNP ID, shows the source and
EDID version, and marks the preferred display mode. Unknown manufacturer IDs
remain visible without guessing a brand. HEX is collapsed by default and read-only
in View; switch to Edit to change bytes. An incomplete custom PNP ID cannot be
saved. Failed file loads clear the previous identity and disable Apply.
Opening the page or switching back to Current HDMI reads the EDID again, with a
loading indicator until the display information or error is available.

The extension has no resident backend or health check. Its manifest declares
the bundled CLI command and typed arguments for each `list`, `read`, `save`,
and `delete` method. The Extension Host starts that command only for a method
request and returns its JSON output.

This extension edits files. Core applies a chosen blob to the capture
chip through `PUT /api/video/edid`.

The editor supports NanoKVM Cube/PCIe/Lite and NanoKVM Pro. Preinstalled copies
are enabled by default; file operations run on demand without a resident process.

For NanoKVM preset sources and supported modes, see
[onekvm-nanokvm-machine](https://github.com/onekvm/onekvm-nanokvm-machine).
