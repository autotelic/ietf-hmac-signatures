'use strict'

const calculateCrypto = require('./calculateCrypto')

const constructSignatureString = (req, options) => {
  const {
    getSignatureEncoding = () => 'base64',
    getAlgorithm = require('./getAlgorithm'),
    sharedSecret
  } = options

  if (!sharedSecret) {
    throw new Error('Missing shared secret in options')
  }

  return calculateCrypto({
    method: 'hmac',
    algorithm: getAlgorithm(req, options),
    sharedSecret: sharedSecret,
    message: getMessage(req, options),
    encoding: getSignatureEncoding(req, options)
  })
}

const getMessage = (req, options) => {
  const { signedHeaders, created, expires } = options
  const { headers = {}, method, url } = req
  const parsedUrl = new URL(url)

  // Format Header Object keys to be lower case for compatibility
  const formattedHeaders = Object.keys(headers).reduce((acc, header) => {
    acc[header.toLowerCase()] = headers[header]
    return acc
  }, {})

  return signedHeaders
    .map((signatureHeader) => {
      switch (signatureHeader.toLowerCase()) {
        case '(request-target)':
        case 'request-target':
          return `(request-target): ${method.toLowerCase()} ${parsedUrl.pathname + parsedUrl.search}`
        case '(created)':
        case 'created':
          return `(created): ${parseInt(created)}`
        case '(expires)':
        case 'expires':
          return `(expires): ${parseInt(expires)}`
        case 'host':
          return `host: ${parsedUrl.host}`
        default:
          if (!formattedHeaders[signatureHeader]) {
            throw new Error(`Header ${signatureHeader} does not exist in the request`)
          }
          return `${signatureHeader}: ${formattedHeaders[signatureHeader]}`
      }
    }).join('\n')
}

module.exports = constructSignatureString
