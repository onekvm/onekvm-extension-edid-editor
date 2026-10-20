#define _GNU_SOURCE
#include <ctype.h>
#include <dirent.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

#define MAX_EDID 512
#define MAX_REQUEST (MAX_EDID * 2 + 256)
#define BLOCK 128
#define EDID_SUFFIX ".edid.bin"
#define LEGACY_SUFFIX ".bin"
#define PRESET_DIR "/usr/share/onekvm/edid/presets"

static int valid_id(const char *id)
{
    size_t n;
    if (id == NULL || id[0] == '\0')
        return 0;
    if (!(islower((unsigned char)id[0]) || isdigit((unsigned char)id[0])))
        return 0;
    n = strlen(id);
    if (n > 63)
        return 0;
    for (size_t i = 1; i < n; i++) {
        char c = id[i];
        if (!(islower((unsigned char)c) || isdigit((unsigned char)c) || c == '.' || c == '_' || c == '-'))
            return 0;
    }
    return 1;
}

static int json_unescape_copy(const char *src, size_t n, char *out, size_t out_size)
{
    size_t o = 0;
    for (size_t i = 0; i < n; i++) {
        if (o + 1 >= out_size)
            return -1;
        if (src[i] == '\\' && i + 1 < n) {
            i++;
            out[o++] = src[i];
            continue;
        }
        out[o++] = src[i];
    }
    out[o] = '\0';
    return 0;
}

static int json_string(const char *json, const char *key, char *out, size_t out_size)
{
    char needle[80];
    const char *p;
    const char *end;

    if (snprintf(needle, sizeof(needle), "\"%s\"", key) >= (int)sizeof(needle))
        return -1;
    p = strstr(json, needle);
    if (p == NULL)
        return -1;
    p = strchr(p + strlen(needle), ':');
    if (p == NULL)
        return -1;
    p++;
    while (*p == ' ' || *p == '\t' || *p == '\n' || *p == '\r')
        p++;
    if (*p != '"')
        return -1;
    p++;
    end = p;
    while (*end && *end != '"') {
        if (*end == '\\' && end[1])
            end += 2;
        else
            end++;
    }
    if (*end != '"')
        return -1;
    return json_unescape_copy(p, (size_t)(end - p), out, out_size);
}

static int hex_value(int c)
{
    if (c >= '0' && c <= '9')
        return c - '0';
    if (c >= 'a' && c <= 'f')
        return c - 'a' + 10;
    if (c >= 'A' && c <= 'F')
        return c - 'A' + 10;
    return -1;
}

static int decode_hex(const char *hex, unsigned char *out, size_t *out_len)
{
    unsigned char buf[MAX_EDID];
    size_t n = 0;
    int hi = -1;

    for (const char *p = hex; *p; p++) {
        if (isspace((unsigned char)*p))
            continue;
        int v = hex_value((unsigned char)*p);
        if (v < 0)
            return -1;
        if (hi < 0) {
            hi = v;
            continue;
        }
        if (n >= MAX_EDID)
            return -1;
        buf[n++] = (unsigned char)((hi << 4) | v);
        hi = -1;
    }
    if (hi >= 0)
        return -1;
    if (n < BLOCK || n % BLOCK != 0)
        return -1;
    memcpy(out, buf, n);
    *out_len = n;
    return 0;
}

static int valid_edid(const unsigned char *data, size_t n)
{
    static const unsigned char header[] = {0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00};
    if (n < BLOCK || n % BLOCK != 0 || n > MAX_EDID)
        return 0;
    if (memcmp(data, header, sizeof(header)) != 0)
        return 0;
    for (size_t block = 0; block < n / BLOCK; block++) {
        unsigned sum = 0;
        for (size_t i = 0; i < BLOCK; i++)
            sum += data[block * BLOCK + i];
        if ((sum & 0xff) != 0)
            return 0;
    }
    return 1;
}

