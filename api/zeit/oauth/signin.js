module.exports = (req, res) => {
  const authUrl = `https://zeit.co/oauth/authorize?client_id=${process.env.ZEIT_OAUTH_CLIENT_ID}`

  res.writeHead(302, {location: authUrl})
  res.end()
}
