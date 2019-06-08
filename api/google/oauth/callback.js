const cookie = require('cookie')
const {URL} = require('url')
const qs = require('qs')
const {createOauthClient, getOrigin, loadToken} = require('./_helpers')

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
    const oauthClient = createOauthClient(origin)
    const {tokens} = await loadToken(oauthClient, code)
    const cookies = []

    cookies.push(
      cookie.serialize('__google_api_tokens', JSON.stringify(tokens), {
        path: '/',
        expires: new Date(tokens.expiry_date),
        httpOnly: true
      })
    )

    res.setHeader('Set-Cookie', cookies)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(
      `<script>
window.onload = function () {
  window.opener && window.opener.postMessage({type: 'close'});
};
</script>`
    )
  } catch (err) {
    res.end(
      `<script>
window.onload = function () {
  window.opener && window.opener.postMessage({type: 'error', message: '${err.message}'});
};
</script>`
    )
  }
}
