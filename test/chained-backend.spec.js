import i18next from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import resourcesToBackend from '../index.js'
import should from 'should'

describe('basic chained-backend', () => {
  it('should transform normal resources to a backend', async () => {
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
    should(i18n.t('welcome')).eql('hello world')
    should(i18n.t('welcome', { lng: 'de' })).eql('hallo welt')
    should(i18n.t('welcome', { ns: 'translationFlb' })).eql('hello world from local fallback')
    should(i18n.t('welcome', { lng: 'de', ns: 'translationFlb' })).eql('hallo welt vom lokalen fallback')
  })
})
