# ietf-hmac-signatures

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![CI](https://github.com/autotelic/ietf-hmac-signatures/workflows/CI%20Tests/badge.svg)

Methods to construct and verify HMAC signatures based on the [IETF draft standards][1].

## Example
```js
const createSignedRequest = require('@autotelic/ietf-hmac-signatures')

// Content to be covered by the HMAC signature
const signatureFields = [
  '(request-target)',
  '(created)',
  '(expires)',
  'Host',
  'Digest',
  'Content-Type'
]

const opts = {
  secret: 'topSecret',
  keyId: 'test-key-a',
  signatureFields
}

// Construct the request signer
const signRequest = createSignedRequest(opts)

// Use
const request = {
  url: 'http://localhost:3000/foo',
  method: 'POST',
  body: JSON.stringify({ hello: 'world' }),
  headers: {
    Date: 1602872645,
    'Content-Type': 'application/json'
  }
}

const signed = signRequest(request)
/**
 * Output:
 *
 * {
 *   url: 'http://localhost:3000/foo',
 *   method: 'POST',
 *   body: JSON.stringify({ hello: 'world' }),
 *   headers: {
 *     Date: 1602872645,
 *     'Content-Type': 'application/json',
 *     Digest: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg==',
 *     Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="HFIn7RU3zvfFHeyOjsRlMzUQ18prW+KE61ikKKKoyAlcxGUdlBF/sruA+VznOhQNlWh3J4y3tZc8aDa0TxRBEg==", created="1602872645", expires="1602872945"'
 *   }
 * }
 */
```

## API

// TODO(jkirkpatrick24): Generate documentation.

### License

MIT

[1]: https://datatracker.ietf.org/doc/draft-ietf-httpbis-message-signatures/
