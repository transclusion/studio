const cookie = require('cookie')
const {COOKIE_NAME} = require('./_constants')

module.exports = (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const tokens = cookies && cookies[COOKIE_NAME] ? JSON.parse(cookies[COOKIE_NAME]) : null

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(tokens))
}
