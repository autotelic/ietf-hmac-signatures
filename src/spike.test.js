const { test } = require('tap')
const constructSignatureHeader = require('./spike')

const request = {
  host: 'google.com',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ hello: 'world' })
}

test('constructs the signature header', ({ done }) => {
  const actual = constructSignatureHeader(request)
  console.log('ACTUAL', actual)
  done()
})
