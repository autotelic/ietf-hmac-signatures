const processor = require('./processor')
const defaultOpts = require('./defaultOpts')

/**
 * Signer Options
 * @typedef {Object} SignatureOptions
 * @property {string} secret - The name of the employee.
 * @property {string} keyId - The employee's department.
 * @property {string[]} signatureFields - The employee's department.
 */

/**
 * Request Options with Url
 * @typedef {Object} RequestObject
 * @property {string} url - The name of the employee.
 * @property {string} method -
 * @property {string} body -
 * @property {Object} headers -
 */

/**
 *
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
    * @param {RequestObject} request - The employee who is responsible for the project.
    * @returns {RequestObject}
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
