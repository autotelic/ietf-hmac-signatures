const { createHash } = require('crypto')
const { BASE_64, SHA_512, SHA_512_PREFIX } = require('../../../constants')

module.exports = {
  Digest: (key, value) => [
    key.toLowerCase(),
    [
      SHA_512_PREFIX,
      createHash(SHA_512).update(value).digest(BASE_64).toString()
    ].join('=')
  ]
}
