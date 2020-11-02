const { test } = require('tap')
const constructSignatureString = require('./constructSignatureString')

const request = {
  url: 'https://google.com',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ hello: 'world' })
}

test('constructs the signature header', ({ done }) => {
  const actual = constructSignatureString(request)
  console.log('ACTUAL', actual)
  done()
})
