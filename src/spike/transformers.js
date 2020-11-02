const crypto = require('crypto')

module.exports = {
  'Content-Type': (key, value) => [key.toLowerCase(), value],
  Digest: (key, value) => [
    key.toLowerCase(),
    crypto.createHash('sha512').update(value).digest('base64').toString()
  ]
}
