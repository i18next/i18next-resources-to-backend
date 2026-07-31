### 1.2.3

- fix: allow empty `language`/`namespace` strings again (e.g. `defaultNS: ''`), rejected since 1.2.2 [#16](https://github.com/i18next/i18next-resources-to-backend/issues/16). An empty string cannot traverse the filesystem or reach `Object.prototype`, so it was never part of the attack surface.

### 1.2.2

- security: validate `language` and `namespace` in `read()` before they are passed to the loader. i18next resolves any string as a language unless `supportedLngs` is set, so these values can carry whatever a language detector picked up from the querystring, path or a cookie. The documented usage pattern is `import(`./locales/${language}/${namespace}.json`)`, and while a bundler compiles that template to a fixed context map, an unbundled ESM runtime (Node SSR) resolves the specifier against the filesystem, where a crafted value escapes the locales directory. Values containing `..`, `\`, control characters, `__proto__` / `constructor` / `prototype`, or longer than 128 characters are now rejected with an error and the loader is never called; `/` is rejected for `language` but allowed for `namespace`, where nested layouts such as `a/b` are legitimate. The same check keeps the static-resources lookup off `Object.prototype`.
