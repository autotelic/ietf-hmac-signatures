'use strict'

const fetch = require('cross-fetch')
const axios = require('axios')

const { createSignRequest } = require('../src')

;(async () => {
  try {
    const options = {
      sharedSecret: 'topSecret',
      algorithmMap: {
        hs2019: {
          'test-key-a': 'sha512',
          'test-key-b': 'sha256'
        }
      },
      keyId: 'test-key-b',
      algorithmName: 'hs2019',
      signedHeaders: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type']
      // expiryOffset: 300, // Optional - Default is 300 seconds (5 min) if unspecified
      // digestEncoding: 'base64', // Optional - Default is base64 if unspecified
      // digestAlgorithm: 'sha-512' // Optional - Default is sha-512 if unspecified
      // getAlgorithm: (req, options) => 'sha512', // Optional - Default getAlgorithm used if unspecified
      // constructSignatureString: (req, options) => {}, // Optional - Default constructSignatureString used if unspecified
      // constructDigestString: (req, options) => {}, // Optional - Default constructDigestString used if unspecified
    }

    const signRequest = createSignRequest(options)

    const axiosReq = {
      url: 'http://localhost:3000/foo',
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
      headers: {
        'content-type': 'application/json'
      }
    }

    const signedReq = signRequest(axiosReq)
    const { body: data, ...rest } = signedReq

    console.log(signedReq)

    const axiosRes = await axios({ data, ...rest })

    console.log('\n\nAxios Response Message: ', axiosRes.data)
    console.log('\n\n******************\n\n')

    const fetchReq = {
      url: 'http://localhost:3000/foo',
      method: 'GET',
      headers: {}
    }

    const fetchSignedReq = signRequest(fetchReq, { signedHeaders: ['(request-target)', '(created)', 'host'] })

    console.log(fetchSignedReq)

    const res = await fetch(fetchSignedReq.url, fetchSignedReq)

    const message = await res.json()
    console.log('\n\nFetch Response Message: ', message)
    console.log('\n\n******************\n\n')
  } catch (error) {
    console.error(error)
  }
})()
