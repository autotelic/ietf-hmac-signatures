'use strict'

const { test } = require('tap')
const hmac = require('.')

test('Test Message Matches', async ({ equal }) => {
  equal(hmac.testMessage, 'Hello Worlds', 'Matching Test message')
})
