'use strict'

const fetch = require('cross-fetch')

// const {
//   constructSignatureString,
//   extractSignature
// } = require('../src')

// const pluginOptions = {
//   constructSignatureString,
//   extractSignature,
//   getAlgorithm: () => 'sha512',
//   getSignatureEncoding: () => 'base64',
//   sharedSecret: 'topSecret',
//   algorithmMap: {
//     hs2019: {
//       'test-key-a': 'sha512',
//       'test-key-b': 'sha256'
//     }
//   }
// }

;(async () => {
  try {
    const req = {}
    req.method = 'POST'
    req.body = JSON.stringify({ hello: 'world' })
    req.headers = {}
    req.headers['Content-Type'] = 'application/json'
    req.headers.Digest = 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg=='

    req.headers.Signature = 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="pQul5YFrqv76Zq2bE1kWjJfFGnTu0MwU7X7c8MWDswAI5V7dROqKbBWKUGcoysxujgTqkJo/Eg74x34o54hqRg==", created=1402170695, expires=1402170895'

    console.log('\n\n ********* \n\n Request is:\n', req)

    const res = await fetch('http://localhost:3000', req)

    console.log('\n\n******************\n\nWorking Response:\n', res)
    const message = await res.json()
    console.log('\n\nResponse Message: ', message)
    console.log('\n\n******************\n\n')
  } catch (error) {
    console.error(error)
  }
})()
