'use strict'

const crypto = require('crypto')

const constructDigestString = (req, options) => {
  const { digestEncoding = 'base64', digestAlgorithm = 'sha-512' } = options
  const formattedAlgorithm = digestAlgorithm.toLowerCase().split('-').join('')
  const { body } = req

  const calculatedDigest = calculateDigest({
    algorithm: formattedAlgorithm,
    message: body,
    encoding: digestEncoding
  })

  return `${digestAlgorithm}=${calculatedDigest}`
}

const calculateDigest = ({ algorithm, message, encoding }) =>
  crypto.createHash(algorithm)
    .update(message)
    .digest(encoding)
    .toString()

module.exports = constructDigestString
