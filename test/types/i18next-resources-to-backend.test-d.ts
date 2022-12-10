import i18next, { BackendModule } from 'i18next'
import resourcesToBackend from '../../'
import { expectType } from 'tsd'

import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'

expectType<BackendModule>(resourcesToBackend({ en: { translations: { key: 'value' } } }))
expectType<BackendModule>(resourcesToBackend((lng: string, ns: string, clb) => ({ key: 'value' })))
expectType<BackendModule>(resourcesToBackend(async (lng: string, ns: string) => ({ key: 'value' })))

i18next.use(ChainedBackend).init<ChainedBackendOptions>({
  backend: {
    backends: [
      resourcesToBackend({ en: { translations: { key: 'value' } } }),
      resourcesToBackend((lng: string, ns: string, clb) => ({ key: 'value' })),
      resourcesToBackend(async (lng: string, ns: string) => ({ key: 'value' }))
    ]
  }
})