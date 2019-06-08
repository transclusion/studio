const {google} = require('googleapis')

function getOrigin (req) {
  const proto = req.headers['x-forwarded-proto'] || req.headers.proto
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${proto}://${host}`
}

function createOauthClient (origin) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    `${origin}/api/google/oauth/callback`
  )
}

function createAuthURL (oauth2Client) {
  return oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    // If you only need one scope you can pass it as a string
    scope: ['https://www.googleapis.com/auth/analytics']
  })
}

function loadToken (oauth2Client, code) {
  return oauth2Client.getToken(code)
}

module.exports = {
  createOauthClient,
  createAuthURL,
  getOrigin,
  loadToken
}
