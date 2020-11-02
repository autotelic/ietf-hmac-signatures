const { test } = require('tap')
const createSignedRequest = require('./index.js')
const extractors = require('./extractors')
const transformers = require('./transformers')
const constructSignatureString = require('./constructSignatureString')

test('the thing', ({ fail }) => {
  const signatureFields = [
    '(request-target)',
    'Content-Type',
    'Digest'
  ]
  const opts = {
    secret: 'topsecret',
    keyId: 'testkey',
    algorithm: 'sha512',
    signatureFields,
    extractors,
    transformers,
    constructSignatureString,
    constructSignature: (secret, input) => {
      console.log('INPUT', input)
      return 'askdjnasdijfnsdlijn++nsdkfnakl'
    }
  }

  const request = {
    url: 'https://google.com',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hello: 'world' })
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  console.log(actual)
  fail()
})
