import { BackendModule, Resource, ReadCallback, ResourceKey } from 'i18next'

type ImportFn = ((language: string, namespace: string, callback: ReadCallback) => void) | ((language: string, namespace: string) => Promise<ResourceKey | boolean | null | undefined>)

declare function resourcesToBackend(res: Resource | ImportFn): BackendModule

export default resourcesToBackend
