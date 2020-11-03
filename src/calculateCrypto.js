'use strict'

const crypto = require('crypto')

const calculateCrypto = ({ method, algorithm, sharedSecret, message, encoding }) => {
  const methodMap = {
    hmac: 'createHmac',
    hash: 'createHash'
  }
  return crypto[methodMap[method]](algorithm, sharedSecret)
    .update(message)
    .digest(encoding)
    .toString()
}

module.exports = calculateCrypto
