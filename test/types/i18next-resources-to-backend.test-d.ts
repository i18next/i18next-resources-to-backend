import { BackendModule } from 'i18next'
import resourcesToBackend from '../../'
import { expectType } from 'tsd'

expectType<BackendModule>(resourcesToBackend({ en: { translations: { key: 'value' } } }))
expectType<BackendModule>(resourcesToBackend((lng: string, ns: string, clb) => ({ key: 'value' })))
expectType<BackendModule>(resourcesToBackend(async (lng: string, ns: string) => ({ key: 'value' })))
