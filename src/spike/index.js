const processor = require('./processor')

module.exports = function createRequestSigner (opts) {
  const {
    constructSignatureString,
    extractors,
    signatureFields,
    transformers,
    addDigestHeader = true,
    ...restOpts
  } = opts
  return function requestSigner (request) {
    const fields = signatureFields.map((field) => processor(
      request,
      field,
      extractors,
      transformers
    )).filter(([, value]) => value)

    if (addDigestHeader) {
      const [, digest] = fields.find(([key, value]) => key === 'digest')
      request.headers.Digest = digest
    }

    const signature = constructSignatureString(request, {
      ...restOpts,
      fields
    })
    request.headers.Signature = signature
    return request
  }
}
