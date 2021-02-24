const { test } = require('tap')

const createSignedRequest = require('.')

test('createSignedRequest', async ({ same }) => {
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

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      Date: 1602872645,
      'Content-Type': 'application/json'
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      Date: 1602872645,
      'Content-Type': 'application/json',
      Digest: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg==',
      Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="HFIn7RU3zvfFHeyOjsRlMzUQ18prW+KE61ikKKKoyAlcxGUdlBF/sruA+VznOhQNlWh3J4y3tZc8aDa0TxRBEg==", created="1602872645", expires="1602872945"'
    }
  }
  same(actual, expected)
})

test('createSignedRequest - no (created) field', async ({ same }) => {
  const signatureFields = [
    '(request-target)',
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

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      Date: 1602872645,
      'Content-Type': 'application/json'
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      Date: 1602872645,
      'Content-Type': 'application/json',
      Digest: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg==',
      Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (expires) host digest content-type", signature="94+dhKkJverpEz18fpeRveGnUQdtXgzYOMP/yercs7CkFn6JpR/K8NP2wpkmTjPUj0GiSMVi4Nee4OP87VZJvg==", expires="1602872945"'
    }
  }
  same(actual, expected)
})

test('createSignedRequest - allows a user to override the extractors', async ({ same }) => {
  const signatureFields = [
    '(request-target)',
    '(created)',
    '(expires)',
    'Date',
    'Content-Length'
  ]

  const defaultExtractors = require('./extractors')

  const opts = {
    secret: 'topSecret',
    keyId: 'test-key-a',
    signatureFields,
    extractors: {
      ...defaultExtractors,
      '(expires)': () => 1234567888
    }
  }

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      Date: 1602872645,
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify({ hello: 'world' }).length
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      Date: 1602872645,
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify({ hello: 'world' }).length,
      Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) date content-length", signature="eSw1Nun8RPvj6p4Nx2/gK7edAJNa+FT+UnyFvjBaJcUNltB2zS2LjrYs6bmkRQbgIFyvqPgSp/ZqF68qbnmyrw==", created="1602872645", expires="1234567888"'
    }
  }
  same(actual, expected)
})

test('createSignedRequest - allows a user to override the extractors', async ({ same }) => {
  const signatureFields = [
    '(request-target)',
    '(created)',
    'Date'
  ]

  const opts = {
    secret: 'topSecret',
    keyId: 'test-key-a',
    signatureFields,
    transformers: {
      Date: (key, value) => [key.toUpperCase(), 11111111111]
    }
  }

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645,
      Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) DATE", signature="pjzjxAYIk6RjGSvB8oA3u06ThAFWAEGD6pWBOjFVSB/H4+tzPoPZUiG21uGBCWVi7AOyOy/2dWf+WYH8FsZlwg==", created="1602872645"'
    }
  }
  same(actual, expected)
})

test('createSignedRequest - allows a user to override the constructSignature method', async ({ same }) => {
  const signatureFields = [
    '(request-target)',
    '(created)'
  ]

  const opts = {
    secret: 'topSecret',
    keyId: 'test-key-a',
    signatureFields,
    constructSignature: (secret, algorithm, input) =>
      [secret, algorithm, input].join('::')
  }

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645,
      Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created)", signature="topSecret::sha512::(request-target): post /foo\n(created): 1602872645", created="1602872645"'
    }
  }
  same(actual, expected)
})

test('createSignedRequest - allows a user to override the constructSignatureString method', async ({ same }) => {
  const signatureFields = [
    '(request-target)',
    '(created)'
  ]

  const opts = {
    secret: 'topSecret',
    keyId: 'test-key-a',
    signatureFields,
    constructSignatureString: (request, opts) => {
      const {
        algorithm,
        signingAlgorithm,
        constructSignature,
        secret,
        keyId,
        fields
      } = opts
      const signature = constructSignature(secret, signingAlgorithm, 'asdf')
      return `algorithm=${algorithm} :: keyId=${keyId}::  fields=${fields.join('--')} :: signature=${signature}}`
    }
  }

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645,
      Signature: 'algorithm=hs2019 :: keyId=test-key-a::  fields=(request-target),post /foo--(created),1602872645 :: signature=7Ng9s9iT1jMhqtY68sDrEo5EquExrEwRTkFjuIwbynXW6NzI/zV37M9rglDH3JVpFpsjvGau7aa2ufXSwQrv0Q==}'
    }
  }
  same(actual, expected)
})

test('createSignedRequest - allows a user to override the outputHandler method', async ({ same }) => {
  const signatureFields = [
    '(request-target)',
    '(created)'
  ]

  const opts = {
    secret: 'topSecret',
    keyId: 'test-key-a',
    signatureFields,
    outputHandler: (request, fields, signature) => ({
      request,
      fields,
      signature
    })
  }

  const request = {
    url: 'http://localhost:3000/foo',
    method: 'POST',
    headers: {
      Date: 1602872645
    }
  }

  const signRequest = createSignedRequest(opts)
  const actual = signRequest(request)
  const expected = {
    request: {
      url: 'http://localhost:3000/foo',
      method: 'POST',
      headers: {
        Date: 1602872645
      }
    },
    fields: [
      [
        '(request-target)',
        'post /foo'
      ],
      [
        '(created)',
        1602872645
      ]
    ],
    signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created)", signature="+H6Yip7T+tbRyz2Ho+WCEKxr+h2xL/xR3aH8PobEoyL6uWyv20+gKacMmyqeEfg9X26tL9h9vhA4GphTS1A1EQ==", created="1602872645"'
  }
  same(actual, expected)
})
