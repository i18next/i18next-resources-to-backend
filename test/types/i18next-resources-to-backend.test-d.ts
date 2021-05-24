import { BackendModule } from 'i18next'
import resourcesToBackend from '../../'
import { expectType } from 'tsd'

expectType<BackendModule>(resourcesToBackend({ en: { translations: { key: 'value' } } }))
expectType<BackendModule>(resourcesToBackend((lng, ns, clb) => ({ key: 'value' })))
