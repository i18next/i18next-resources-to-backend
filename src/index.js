const UNSAFE_KEYS = ['__proto__', 'constructor', 'prototype']

// `language` and `namespace` reach here from i18next, which resolves any
// string unless `supportedLngs` is set, so they can carry whatever a language
// detector picked up from the querystring, path or a cookie. They are then
// handed straight to the caller's loader, and the documented pattern is
// `import(`./locales/${language}/${namespace}.json`)`. A bundler compiles that
// template to a fixed context map and resolves nothing outside it, but under
// an unbundled ESM runtime (Node SSR) the specifier hits the filesystem, so a
// crafted value would escape the locales directory. Checking here covers every
// loader at once, and also keeps the static-resources lookup below off
// `Object.prototype`. `/` is legitimate in a namespace (nested layouts such as
// `a/b`), never in a language code.
const isSafeIdentifier = (v, allowSlash) => {
  if (typeof v !== 'string') return false
  if (v.length > 128) return false // empty is fine: it cannot traverse or hit Object.prototype
  if (UNSAFE_KEYS.indexOf(v) > -1) return false
  if (v.indexOf('..') > -1) return false
  if (v.indexOf('\\') > -1) return false
  if (!allowSlash && v.indexOf('/') > -1) return false
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1F\x7F]/.test(v)) return false
  return true
}

const resourcesToBackend = (res) => ({
  type: 'backend',
  init (services, backendOptions, i18nextOptions) { /* use services and options */ },
  read (language, namespace, callback) {
    if (!isSafeIdentifier(language, false) || !isSafeIdentifier(namespace, true)) {
      return callback(new Error('i18next-resources-to-backend: unsafe language/namespace value'), false)
    }
    if (typeof res === 'function') { // in case someone wants to customize the loading...
      if (res.length < 3) {
        // no callback
        try {
          const r = res(language, namespace)
          if (r && typeof r.then === 'function') {
            // promise
            r.then((data) => callback(null, (data && data.default) || data)).catch(callback)
          } else {
            // sync
            callback(null, r)
          }
        } catch (err) {
          callback(err)
        }
        return
      }
      // normal with callback
      res(language, namespace, callback)
      return
    }
    callback(null, res && res[language] && res[language][namespace])
  }
})

export default resourcesToBackend
