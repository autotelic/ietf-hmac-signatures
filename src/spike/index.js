const processor = require('./processor')

module.exports = function createRequestSigner (opts) {
  const {
    constructSignatureString,
    extractors,
    signatureFields,
    transformers,
    outputHandler,
    ...restOpts
  } = opts
  return function requestSigner (request) {
    const fields = signatureFields.map((field) => processor(
      request,
      field,
      extractors,
      transformers
    )).filter(([, value]) => value)

    const signature = constructSignatureString(request, {
      ...restOpts,
      fields
    })

    return outputHandler(request, fields, signature)
  }
}
