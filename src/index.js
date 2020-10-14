'use strict'

const signRequest = require('./signRequest')
const getAlgorithm = require('./getAlgorithm')

module.exports = {
  testMessage: 'Hello World',
  signRequest,
  getAlgorithm

}
