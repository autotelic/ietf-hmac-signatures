'use strict'

const constructSignatureString = require('./constructSignatureString')
const constructDigestString = require('./constructDigestString')

const signRequest = (req, options) => {
  const {
    signatureMaterial

  } = options

  if (signatureMaterial.headers.includes('digest')) {
    req.headers.set('digest', constructDigestString(req, options))
  }

  signatureMaterial.created = Date.now()
  signatureMaterial.expires = signatureMaterial.created + 300000

  const signatureHeadersString = signatureMaterial.headers.join(' ')

  //   req.headers.set('Signature', 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="pQul5YFrqv76Zq2bE1kWjJfFGnTu0MwU7X7c8MWDswAI5V7dROqKbBWKUGcoysxujgTqkJo/Eg74x34o54hqRg==", created=1402170695, expires=1402170895')
  req.headers.set('Signature', `keyId="test-key-a", algorithm="hs2019", headers="${signatureHeadersString}", signature="${constructSignatureString(req, options)}", created=${signatureMaterial.created}, expires=${signatureMaterial.expires}`)
  console.log(req.headers)

  return req
}

module.exports = signRequest
