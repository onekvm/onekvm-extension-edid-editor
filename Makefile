PREFIX ?= /usr/local
DESTDIR ?=
VERSION ?= 0.1.0
ARCH ?= unknown

.PHONY: install

install:
	install -Dm0755 bin/onekvm-extension-edid $(DESTDIR)$(PREFIX)/bin/onekvm-extension-edid
	install -Dm0644 web/page.js $(DESTDIR)$(PREFIX)/web/page.js
	install -d $(DESTDIR)$(PREFIX)/share/edid
	install -m0644 share/edid/*.bin $(DESTDIR)$(PREFIX)/share/edid/
	sed -e 's/@ARCH@/$(ARCH)/g' -e 's/@VERSION@/$(VERSION)/g' \
		manifest.json.in >$(DESTDIR)$(PREFIX)/manifest.json
	chmod 0644 $(DESTDIR)$(PREFIX)/manifest.json
