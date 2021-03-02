const processor = require('./processor')
const defaultOpts = require('./defaultOpts')

module.exports = function createRequestSigner (options) {
  const opts = {
    ...defaultOpts,
    ...options
  }
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