static void encode_hex(const unsigned char *data, size_t n, char *out, size_t out_size)
{
    static const char *digits = "0123456789abcdef";
    size_t o = 0;
    for (size_t i = 0; i < n && o + 2 < out_size; i++) {
        out[o++] = digits[data[i] >> 4];
        out[o++] = digits[data[i] & 0x0f];
    }
    out[o] = '\0';
}

static int mkdir_p(const char *path)
{
    char tmp[512];
    size_t len = strlen(path);
    if (len == 0 || len >= sizeof(tmp))
        return -1;
    memcpy(tmp, path, len + 1);
    for (char *p = tmp + 1; *p; p++) {
        if (*p != '/')
            continue;
        *p = '\0';
        if (mkdir(tmp, 0755) != 0 && errno != EEXIST)
            return -1;
        *p = '/';
    }
    if (mkdir(tmp, 0755) != 0 && errno != EEXIST)
        return -1;
    return 0;
}

static int read_file(const char *path, unsigned char *out, size_t *out_len)
{
    FILE *fp = fopen(path, "rb");
    size_t n;
    if (fp == NULL)
        return -1;
    n = fread(out, 1, MAX_EDID, fp);
    fclose(fp);
    if (n < BLOCK || !valid_edid(out, n))
        return -1;
    *out_len = n;
    return 0;
}

static int write_file_atomic(const char *dir, const char *id, const unsigned char *data, size_t n)
{
    char path[512];
    char tmp[512];
    char legacy[512];
    FILE *fp;
    if (mkdir_p(dir) != 0)
        return -1;
    if (snprintf(tmp, sizeof(tmp), "%s/.%s.edid.bin.tmp", dir, id) >= (int)sizeof(tmp))
        return -1;
    if (snprintf(path, sizeof(path), "%s/%s%s", dir, id, EDID_SUFFIX) >= (int)sizeof(path))
        return -1;
    fp = fopen(tmp, "wb");
    if (fp == NULL)
        return -1;
    if (fwrite(data, 1, n, fp) != n) {
        fclose(fp);
        unlink(tmp);
        return -1;
    }
    if (fclose(fp) != 0) {
        unlink(tmp);
        return -1;
    }
    if (chmod(tmp, 0644) != 0) {
        unlink(tmp);
        return -1;
    }
    if (rename(tmp, path) != 0) {
        unlink(tmp);
        return -1;
    }
    if (snprintf(legacy, sizeof(legacy), "%s/%s%s", dir, id, LEGACY_SUFFIX) < (int)sizeof(legacy))
        unlink(legacy);
    return 0;
}

static int id_from_filename(const char *name, char *id, size_t id_size)
{
    size_t n = strlen(name);
    size_t cut;

    if (n > 9 && strcmp(name + n - 9, EDID_SUFFIX) == 0)
        cut = n - 9;
    else if (n > 4 && strcmp(name + n - 4, LEGACY_SUFFIX) == 0)
        cut = n - 4;
    else
        return -1;
    if (cut == 0 || cut >= id_size)
        return -1;
    memcpy(id, name, cut);
    id[cut] = '\0';
    return valid_id(id) ? 0 : -1;
}

static int resolve_existing(const char *dir, const char *id, char *out, size_t out_size)
{
    if (snprintf(out, out_size, "%s/%s%s", dir, id, EDID_SUFFIX) >= (int)out_size)
        return -1;
    if (access(out, R_OK) == 0)
        return 0;
    if (snprintf(out, out_size, "%s/%s%s", dir, id, LEGACY_SUFFIX) >= (int)out_size)
        return -1;
    if (access(out, R_OK) == 0)
        return 0;
    return -1;
}

static void plan_ok(const char *response_json)
{
    puts(response_json == NULL || response_json[0] == '\0' ? "{\"ok\":true}" : response_json);
}

static void fail(const char *message)
{
    fprintf(stderr, "onekvm-extension-edid-editor: %s\n", message);
    exit(1);
}

