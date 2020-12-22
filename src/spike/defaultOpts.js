const extractors = require('./extractors')
const transformers = require('./transformers')
const constructSignature = require('./constructSignature')
const constructSignatureString = require('./constructSignatureString')
const outputHandler = require('./outputHandler')

const signatureFields = [
  '(request-target)',
  'Date'
]

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
