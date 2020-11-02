# ietf-hmac-signatures

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![CI Tests](https://github.com/autotelic/ietf-hmac-signatures/workflows/CI%20Tests/badge.svg)

Methods to construct and verify HMAC signatures based on the [IETF draft standards][1].

## Methods

<!-- TODO(jeff-sexton): Add documentation for methods -->

### `createSignRequest`

A method which returns a `signRequest` function. 

`(options) => function`
 - `options`: `object` - Required - Contains the following properties:
      - `sharedSecret`: `string` - Required - The shared secret corresponding to the signature materials registered with the remote server
      - `keyId`: `string` - Required - The key id corresponding to the signature materials registered with the remote server
      - `algorithmName`: `string` - Required - A valid IEFT algorithm name (e.g. `'hs2019'`) corresponding to the signature materials registered with the remote server
      - `signedHeaders`: `array` - Required - An array of request headers to be be signed e.g. `['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type']`. Defaults to `['(request-target)', '(created)']` if unspecified.
      - `algorithmMap`: `object` - Required - An object the looks up the HMAC algorithm using the `algorithmName` and `keyId`. Corresponds to the signature materials registered with the remote server
      - `expiryOffset`: `integer` - Optional - Default is 300 seconds (5 min) if unspecified
      - `digestEncoding`: `string` - Optional - Default is 'base64' if unspecified
      - `getAlgorithm`: `function` - Optional - A function to return a HMAC algorithm based on the `algorithmMap`, `algorithmName`, and `keyId` values. Default getAlgorithm used if unspecified.
      - `constructSignatureString`: `function` - Optional - Default constructSignatureString used if unspecified
      - `constructDigestString`: `function` - Optional - Default constructDigestString used if unspecified.

The returned `signRequest` function will sign requests based on the configured signature options.

`(request) => object`

- `request`: `object` - Required - Contains the following properties:
  - `url`: `string` - Required
  - `method`: `string` - Required
  - `headers`: `object` - Required - Contains Key: value pair of any headers defined in the `signedHeaders` array in the options object.
  - `body`: `JSON string` - Optional - Required only if `'digest'` is in the `signedHeaders` array in the options object.

#### Usage Example

```js
const got = require('got')
const { createSignRequest } = require('@autotelic/ieft-hmac-signatures')

const options = {
  sharedSecret: 'topSecret',
  algorithmMap: {
    hs2019: {
      'test-key-a': 'sha512',
      'test-key-b': 'sha256'
    }
  },
  keyId: 'test-key-b',
  algorithmName: 'hs2019',
  signedHeaders: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type']
  // expiryOffset: 300, // Optional - Default is 300 seconds (5 min) if unspecified
  // digestEncoding: 'base64', // Optional - Default is base64 if unspecified
  // digestAlgorithm: 'sha-512' // Optional - Default is sha-512 if unspecified
  // getAlgorithm: (req, options) => 'sha512', // Optional - Default getAlgorithm used if unspecified
  // constructSignatureString: (req, options) => {}, // Optional - Default constructSignatureString used if unspecified
  // constructDigestString: (req, options) => {}, // Optional - Default constructDigestString used if unspecified
}

;(async () => {
  const signRequest = createSignRequest(options)

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const signedRequest = signRequest(request)

  try {
    const response = await got(signedRequest)
    console.log(response.statusCode, response.statusMessage)
  } catch (error) {
    console.log(error.response.body)
  }
})()

```

### License

MIT

[1]: https://datatracker.ietf.org/doc/draft-ietf-httpbis-message-signatures/