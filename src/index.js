const resourcesToBackend = (res) => ({
  type: 'backend',
  init (services, backendOptions, i18nextOptions) { /* use services and options */ },
  read (language, namespace, callback) {
    if (typeof res === 'function') { // in case someone wants to customize the loading...
      res(language, namespace, callback)
      return
    }
    callback(null, res && res[language] && res[language][namespace])
  }
})

export default resourcesToBackend
