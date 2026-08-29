CC ?= cc
CFLAGS ?= -O2 -pipe
CFLAGS += -std=c17 -Wall -Wextra -Wpedantic -Werror -ffunction-sections -fdata-sections
LDFLAGS += -Wl,--gc-sections
PREFIX ?= /usr/local
DESTDIR ?=
VERSION ?= 0.1.10
ARCH ?= unknown

.PHONY: all clean install

all: bin/onekvm-extension-edid

bin/onekvm-extension-edid: src/controller.c
	mkdir -p bin
	$(CC) $(CPPFLAGS) $(CFLAGS) $(LDFLAGS) -o $@ $< $(LDLIBS)

clean:
	$(RM) bin/onekvm-extension-edid

install: all
	install -Dm0755 bin/onekvm-extension-edid $(DESTDIR)$(PREFIX)/bin/onekvm-extension-edid
	install -Dm0644 web/page.js $(DESTDIR)$(PREFIX)/web/page.js
	install -d $(DESTDIR)$(PREFIX)/share/edid
	install -m0644 share/edid/*.bin $(DESTDIR)$(PREFIX)/share/edid/
	sed -e 's/@ARCH@/$(ARCH)/g' -e 's/@VERSION@/$(VERSION)/g' \
		manifest.json.in >$(DESTDIR)$(PREFIX)/manifest.json
	chmod 0644 $(DESTDIR)$(PREFIX)/manifest.json
