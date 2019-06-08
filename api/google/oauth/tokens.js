const cookie = require('cookie')

module.exports = (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const tokens =
    cookies && cookies.__google_api_tokens ? JSON.parse(cookies.__google_api_tokens) : null

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(tokens))
}
