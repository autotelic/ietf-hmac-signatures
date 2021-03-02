'use strict'

const {
  constructSignature,
  constructSignatureString,
  outputHandler,
  transformers,
  extractors,
  signatureFields
} = require('./defaults/versions/latest')

module.exports = {
  algorithm: 'hs2019',
  signingAlgorithm: 'sha512',
  signatureFields,
  extractors,
  transformers,
  constructSignatureString,
  constructSignature,
  outputHandler
}
