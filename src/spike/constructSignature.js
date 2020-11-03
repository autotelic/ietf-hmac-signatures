const { createHmac } = require('crypto')

module.exports = function constructSignature (secret, algorithm, input) {
  return createHmac(algorithm, secret).update(input).digest('base64').toString()
}
