const cookie = require('cookie')
const superagent = require('superagent')
const {URL} = require('url')
const qs = require('qs')
const {getOrigin} = require('./_helpers')
const {COOKIE_NAME} = require('./_constants')

module.exports = async (req, res) => {
  const origin = getOrigin(req)
  const url = new URL(req.url, origin)
  const query = url.search ? qs.parse(url.search.substr(1)) : {}
  const code = query.code

  if (typeof code !== 'string') {
    res.end(JSON.stringify({message: 'No code provided'}))
    return
  }

  try {
    const {body: tokens} = await superagent
      .post('https://api.zeit.co/v2/oauth/access_token')
      .type('form')
      .send(`client_id=${process.env.ZEIT_OAUTH_CLIENT_ID}`)
      .send(`client_secret=${process.env.ZEIT_OAUTH_CLIENT_SECRET}`)
      .send(`code=${code}`)
      .send(`redirect_uri=${origin}/api/zeit/oauth/callback`)

    const cookies = []

    cookies.push(
      cookie.serialize(COOKIE_NAME, JSON.stringify(tokens), {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        httpOnly: true
      })
    )

    res.setHeader('Set-Cookie', cookies)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(
      `<script>
window.onload = function () {
  window.opener && window.opener.postMessage({type: 'signin', tokens: ${JSON.stringify(tokens)}});
};
</script>`
    )
  } catch (err) {
    console.log(err)
    res.end(
      `<script>
window.onload = function () {
  window.opener && window.opener.postMessage({type: 'error', message: '${err.message}'});
};
</script>`
    )
  }
}
