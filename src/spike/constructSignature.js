const { createHmac } = require('crypto')
const { BASE_64 } = require('./constants')

module.exports = function constructSignature (secret, algorithm, input) {
  return createHmac(algorithm, secret).update(input).digest(BASE_64).toString()
}
