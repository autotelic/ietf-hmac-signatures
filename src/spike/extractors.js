const urlParseLax = require('url-parse-lax')
const { SPACE } = require('./constants')

module.exports = {
  '(request-target)': (req) => {
    const { method, url } = req
    const { pathname, search } = urlParseLax(url)
    return [method.toLowerCase(), pathname, search].join(SPACE)
  },
  'Content-Type': (req) => req.headers['Content-Type'],
  Digest: (req) => req.body
}
