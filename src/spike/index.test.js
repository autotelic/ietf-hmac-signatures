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
      Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="HFIn7RU3zvfFHeyOjsRlMzUQ18prW+KE61ikKKKoyAlcxGUdlBF/sruA+VznOhQNlWh3J4y3tZc8aDa0TxRBEg=="'
    }
  }
  same(actual, expected)
})
