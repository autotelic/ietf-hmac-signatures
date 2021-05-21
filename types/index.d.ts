export = createRequestSigner;
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
declare function createRequestSigner(options: SignatureOptions): (request: RequestObject) => RequestObject;
declare namespace createRequestSigner {
    export { SignatureOptions, RequestObject };
}
/**
 * Signer Options
 */
type SignatureOptions = {
    /**
     * - The name of the employee.
     */
    secret: string;
    /**
     * - The employee's department.
     */
    keyId: string;
    /**
     * - The employee's department.
     */
    signatureFields: string[];
};
/**
 * Request Options with Url
 */
type RequestObject = {
    /**
     * - The name of the employee.
     */
    url: string;
    /**
     * -
     */
    method: string;
    /**
     * -
     */
    body: string;
    /**
     * -
     */
    headers: any;
};
