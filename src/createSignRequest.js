'use strict'
const createSignRequest = (defaultSignatureOptions) => (req, options) => {
  const combinedOptions = {
    ...defaultSignatureOptions,
    ...options
  }

  const {
    keyId,
    algorithmName,
    expiryOffset = 300,
    constructSignatureString = require('./constructSignatureString'),
    constructDigestString = require('./constructDigestString'),
    signedHeaders
  } = combinedOptions

  if (!keyId || typeof keyId !== 'string') {
    throw new Error('keyId in options object is missing or not a string')
  }
  if (!algorithmName || typeof algorithmName !== 'string') {
    throw new Error('algorithmName in options object is missing or not a string')
  }
  if (!signedHeaders || !Array.isArray(signedHeaders) || signedHeaders.length < 1) {
    throw new Error('signedHeaders must be an array with at least one value')
  }

  combinedOptions.created = Math.floor(Date.now() / 1000)

  if (signedHeaders.includes('(expires)')) {
    combinedOptions.expires = combinedOptions.created + expiryOffset
  }

  if (signedHeaders.includes('digest')) {
    req.headers.digest = constructDigestString(req, combinedOptions)
  }

  req.headers.Signature = `keyId="${keyId}", algorithm="${algorithmName}", headers="${signedHeaders.join(' ')}", signature="${constructSignatureString(req, combinedOptions)}", created=${combinedOptions.created}${combinedOptions.expires ? `, expires=${combinedOptions.expires}` : ''}`
  // req.headers.Signature = 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="pQul5YFrqv76Zq2bE1kWjJfFGnTu0MwU7X7c8MWDswAI5V7dROqKbBWKUGcoysxujgTqkJo/Eg74x34o54hqRg==", created=1402170695, expires=1402170895'

  return req
}

module.exports = createSignRequest
