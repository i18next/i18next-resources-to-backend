const resourcesToBackend = (res) => ({
  type: 'backend',
  init (services, backendOptions, i18nextOptions) { /* use services and options */ },
  read (language, namespace, callback) {
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
