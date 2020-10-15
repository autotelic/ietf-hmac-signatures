'use strict'

const signRequest = (req, options) => {
  const {
    keyId,
    algorithmName,
    expiryOffset = 300,
    constructSignatureString = require('./constructSignatureString'),
    constructDigestString = require('./constructDigestString'),
    signedHeaders
  } = options

  if (!keyId || typeof keyId !== 'string') {
    throw new Error('keyId in options object is missing or not a string')
  }
  if (!algorithmName || typeof algorithmName !== 'string') {
    throw new Error('algorithmName in options object is missing or not a string')
  }
  if (!signedHeaders || !Array.isArray(signedHeaders) || signedHeaders.length < 1) {
    throw new Error('signedHeaders must be an array with at least one value')
  }

  options.created = Math.floor(Date.now() / 1000)

  if (signedHeaders.includes('(expires)')) {
    options.expires = options.created + expiryOffset
  }

  if (signedHeaders.includes('digest')) {
    req.headers.set('digest', constructDigestString(req, options))
  }

  req.headers.set('Signature', `keyId="${keyId}", algorithm="${algorithmName}", headers="${signedHeaders.join(' ')}", signature="${constructSignatureString(req, options)}", created=${options.created}${options.expires ? `, expires=${options.expires}` : ''}`)

  return req
}

module.exports = signRequest
