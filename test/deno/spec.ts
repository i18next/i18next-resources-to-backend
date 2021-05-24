import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import i18next from 'https://deno.land/x/i18next/index.js'
import ChainedBackend from 'https://deno.land/x/i18next_chained_backend/index.js'
import resourcesToBackend from '../../index.js'
const { test } = Deno

test('basic chained-backend', async () => {
  const resA = {
    en: {
      translation: {
        welcome: 'hello world'
      }
    },
    de: {
      translation: {
        welcome: 'hallo welt'
      }
    }
  }
  const resB = {
    en: {
      translationFlb: {
        welcome: 'hello world from local fallback'
      }
    },
    de: {
      translationFlb: {
        welcome: 'hallo welt vom lokalen fallback'
      }
    }
  }

  const i18n = i18next.createInstance()
  await i18n.use(ChainedBackend).init({
    // debug: true,
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'de'],
    ns: ['translation', 'translationFlb'],
    defaultNS: 'translation',
    backend: {
      backends: [
        resourcesToBackend(resA),
        resourcesToBackend((lng, ns, clb) => clb(null, resB && resB[lng] && resB[lng][ns]))
      ]
    }
  })
  assertEquals(i18n.t('welcome'), 'hello world')
  assertEquals(i18n.t('welcome', { lng: 'de' }), 'hallo welt')
  assertEquals(i18n.t('welcome', { ns: 'translationFlb' }), 'hello world from local fallback')
  assertEquals(i18n.t('welcome', { lng: 'de', ns: 'translationFlb' }), 'hallo welt vom lokalen fallback')
})
