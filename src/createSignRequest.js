'use strict'
const constructSignatureString = require('./constructSignatureString')
const constructDigestString = require('./constructDigestString')

const createSignRequest = (creationOptions) => (req, options) => {
  const combinedOptions = {
    constructSignatureString,
    constructDigestString,
    signedHeaders: ['(request-target)', '(created)'],
    expiryOffset: 300,
    digestEncoding: 'base64',
    digestAlgorithm: 'sha-512',
    ...creationOptions,
    ...options
  }

  const workingReq = {
    headers: {},
    ...req
  }

  const {
    keyId,
    algorithmName,
    signedHeaders,
    expiryOffset,
    digestAlgorithm
  } = combinedOptions

  if (!keyId || typeof keyId !== 'string') {
    throw new Error('keyId in options object is missing or not a string')
  }
  if (!algorithmName || typeof algorithmName !== 'string') {
    throw new Error('algorithmName in options object is missing or not a string')
  }
  if (!signedHeaders || !Array.isArray(signedHeaders) || signedHeaders.length < 1) {
    throw new Error('signedHeaders must be an array with at least one value')
  }

  combinedOptions.created = Math.floor(Date.now() / 1000)

  if (signedHeaders.includes('(expires)')) {
    combinedOptions.expires = combinedOptions.created + expiryOffset
  }

  if (signedHeaders.includes('digest')) {
    workingReq.headers.digest = `${digestAlgorithm}=${constructDigestString(workingReq, combinedOptions)}`
  }

  workingReq.headers.Signature = `keyId="${keyId}", algorithm="${algorithmName}", headers="${signedHeaders.join(' ')}", signature="${constructSignatureString(workingReq, combinedOptions)}", created=${combinedOptions.created}${combinedOptions.expires ? `, expires=${combinedOptions.expires}` : ''}`

  return workingReq
}

module.exports = createSignRequest
