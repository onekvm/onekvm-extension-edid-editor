SUMMARY = "OneKVM HDMI EDID file editor extension"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=3c35942c830dfe74afdd64f3eb8c0bb5"
PR = "r1"

ONEKVM_COMPONENT_GIT_URI ??= "git://github.com/onekvm/onekvm-extension-edid-editor.git;protocol=https;branch=main"
ONEKVM_COMPONENT_SRCREV ??= ""
SRC_URI = "${ONEKVM_COMPONENT_GIT_URI}"
SRCREV = "${ONEKVM_COMPONENT_SRCREV}"

inherit onekvm-extension

ONEKVM_EXTENSION_ID = "edid"
ONEKVM_EXTENSION_API_VERSION = "2"

RPROVIDES:${PN} += "onekvm-extension-edid"
RREPLACES:${PN} += "onekvm-extension-edid"
RCONFLICTS:${PN} += "onekvm-extension-edid"

do_configure[noexec] = "1"

do_compile() {
    oe_runmake -C ${S} \
        CC="${CC}" \
        CFLAGS="${CFLAGS}" \
        LDFLAGS="${LDFLAGS}"
}

do_install() {
    oe_runmake -C ${S} \
        DESTDIR=${D} \
        PREFIX=${ONEKVM_EXTENSION_ROOT} \
        VERSION=${PV} \
        ARCH=${TARGET_ARCH} \
        install
}
