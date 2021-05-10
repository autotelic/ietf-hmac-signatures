const createSignRequest = require('./src/spike')
const got = require('got')
// const { fetch } = require('cross-fetch')
// const axios = require('axios')
// HTTP

const signatureFields = [
  '(request-target)',
  '(created)',
  '(expires)',
  'Host',
  'Digest',
  'Content-Type'
]

const opts = {
  secret: 'topSecret',
  keyId: 'riskEngineGithub',
  signatureFields
}

const body = {
  metadata: {
    project: 'risk-engine-db-facade',
    owner: 'telus',
    pullRequestNumber: '',
    branch: 'ci/add-config-file',
    gitCommitId: 'cc07221'
  },
  risk_inputs: [],
  outputs: []
}

const request = {
  url: 'http://localhost:3000/assessment',
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    Date: 1602872645,
    'Content-Type': 'application/json'
  }
}

const signRequest = createSignRequest(opts)

;(async function () {
  const signedReq = signRequest(request)

  console.log('\n Generated Signed Request:\n', signedReq)
  const res = await got.post(signedReq)
  console.log('\nResponse Status Code: ', res.statusCode)
})()
