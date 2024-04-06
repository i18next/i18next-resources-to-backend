import { BackendModule, Resource, ReadCallback, ResourceKey } from 'i18next'

type ImportFn<L, N> = ((language: L, namespace: N, callback: ReadCallback) => void) | ((language: L, namespace: N) => Promise<ResourceKey | boolean | null | undefined>)

declare function resourcesToBackend<L = string, N = string>(res: Resource | ImportFn<L, N>): BackendModule

export default resourcesToBackend
