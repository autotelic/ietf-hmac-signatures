'use strict'

module.exports = function outputHandler (request, fields, signature) {
  const [, digest] = fields.find(([key, value]) => key === 'digest') || []
  if (digest) {
    request.headers.Digest = digest
  }
  request.headers.Signature = signature
  return request
}
