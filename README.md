# Introduction

[![Actions](https://github.com/i18next/i18next-resources-to-backend/workflows/node/badge.svg)](https://github.com/i18next/i18next-resources-to-backend/actions?query=workflow%3Anode)
[![Actions deno](https://github.com/i18next/i18next-resources-to-backend/workflows/deno/badge.svg)](https://github.com/i18next/i18next-resources-to-backend/actions?query=workflow%3Adeno)
[![npm version](https://img.shields.io/npm/v/i18next-resources-to-backend.svg?style=flat-square)](https://www.npmjs.com/package/i18next-resources-to-backend)

This package helps to transform resources to an i18next backend. To be used in Node.js, in the browser and for Deno.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-resources-to-backend).

```bash
# npm package
$ npm install i18next-resources-to-backend
```

## simple example - dynamic imports (lazy load in memory translations)

i18next-resources-to-backend helps to transform resources to an i18next backend. This means you can lazy load translations.

The dynamic import must be passed a string. Webpack will fail to load the resource if you pass a variable to `import()`.

For example, when using webpack:

```js
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .on('failedLoading', (lng, ns, msg) => console.error(msg);
  .init({ /* other options */ })
```

## used as fallback in combination with another i18next backend

i.e. [Browser fallback with local / bundled translations](https://www.i18next.com/how-to/backend-fallback#browser-fallback-with-local-bundled-translations)

Wiring up:

```js
import i18next from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import HttpBackend from 'i18next-http-backend'

i18next.use(ChainedBackend).init({
    backend: {
      backends: [
        HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
        resourcesToBackend({
            en: {
                translations: {
                    sayHi: 'hello world'
                }
            }
        })
      ],
      backendOptions: [{
        loadPath: 'http://localhost:8080/locales/{{lng}}/{{ns}}.json'
      }]
    }
})
```

for Deno:

```js
import i18next from 'https://deno.land/x/i18next/index.js'
import ChainedBackend from 'https://deno.land/x/i18next_chained_backend/index.js'
import resourcesToBackend from 'https://deno.land/x/i18next_resources_to_backend/index.js'
import HttpBackend from 'https://deno.land/x/i18next_http_backend/index.js'

i18next.use(ChainedBackend).init({
    backend: {
      backends: [
        HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
        resourcesToBackend({
            en: {
                translations: {
                    sayHi: 'hello world'
                }
            }
        })
      ],
      backendOptions: [{
        loadPath: 'http://localhost:8080/locales/{{lng}}/{{ns}}.json'
      }]
    }
})
```

## you can also lazy load the in memory translations, i.e. when using webpack:

```js
i18next.use(ChainedBackend).init({
    backend: {
      backends: [
        HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
        // with dynamic import, you have to use the "default" key of the module ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#importing_defaults )
        resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`))
        // resourcesToBackend((language, namespace, callback) => {
        //     import(`./locales/${language}/${namespace}.json`)
        //         .then(({ default: resources }) => {
        //             callback(null, resources)
        //         })
        //         .catch((error) => {
        //             callback(error, null)
        //         })
        // })
      ],
      backendOptions: [{
        loadPath: 'http://localhost:8080/locales/{{lng}}/{{ns}}.json'
      }]
    }
})
```

---

<h3 align="center">Gold Sponsors</h3>

<p align="center">
  <a href="https://locize.com/" target="_blank">
    <img src="https://raw.githubusercontent.com/i18next/i18next/master/assets/locize_sponsor_240.gif" width="240px">
  </a>
</p>

---

**From the creators of i18next: localization as a service - locize.com**

A translation management system built around the i18next ecosystem - [locize.com](https://locize.com).

![locize](https://locize.com/img/ads/github_locize.png)

With using [locize](http://locize.com/?utm_source=react_i18next_readme&utm_medium=github) you directly support the future of i18next.

---
