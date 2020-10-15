'use strict'

const fetch = require('cross-fetch')

const { signRequest } = require('../src')

;(async () => {
  try {
    const req = new fetch.Request('http://localhost:3000/foo', {
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const options = {
      sharedSecret: 'topSecret',
      algorithmMap: {
        hs2019: {
          'test-key-a': 'sha512',
          'test-key-b': 'sha256'
        }
      },
      signedHeaders: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type'],
      keyId: 'test-key-b',
      algorithmName: 'hs2019'
      // expiryOffset: 300000, // Optional - Default is 300000 if unspecified
      // digestEncoding: 'base64', // Optional - Default is base64 if unspecified
      // digestAlgorithm: 'sha-512' // Optional - Default is sha-512 if unspecified
      // getAlgorithm: (req, options) => 'sha512', // Optional - Default getAlgorithm used if unspecified
      // constructSignatureString: (req, options) => {}, // Optional - Default constructSignatureString used if unspecified
      // constructDigestString: (req, options) => {}, // Optional - Default constructDigestString used if unspecified
    }

    const signedReq = signRequest(req, options)

    const res = await fetch(signedReq)

    const message = await res.json()
    console.log('\n\nResponse Message: ', message)
    console.log('\n\n******************\n\n')
  } catch (error) {
    console.error(error)
  }
})()
