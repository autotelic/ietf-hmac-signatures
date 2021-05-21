export = createRequestSigner;
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
 * @property {Object.<string, string | string[] | number >} headers - A headers object containing any request values that will be part of the signature material
 */
/**
 * createRequestSigner function
 *
 * Returns a requestSigner function initialized with the necessary signature options
 * @param {SignatureOptions} options - The employee who is responsible for the project.
 */
declare function createRequestSigner(options: SignatureOptions): (request: RequestObject) => RequestObject;
declare namespace createRequestSigner {
    export { SignatureOptions, RequestObject };
}
/**
 * Signer Options Type
 */
type SignatureOptions = {
    /**
     * - The shared secret used to sign the signature
     */
    secret: string;
    /**
     * - The keyId to include as part of the signature metadata
     */
    keyId: string;
    /**
     * - An array of references to the desired signature material
     */
    signatureFields?: string[];
    /**
     * - The IETF algorithm name to use e.g. 'hs2019'
     */
    algorithm?: string;
    /**
     * - The signing algorithm to use when constructing the signature e.g. 'sha512',
     * // TODO(jeff-sexton): Add jsdoc property defs for the following:
     * extractors,
     * transformers,
     * constructSignatureString,
     * constructSignature,
     * outputHandler
     */
    signingAlgorithm?: string;
};
/**
 * Request Options Type
 */
type RequestObject = {
    /**
     * - The full url of the request to sign
     */
    url: string;
    /**
     * - The method of the request to sign
     */
    method: string;
    /**
     * - The stringified body of the request to sign
     */
    body: string;
    /**
     * - A headers object containing any request values that will be part of the signature material
     */
    headers: {
        [x: string]: string | string[] | number;
    };
};
