const {
  HEADERS_FIELD_PREFIX,
  SIGNATURE_FIELD_PREFIX,
  KEY_ID_FIELD_PREFIX,
  ALGORITHM_FIELD_PREFIX,
  DELIMITER,
  NEWLINE,
  SPACE,
  COMMA
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

  return [
    keyIdField,
    algorithmField,
    headerField,
    signatureField
  ].join(COMMA).trim()
}
