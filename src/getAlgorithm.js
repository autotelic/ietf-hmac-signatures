'use strict'

const getAlgorithm = (req, { algorithmMap, keyId, algorithmName }) => {
  if (!algorithmMap) {
    throw new Error('Missing algorithmMap in options')
  }

  if (!algorithmMap[algorithmName]) {
    throw new Error('No entry for this algorithm in algorithmMap')
  }

  const algorithmFromMap = algorithmMap[algorithmName][keyId]

  if (!algorithmFromMap) {
    throw new Error('No entry for this keyId in algorithmMap')
  }

  return algorithmFromMap
}

module.exports = getAlgorithm
