module.exports = function createRequestSigner (opts) {
  const { constructSignatureString, ...restOpts } = opts
  return function requestSigner (request) {
    const sigHeader = constructSignatureString(request, restOpts)
    request.headers.Signature = sigHeader
    // request.headers.Digest = need to add the digestHeader here
    return request
  }
}
