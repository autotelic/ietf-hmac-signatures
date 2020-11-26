// Change appropriate values below and send request by running `node sendRequest.js`

const { createSignRequest } = require('./src')
const got = require('got')

const signatureOptions = {
  sharedSecret: 'mock-secret',
  getAlgorithm: () => 'sha512',
  keyId: 'riskEngine',
  algorithmName: 'hs2019',
  signedHeaders: ['(request-target)', '(created)', 'host']
}

;(async function () {
  const req = {
    url: 'http://localhost:3030/migrate',
    method: 'POST',
    body: JSON.stringify({ migrate: 'up' }),
    headers: {
      'content-type': 'application/json'
    }
  }

  const signRequest = createSignRequest(signatureOptions)

  const signedReq = signRequest(req)

  console.log('\n Generated Signed Request: \n', signedReq)
  const res = await got(signedReq)
  console.log('\n Response Status Code: ', res.statusCode)
})()