static void custom_dir(char *out, size_t out_size)
{
    const char *data = getenv("ONEKVM_EXTENSION_DATA");
    if (data == NULL || data[0] == '\0')
        fail("ONEKVM_EXTENSION_DATA is missing");
    if (snprintf(out, out_size, "%s/edid", data) >= (int)out_size)
        fail("custom directory path is too long");
}

static const char *basename_of(const char *path)
{
    const char *slash = strrchr(path, '/');
    return slash ? slash + 1 : path;
}

static int append_json(char *out, size_t out_size, size_t *len, const char *chunk)
{
    size_t n = strlen(chunk);
    if (*len + n + 1 >= out_size)
        return -1;
    memcpy(out + *len, chunk, n + 1);
    *len += n;
    return 0;
}

static int list_dir_files(const char *dir, const char *rel_prefix, char *out, size_t out_size, size_t *len, int *first)
{
    DIR *d = opendir(dir);
    struct dirent *ent;
    if (d == NULL)
        return errno == ENOENT ? 0 : -1;
    while ((ent = readdir(d)) != NULL) {
        char path[512];
        char newer[512];
        char item[256];
        char id[64];
        unsigned char data[MAX_EDID];
        size_t n = 0;
        size_t name_len;
        int legacy;

        if (ent->d_name[0] == '.')
            continue;
        if (id_from_filename(ent->d_name, id, sizeof(id)) != 0)
            continue;
        name_len = strlen(ent->d_name);
        legacy = name_len > 4 && strcmp(ent->d_name + name_len - 4, LEGACY_SUFFIX) == 0
            && (name_len < 9 || strcmp(ent->d_name + name_len - 9, EDID_SUFFIX) != 0);
        if (legacy && snprintf(newer, sizeof(newer), "%s/%s%s", dir, id, EDID_SUFFIX) < (int)sizeof(newer)
            && access(newer, R_OK) == 0)
            continue;
        if (snprintf(path, sizeof(path), "%s/%s", dir, ent->d_name) >= (int)sizeof(path))
            continue;
        if (read_file(path, data, &n) != 0)
            continue;
        if (snprintf(item, sizeof(item), "%s{\"id\":\"%s\",\"size\":%zu,\"path\":\"%s/%s\"}",
                     *first ? "" : ",", id, n, rel_prefix, ent->d_name) >= (int)sizeof(item))
            continue;
        if (append_json(out, out_size, len, item) != 0) {
            closedir(d);
            return -1;
        }
        *first = 0;
    }
    closedir(d);
    return 0;
}

static void handle_list(void)
{
    char dir[512];
    char json[8192];
    size_t len = 0;
    int first;

    if (append_json(json, sizeof(json), &len, "{\"ok\":true,\"presets\":[") != 0)
        fail("list response is too large");
    first = 1;
    if (list_dir_files(PRESET_DIR, PRESET_DIR, json, sizeof(json), &len, &first) != 0)
        fail("read preset EDID directory failed");
    if (append_json(json, sizeof(json), &len, "],\"custom\":[") != 0)
        fail("list response is too large");
    first = 1;
    custom_dir(dir, sizeof(dir));
    if (list_dir_files(dir, "edid", json, sizeof(json), &len, &first) != 0)
        fail("read custom EDID directory failed");
    if (append_json(json, sizeof(json), &len, "]}") != 0)
        fail("list response is too large");
    plan_ok(json);
}

