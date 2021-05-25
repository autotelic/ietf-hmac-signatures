const processor = require('./processor')
const defaultOpts = require('./defaultOpts')

/**
 * Signer Options Type
 * @typedef {Object} SignatureOptions
 * @property {string} secret - The shared secret used to sign the signature
 * @property {string} keyId - The keyId to include as part of the signature metadata
 * @property {string[]} [signatureFields] - An array of references to the desired signature material
 * @property {string} [algorithm='hs2019'] - The IETF algorithm name to use e.g. 'hs2019'
 * @property {string} [signingAlgorithm='sha512'] - The signing algorithm to use when constructing the signature e.g. 'sha512',
 // TODO(jeff-sexton): Add jsdoc property defs for the following:
  extractors,
  transformers,
  constructSignatureString,
  constructSignature,
  outputHandler
 */

/**
 * Request Options Type
 * @typedef {Object} RequestObject
 * @property {string} url - The full url of the request to sign
 * @property {string} method - The method of the request to sign
 * @property {string} body - The stringified body of the request to sign
 * @property {Record<string, string>} headers - A headers object containing any request values that will be part of the signature material
 */

/**
 * createRequestSigner function
 *
 * Returns a requestSigner function initialized with the necessary signature options
 * @param {SignatureOptions} options - The employee who is responsible for the project.
 */
function createRequestSigner (options) {
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

  /**
    * requestSigner function
    *
    * Returned by createRequestSigner function.
    * Accepts a request object and returns the same object with a Signature header generated according to the signatureOptions
    * @param {RequestObject} request - The Request object to sign
    * @returns {RequestObject} - The Request object with an added Signature header
   */
  function requestSigner (request) {
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

  return requestSigner
}

module.exports = createRequestSigner
