'use strict'

const { test } = require('tap')
const getAlgorithm = require('./getAlgorithm')

const defaultOptions = {
  algorithmMap: {
    hs2019: {
      'test-key-a': 'sha512',
      'test-key-b': 'sha256'
    }
  }
}

test('Returns an algorithm string based on an algorithmName and keyId', async ({
  equal
}) => {
  const tests = [
    {
      description: 'Matching algorithm for test-key-a',
      input: {},
      options: {
        ...defaultOptions,
        keyId: 'test-key-a',
        algorithmName: 'hs2019'
      },
      expected: 'sha512'
    },
    {
      description: 'Matching algorithm for test-key-b',
      input: {},
      options: {
        ...defaultOptions,
        keyId: 'test-key-b',
        algorithmName: 'hs2019'
      },
      expected: 'sha256'
    }
  ]

  tests.forEach(({ description, input, options, expected }) => {
    equal(getAlgorithm(input, options), expected, description)
  })
})

test('Throws an error when algorithm value cannot be returned', async ({
  throws
}) => {
  const tests = [
    {
      description: 'algorithmName is not in algorithmMap',
      input: {},
      options: {
        ...defaultOptions,
        keyId: 'test-key-a',
        algorithmName: 'RSA-256'
      },
      expected: new Error(
        'No entry for this algorithm in algorithmMap'
      )
    },
    {
      description: 'keyId keyId is not in algorithmMap',
      input: {},
      options: {
        ...defaultOptions,
        keyId: 'test-key-c',
        algorithmName: 'hs2019'
      },
      expected: new Error(
        'No entry for this keyId in algorithmMap'
      )
    },
    {
      description: 'algorithmMap is not provided',
      input: {},
      options: {
        keyId: 'test-key-c',
        algorithmName: 'hs2019'
      },
      expected: new Error(
        'Missing algorithmMap in options'
      )
    }
  ]

  tests.forEach(({ description, input, options, expected }) => {
    throws(
      function () {
        getAlgorithm(input, options)
      },
      expected,
      description
    )
  })
})
