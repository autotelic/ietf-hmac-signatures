'use strict'

const crypto = require('crypto')
// const parseSignatureHeader = require('./parseSignatureHeader')

const constructSignatureString = (req, options) =>
  calculateSignature({
    algorithm: options.getAlgorithm(req, options),
    sharedSecret: options.sharedSecret,
    message: getMessage(req, options),
    encoding: options.getSignatureEncoding(req, options)
  })

const getMessage = (req, options) => {
  // const signature = options.signatureMaterial ? options.signatureMaterial : parseSignatureHeader(req)
  const { signatureMaterial } = options
  const { headers, method, url } = req
  const parsedUrl = new URL(url)

  const msg = signatureMaterial.headers
    .map((signatureHeader) => {
      switch (signatureHeader) {
        case '(request-target)':
          return `(request-target): ${method.toLowerCase()} ${parsedUrl.pathname + parsedUrl.search}`
        case '(created)':
          return `(created): ${parseInt(signatureMaterial.created)}`
        case '(expires)':
          return `(expires): ${parseInt(signatureMaterial.expires)}`
        case 'host':
          return `host: ${parsedUrl.host}`
        case 'digest':
          return `${signatureHeader}: ${headers.get(signatureHeader)}`
        default:
          return `${signatureHeader}: ${headers.get(signatureHeader)}`
      }
    }).join('\n')

  console.log(msg)

  return msg
}

const calculateSignature = ({ algorithm, sharedSecret, message, encoding }) =>
  crypto
    .createHmac(algorithm, sharedSecret)
    .update(message)
    .digest(encoding)
    .toString()

module.exports = constructSignatureString
