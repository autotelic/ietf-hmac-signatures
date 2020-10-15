'use strict'

const { test } = require('tap')
const constructDigestString = require('./constructDigestString')

test('Constructs a valid Digest header from a request body', async ({
  equal
}) => {
  const tests = [
    {
      description: 'Constructs a valid digest with no options specific - default to digestEncoding = base64, digestAlgorithm = sha-512',
      input: {
        body: '{"hello":"world"}'
      },
      options: {},
      expected: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg=='
    },
    {
      description: 'Constructs a valid digest with a specified algorithm options parameter - sha256',
      input: {
        body: '{"hello":"world"}'
      },
      options: {
        digestAlgorithm: 'sha-256'
      },
      expected: 'sha-256=k6I5cakU5erL8KjSUVTNownDwccvu5kU1Hxg88toFYg='
    }
  ]

  tests.forEach(({ description, input, options, expected }) => {
    equal(constructDigestString(input, options), expected, description)
  })
})
