import { BackendModule, Resource, ReadCallback } from 'i18next'

type ImportFn = (language: string, namespace: string, callback: ReadCallback) => void

declare function resourcesToBackend(res: Resource | ImportFn): BackendModule

export default resourcesToBackend
