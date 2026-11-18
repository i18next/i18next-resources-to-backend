import resourcesToBackend from '../index.js'
import should from 'should'

describe('a callback that throws', () => {
  it('is called once for a sync loader', () => {
    let calls = 0
    const backend = resourcesToBackend((language, namespace) => ({ hi: 'hello' }))
    should(() => backend.read('en', 'translation', () => {
      calls++
      throw new Error('callback failed')
    })).throw('callback failed')
    calls.should.equal(1)
  })

  it('is called once for a promise loader', async () => {
    const listeners = process.listeners('unhandledRejection')
    process.removeAllListeners('unhandledRejection')
    let calls = 0
    let unhandled
    try {
      const rejection = new Promise((resolve) => process.once('unhandledRejection', resolve))
      const backend = resourcesToBackend((language, namespace) => Promise.resolve({ hi: 'hello' }))
      backend.read('en', 'translation', () => {
        calls++
        throw new Error('callback failed')
      })
      unhandled = await rejection
    } finally {
      listeners.forEach((l) => process.on('unhandledRejection', l))
    }
    calls.should.equal(1)
    unhandled.message.should.equal('callback failed')
  })
})
