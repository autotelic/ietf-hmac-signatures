const { test } = require('tap')

const createSignedRequest = require('./index.js')
const extractors = require('./extractors')
const transformers = require('./transformers')
const constructSignature = require('./constructSignature')
const constructSignatureString = require('./constructSignatureString')
const outputHandler = require('./outputHandler')

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
    constructSignature,
    outputHandler
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
