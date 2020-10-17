'use strict'

const calculateCrypto = require('./calculateCrypto')

const constructDigestString = (req, options) => {
  const { digestEncoding = 'base64', digestAlgorithm = 'sha-512' } = options
  const formattedAlgorithm = digestAlgorithm.toLowerCase().split('-').join('')
  const { body } = req

  return calculateCrypto({
    method: 'hash',
    algorithm: formattedAlgorithm,
    message: body,
    encoding: digestEncoding
  })
}

module.exports = constructDigestString
