'use strict'

const crypto = require('crypto')

const constructSignatureString = (req, options) => {
  const {
    getSignatureEncoding = () => 'base64',
    getAlgorithm = require('./getAlgorithm'),
    sharedSecret
  } = options

  if (!sharedSecret) {
    throw new Error('Missing shared secret in options')
  }

  return calculateSignature({
    algorithm: getAlgorithm(req, options),
    sharedSecret: sharedSecret,
    message: getMessage(req, options),
    encoding: getSignatureEncoding(req, options)
  })
}

const getMessage = (req, options) => {
  const { signedHeaders, created, expires } = options
  const { headers, method, url } = req
  const parsedUrl = new URL(url)

  return signedHeaders
    .map((signatureHeader) => {
      switch (signatureHeader) {
        case '(request-target)':
          return `(request-target): ${method.toLowerCase()} ${parsedUrl.pathname + parsedUrl.search}`
        case '(created)':
          return `(created): ${parseInt(created)}`
        case '(expires)':
          return `(expires): ${parseInt(expires)}`
        case 'host':
          return `host: ${parsedUrl.host}`
        default:
          if (!headers[signatureHeader]) {
            throw new Error(`Header ${signatureHeader} does not exist in the request`)
          }
          return `${signatureHeader}: ${headers[signatureHeader]}`
      }
    }).join('\n')
}

const calculateSignature = ({ algorithm, sharedSecret, message, encoding }) =>
  crypto
    .createHmac(algorithm, sharedSecret)
    .update(message)
    .digest(encoding)
    .toString()

module.exports = constructSignatureString
