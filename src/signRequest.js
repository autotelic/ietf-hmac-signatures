'use strict'

const signRequest = (req, options) => {
  const {
    signatureMaterial,
    expiryOffset = 300000,
    constructSignatureString = require('./constructSignatureString'),
    constructDigestString = require('./constructDigestString')
  } = options

  const { keyId, algorithmName } = signatureMaterial

  signatureMaterial.created = Date.now()

  if (signatureMaterial.headers.includes('(expires)')) {
    signatureMaterial.expires = signatureMaterial.created + expiryOffset
  }

  if (signatureMaterial.headers.includes('digest')) {
    req.headers.set('digest', constructDigestString(req, options))
  }

  req.headers.set('Signature', `keyId="${keyId}", algorithm="${algorithmName}", headers="${signatureMaterial.headers.join(' ')}", signature="${constructSignatureString(req, options)}", created=${signatureMaterial.created}${signatureMaterial.expires ? `, expires=${signatureMaterial.expires}` : ''}`)

  return req
}

module.exports = signRequest
