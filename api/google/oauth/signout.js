const cookie = require('cookie')

module.exports = (req, res) => {
  const cookies = []

  cookies.push(
    cookie.serialize('__google_api_tokens', '', {
      path: '/',
      expires: new Date(1),
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
}
