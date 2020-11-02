const HEADERS_FIELD_PREFIX = 'headers='
const SIGNATURE_FIELD_PREFIX = 'signature='
const KEY_ID_FIELD_PREFIX = 'keyId='
const ALGORITHM_FIELD_PREFIX = 'algorithm='

const DELIMITER = ': '
const SPACE = ' '

function joinField (key, value) {
  return `${key}"${value}"`
}

// The fields to be included when signing the request
const signatureHeaders = [
  'Content-Type',
  'Digest'
]

// Extractors will be provided as options.
const extractors = {
  'Content-Type': (req) => req.headers['Content-Type'],
  Digest: (req) => JSON.parse(req.body)
}

// Transformers will be provided as options.
const transformers = {
  'Content-Type': (key, value) => [key.toLowerCase(), value],
  Digest: (key, value) => [
    key.toLowerCase(),
    value
  ]
}

function processor (field, request) {
  const extractor = extractors[field]
  const transformer = transformers[field]
  const fieldValue = extractor(request)
  return transformer(field, fieldValue)
};

function headerFieldReducer (accumulator, [key]) {
  return accumulator.concat(key, SPACE)
};

function signatureHeaderInputReducer (accumulator, [key, value]) {
  return accumulator.concat(key, DELIMITER, value, SPACE)
};

// These will come from configuration objects.
const keyId = 'testkey'
const algorithm = 'sha512'

// This method will do the real signing.
function doTheSigning (inputs) {
  return 'some-encrypted-string'
};

// This method will be wrapped in a factory function to pre-configure fields.
module.exports = function constructSignatureHeader (request) {
  const headers = signatureHeaders.map((field) => processor(field, request))
  const signedHeaders = headers.reduce(signatureHeaderInputReducer, '').trim()
  const signature = doTheSigning(signedHeaders)

  const headerField = joinField(HEADERS_FIELD_PREFIX, headers.reduce(headerFieldReducer, ''))
  const keyIdField = joinField(KEY_ID_FIELD_PREFIX, keyId)
  const algorithmField = joinField(ALGORITHM_FIELD_PREFIX, algorithm)
  const signatureField = joinField(SIGNATURE_FIELD_PREFIX, signature)

  return [
    keyIdField,
    algorithmField,
    headerField,
    signatureField
  ].join(SPACE).trim()
}
