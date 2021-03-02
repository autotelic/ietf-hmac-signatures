const urlParseLax = require('url-parse-lax')

const { SPACE, EXPIRATION_OFFSET } = require('../../../constants')

module.exports = {
  '(request-target)': (req) => {
    const { method, url } = req
    const { pathname, search } = urlParseLax(url)
    return [method.toLowerCase(), pathname, search].join(SPACE).trim()
  },
  '(created)': (req) => parseInt(req.headers.Date),
  '(expires)': (req) => parseInt(req.headers.Date) + EXPIRATION_OFFSET,
  'Content-Type': (req) => req.headers['Content-Type'],
  'Content-Length': (req) => req.headers['Content-Length'],
  Digest: (req) => req.body,
  Date: (req) => req.headers.Date,
  Host: ({ url }) => {
    const { host } = urlParseLax(url)
    return host
  }
}
