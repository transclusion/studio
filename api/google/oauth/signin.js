const {createOauthClient, createAuthURL, getOrigin} = require('./_helpers')

module.exports = (req, res) => {
  const oauthClient = createOauthClient(getOrigin(req))

  res.writeHead(302, {location: createAuthURL(oauthClient)})
  res.end()
}
