'use strict'

const getAlgorithm = (req, { algorithmMap, signatureMaterial }) => {
  const { keyId, algorithmName } = signatureMaterial

  if (!algorithmMap[algorithmName]) {
    throw new Error('No entry for this algorithm in algorithmMap')
  }

  const algorithmFromMap = algorithmMap[algorithmName][keyId]
  console.log(algorithmFromMap)

  if (!algorithmFromMap) {
    throw new Error('No entry for this keyId in algorithmMap')
  }

  return algorithmFromMap
}

module.exports = getAlgorithm
