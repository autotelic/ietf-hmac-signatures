'use strict'

const {
  DELIMITER,
  NEWLINE,
  SPACE,
  COMMA
} = require('../../../constants')
const {
  HEADERS_FIELD_PREFIX,
  SIGNATURE_FIELD_PREFIX,
  KEY_ID_FIELD_PREFIX,
  ALGORITHM_FIELD_PREFIX,
  CREATED_FIELD_PREFIX,
  EXPIRES_FIELD_PREFIX
} = require('./constants')

function joinField (key, value) {
  return `${key}"${value}"`
}

function headerFieldReducer (accumulator, [key]) {
  return accumulator.concat(key, SPACE)
};

function signatureHeaderInputReducer (accumulator, [key, value]) {
  return accumulator.concat(key, DELIMITER, value, NEWLINE)
};

module.exports = function constructSignatureString (request, opts) {
  const {
    secret,
    constructSignature,
    keyId,
    algorithm,
    signingAlgorithm,
    fields
  } = opts

  const signedHeaders = fields.reduce(signatureHeaderInputReducer, '').trim()
  const signature = constructSignature(secret, signingAlgorithm, signedHeaders)
  const headerField = joinField(HEADERS_FIELD_PREFIX, fields.reduce(headerFieldReducer, '').trim())
  const keyIdField = joinField(KEY_ID_FIELD_PREFIX, keyId)
  const algorithmField = joinField(ALGORITHM_FIELD_PREFIX, algorithm)
  const signatureField = joinField(SIGNATURE_FIELD_PREFIX, signature)

  const createdFieldResult = fields.find(([key]) => key === '(created)')
  const expiresFieldResult = fields.find(([key]) => key === '(expires)')
  const createdField = createdFieldResult ? joinField(CREATED_FIELD_PREFIX, createdFieldResult[1]) : null
  const expiresField = expiresFieldResult ? joinField(EXPIRES_FIELD_PREFIX, expiresFieldResult[1]) : null

  return [
    keyIdField,
    algorithmField,
    headerField,
    signatureField,
    createdField,
    expiresField
  ].filter((field) => field).join(COMMA).trim()
}
