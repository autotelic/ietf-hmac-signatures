'use strict'

const { test } = require('tap')
const constructSignatureString = require('./constructSignatureString')

const defaultOptions = {
  sharedSecret: 'topSecret',
  algorithmMap: {
    hs2019: {
      'test-key-a': 'sha512',
      'test-key-b': 'sha256'
    }
  },
  keyId: 'test-key-a',
  algorithmName: 'hs2019'
}

const defaultRequest = {
  url: 'http://localhost:3000/foo',
  method: 'GET'
}

// TODO(jeff-sexton): Add more tests to get to 100%
test('Constructs a signature string from the incoming request', async ({
  equal
}) => {
  const tests = [
    {
      description:
        'Matching signature constructed when a basic GET request is provided',
      input: defaultRequest,
      options: {
        ...defaultOptions,
        created: 1602801700,
        expires: 1602802000,
        signedHeaders: ['(request-target)', '(created)', '(expires)', 'host']
      },
      expected: 'vBPsqo25Dk8r6FIan068bROJ9tygnnLx+6Vz8W7mORW6CPMVoewfMoswxbRQYxuxYhVTo5a7ns3PTufQfsvGWQ=='
    },
    {
      description:
        'Matching signature constructed when signedHeaders do not have brackets',
      input: defaultRequest,
      options: {
        ...defaultOptions,
        created: 1602801700,
        expires: 1602802000,
        signedHeaders: ['request-target', 'created', 'expires', 'host']
      },
      expected: 'vBPsqo25Dk8r6FIan068bROJ9tygnnLx+6Vz8W7mORW6CPMVoewfMoswxbRQYxuxYhVTo5a7ns3PTufQfsvGWQ=='
    },
    {
      description:
        'Matching signature constructed when a POST request is provided with a digest header',
      input: {
        ...defaultRequest,
        method: 'POST',
        body: '{"hello":"world"}',
        headers: {
          digest: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg==',
          'content-type': 'application/json'
        }
      },
      options: {
        ...defaultOptions,
        created: 1602801700,
        expires: 1602802000,
        signedHeaders: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type']
      },
      expected: 'G5lPKhejzjO0etsI7w5HUfS/33OERhv/ImqIhr/kw2kDLU932uG6hp9bo47B7QpwaKpGFdCwK7EYu++WIDBOhw=='
    }

  ]

  tests.forEach(({ description, input, options, expected }) => {
    equal(constructSignatureString(input, options), expected, description)
  })
})

test('Throws an error when a signature string cannot be returned', async ({
  throws
}) => {
  const tests = [
    {
      description: 'No sharedSecret provided',
      input: {},
      options: {},
      expected: new Error(
        'Missing shared secret in options'
      )
    },
    {
      description: 'A req header to be signed is not present',
      input: {
        ...defaultRequest,
        method: 'POST',
        body: '{"hello":"world"}',
        headers: {
          digest: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg==',
          'content-type': 'application/json'
        }
      },
      options: {
        ...defaultOptions,
        created: 1602801700,
        expires: 1602802000,
        signedHeaders: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type', 'content-encoding']
      },
      expected: new Error(
        'Header content-encoding does not exist in the request'
      )
    }
  ]

  tests.forEach(({ description, input, options, expected }) => {
    throws(
      function () {
        constructSignatureString(input, options)
      },
      expected,
      description
    )
  })
})