static void handle_read(const char *request)
{
    char source[16] = {0};
    char id[64] = {0};
    char path[512];
    unsigned char data[MAX_EDID];
    char hex[MAX_EDID * 2 + 1];
    size_t n = 0;

    if (json_string(request, "source", source, sizeof(source)) != 0 ||
        json_string(request, "id", id, sizeof(id)) != 0)
        fail("read requires source and id");
    if (!valid_id(id))
        fail("invalid EDID id");
    if (strcmp(source, "preset") == 0) {
        if (resolve_existing(PRESET_DIR, id, path, sizeof(path)) != 0)
            fail("EDID file not found or invalid");
    } else if (strcmp(source, "custom") == 0) {
        char dir[512];
        custom_dir(dir, sizeof(dir));
        if (resolve_existing(dir, id, path, sizeof(path)) != 0)
            fail("EDID file not found or invalid");
    } else
        fail("source must be preset or custom");
    if (read_file(path, data, &n) != 0)
        fail("EDID file not found or invalid");
    encode_hex(data, n, hex, sizeof(hex));
    printf("{\"ok\":true,\"id\":\"%s\",\"source\":\"%s\",\"path\":\"%s/%s\",\"data_hex\":\"%s\"}\n",
           id, source, strcmp(source, "preset") == 0 ? PRESET_DIR : "edid", basename_of(path), hex);
}

static void handle_save(const char *request)
{
    char id[64] = {0};
    char hex[MAX_EDID * 2 + 64];
    unsigned char data[MAX_EDID];
    char dir[512];
    size_t n = 0;

    if (json_string(request, "id", id, sizeof(id)) != 0 ||
        json_string(request, "data_hex", hex, sizeof(hex)) != 0)
        fail("save requires id and data_hex");
    if (!valid_id(id))
        fail("invalid EDID id");
    if (decode_hex(hex, data, &n) != 0 || !valid_edid(data, n))
        fail("EDID blob is invalid");
    custom_dir(dir, sizeof(dir));
    if (write_file_atomic(dir, id, data, n) != 0)
        fail("write custom EDID failed");
    printf("{\"ok\":true,\"id\":\"%s\",\"path\":\"edid/%s%s\"}\n",
           id, id, EDID_SUFFIX);
}

static void handle_delete(const char *request)
{
    char id[64] = {0};
    char dir[512];
    char path[512];

    if (json_string(request, "id", id, sizeof(id)) != 0)
        fail("delete requires id");
    if (!valid_id(id))
        fail("invalid EDID id");
    custom_dir(dir, sizeof(dir));
    if (resolve_existing(dir, id, path, sizeof(path)) != 0)
        fail("EDID file not found");
    if (unlink(path) != 0)
        fail("delete custom EDID failed");
    {
        char other[512];
        if (resolve_existing(dir, id, other, sizeof(other)) == 0)
            unlink(other);
    }
    plan_ok("{\"ok\":true}");
}

static int run_cli(int argc, char **argv)
{
    char request[MAX_REQUEST];

    if (strcmp(argv[1], "list") == 0 && argc == 2) {
        handle_list();
        return 0;
    }
    if (strcmp(argv[1], "read") == 0 && argc == 4) {
        if (snprintf(request, sizeof(request), "{\"source\":\"%s\",\"id\":\"%s\"}",
                     argv[2], argv[3]) >= (int)sizeof(request))
            fail("read arguments are too long");
        handle_read(request);
        return 0;
    }
    if (strcmp(argv[1], "save") == 0 && argc == 4) {
        if (snprintf(request, sizeof(request), "{\"id\":\"%s\",\"data_hex\":\"%s\"}",
                     argv[2], argv[3]) >= (int)sizeof(request))
            fail("save arguments are too long");
        handle_save(request);
        return 0;
    }
    if (strcmp(argv[1], "delete") == 0 && argc == 3) {
        if (snprintf(request, sizeof(request), "{\"id\":\"%s\"}", argv[2]) >= (int)sizeof(request))
            fail("delete arguments are too long");
        handle_delete(request);
        return 0;
    }
    return -1;
}

int main(int argc, char **argv)
{
    if (argc > 1 && run_cli(argc, argv) == 0)
        return 0;
    fprintf(stderr,
            "usage: onekvm-extension-edid-editor [list|read SOURCE ID|save ID DATA_HEX|delete ID]\n");
    return 2;
}
