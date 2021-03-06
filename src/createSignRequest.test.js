'use strict'

const { test, beforeEach } = require('tap')
const createSignRequest = require('./createSignRequest')

const defaultOptions = {
  sharedSecret: 'topSecret',
  algorithmMap: {
    hs2019: {
      'test-key-a': 'sha512',
      'test-key-b': 'sha256'
    }
  },
  keyId: 'test-key-a',
  algorithmName: 'hs2019',
  signedHeaders: ['(request-target)', '(created)', '(expires)', 'host', 'digest', 'content-type']
}

const defaultReq = {
  url: 'http://localhost:3000/foo',
  method: 'POST',
  body: JSON.stringify({ hello: 'world' }),
  headers: {
    'content-type': 'application/json'
  }
}

beforeEach((done, t) => {
  // Mock Date.now() so signatures based on either (created) or (expires) values are the same as the testing data
  const mockNow = 1602872645813

  Object.assign(Date, { now: () => mockNow })

  done()
})

test('Returns a request object with added signature headers', async ({
  same
}) => {
  const tests = [
    {
      description: 'Adds correct digest and signature headers',
      input: {
        ...defaultReq
      },
      options: {
        ...defaultOptions
      },
      expected: {
        url: 'http://localhost:3000/foo',
        method: 'POST',
        body: '{"hello":"world"}',
        headers: {
          'content-type': 'application/json',
          digest: 'sha-512=+PtokCNHosgo04ww4cNhd4yJxhMjLzWjDAKtKwQZDT4Ef9v/PrS/+BQLX4IX5dZkUMK/tQo7Uyc68RkhNyCZVg==',
          Signature: 'keyId="test-key-a", algorithm="hs2019", headers="(request-target) (created) (expires) host digest content-type", signature="HFIn7RU3zvfFHeyOjsRlMzUQ18prW+KE61ikKKKoyAlcxGUdlBF/sruA+VznOhQNlWh3J4y3tZc8aDa0TxRBEg==", created=1602872645, expires=1602872945'
        }
      }
    }
  ]

  tests.forEach(({ description, input, options, expected }) => {
    same(createSignRequest(options)(input), expected, description)
  })
})

test('Throws errors when required options are not provided', async ({
  throws
}) => {
  const tests = [
    {
      description: 'No keyId provided',
      input: {
        ...defaultReq
      },
      options: {
        ...defaultOptions,
        keyId: null
      },
      expected: new Error(
        'keyId in options object is missing or not a string'
      )
    },
    {
      description: 'No algorithmName provided',
      input: {
        ...defaultReq
      },
      options: {
        ...defaultOptions,
        algorithmName: null
      },
      expected: new Error(
        'algorithmName in options object is missing or not a string'
      )
    },
    {
      description: 'signedHeaders is not an array',
      input: {
        ...defaultReq
      },
      options: {
        ...defaultOptions,
        signedHeaders: null
      },
      expected: new Error(
        'signedHeaders must be an array with at least one value'
      )
    },
    {
      description: 'signedHeaders array is empty',
      input: {
        ...defaultReq
      },
      options: {
        ...defaultOptions,
        signedHeaders: []
      },
      expected: new Error(
        'signedHeaders must be an array with at least one value'
      )
    }
  ]

  tests.forEach(({ description, input, options, expected }) => {
    throws(
      function () {
        createSignRequest(options)(input)
      },
      expected,
      description
    )
  })
})
