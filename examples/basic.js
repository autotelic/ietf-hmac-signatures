'use strict'

const fetch = require('cross-fetch')

const { signRequest, getAlgorithm } = require('../src')

// const {
//   constructSignatureString,
//   extractSignature
// } = require('../src')
const DEFAULT_ENCODING = 'base64'

const options = {
  // constructSignatureString,
  // extractSignature,
  getAlgorithm,
  getSignatureEncoding: () => DEFAULT_ENCODING,
  sharedSecret: 'topSecret',
  algorithmMap: {
    hs2019: {
      'test-key-a': 'sha512',
      'test-key-b': 'sha256'
    }
  },
  digestAlgorithm: 'sha-512',
  digestEncoding: DEFAULT_ENCODING
}

// ;(async () => {
//   try {
//     const req = {}
//     req.method = 'POST'
//     req.body = JSON.stringify({ hello: 'world' })
//     req.headers = {}
//     req.headers['Content-Type'] = 'application/json'
//     req.headers.Digest = 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg=='

//     req.headers.Signature = 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="pQul5YFrqv76Zq2bE1kWjJfFGnTu0MwU7X7c8MWDswAI5V7dROqKbBWKUGcoysxujgTqkJo/Eg74x34o54hqRg==", created=1402170695, expires=1402170895'

//     console.log('\n\n ********* \n\n Request is:\n', req)

//     const res = await fetch('http://localhost:3000', req)

//     console.log('\n\n******************\n\nWorking Response:\n', res)
//     const message = await res.json()
//     console.log('\n\nResponse Message: ', message)
//     console.log('\n\n******************\n\n')
//   } catch (error) {
//     console.error(error)
//   }
// })()
;(async () => {
  try {
    const req = new fetch.Request('http://localhost:3000/?id=1', {
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    options.signatureMaterial = {
      headers: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type'],
      keyId: 'test-key-a',
      algorithmName: 'hs2019',
      expiryOffset: 300000 // Optional
    }

    const signedReq = signRequest(req, options)
    // console.log('\n\n ********* \n\n Request is:\n', signedReq)
    // console.log('\n\n ********* \n\n Request is:\n', signedReq.headers)

    const res = await fetch(signedReq)

    // console.log('\n\n******************\n\nWorking Response:\n', res)
    const message = await res.json()
    console.log('\n\nResponse Message: ', message)
    console.log('\n\n******************\n\n')
  } catch (error) {
    console.error(error)
  }
})()
