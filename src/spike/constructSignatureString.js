const {
  HEADERS_FIELD_PREFIX,
  SIGNATURE_FIELD_PREFIX,
  KEY_ID_FIELD_PREFIX,
  ALGORITHM_FIELD_PREFIX,
  DELIMITER,
  SPACE,
  COMMA
} = require('./constants')
const processor = require('./processor')

function joinField (key, value) {
  return `${key}"${value}"`
}

function headerFieldReducer (accumulator, [key]) {
  return accumulator.concat(key, SPACE)
};

function signatureHeaderInputReducer (accumulator, [key, value]) {
  return accumulator.concat(key, DELIMITER, value, SPACE)
};

module.exports = function constructSignatureString (request, opts) {
  const {
    secret,
    extractors,
    transformers,
    constructSignature,
    signatureFields,
    keyId,
    algorithm
  } = opts
  const headers = signatureFields.map(
    (field) => processor(
      request,
      field,
      extractors,
      transformers
    )
  )
  const signedHeaders = headers.reduce(signatureHeaderInputReducer, '').trim()
  const signature = constructSignature(secret, signedHeaders)

  const headerField = joinField(HEADERS_FIELD_PREFIX, headers.reduce(headerFieldReducer, '').trim())
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
