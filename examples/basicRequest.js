'use strict'

const fetch = require('cross-fetch')
const axios = require('axios')
const http = require('http')

const { createSignRequest } = require('../src')

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

;(async () => {
  try {
    const signRequest = createSignRequest(options)

    // Example req 1 using fetch API
    const req1 = {
      url: 'http://localhost:3000/foo',
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
      headers: {
        'content-type': 'application/json'
      }
    }

    const signedReq1 = signRequest(req1)

    const res1 = await fetch(signedReq1.url, signedReq1)

    const message1 = await res1.json()

    console.log('\n\nResponse Message 1: ', message1)
    console.log('\n\n******************\n\n')

    // Example req 2 using fetch API
    const req2 = {
      url: 'http://localhost:3000/foo',
      method: 'GET',
      headers: {}
    }

    // Overriding Options
    const req2Options = {
      signedHeaders: ['(request-target)', '(created)', 'host'],
      keyId: 'test-key-a'
    }

    const signedReq2 = signRequest(req2, req2Options)

    const res2 = await fetch(signedReq2.url, signedReq2)

    const message2 = await res2.json()
    console.log('\n\nResponse Message 2: ', message2)
    console.log('\n\n******************\n\n')

    // Example req 3 using axios API
    const axiosReq = {
      url: 'http://localhost:3000/foo',
      method: 'POST',
      body: JSON.stringify({ hello: 'world' }),
      headers: {
        'content-type': 'application/json'
      }
    }

    const signedReq3 = signRequest(axiosReq)
    const { body: data, ...rest } = signedReq3

    // console.log(signedReq3)
    const axiosRes = await axios({ data, ...rest })

    console.log('\n\nAxios Response Message: ', axiosRes.data)
    console.log('\n\n******************\n\n')

    // Example req 4 using Node HTTP API
    const httpReq = {
      url: 'http://localhost:3000/foo',
      method: 'GET',
      headers: {}
    }

    // Overriding Options
    const signingOptions = {
      signedHeaders: ['(request-target)', '(created)', 'host'],
      keyId: 'test-key-a'
    }

    const signedReq4 = signRequest(httpReq, signingOptions)

    // console.log(signedReq4)

    const req = http.request(signedReq4.url, signedReq4, res => {
      console.log(`HTTP Request statusCode: ${res.statusCode}`)

      res.on('data', d => {
        console.log('HTTP Request data')
        process.stdout.write(d)
        console.log('\n\n******************\n\n')
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.end()
  } catch (error) {
    console.error(error)
  }
})()
