const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  `${process.env.ORIGIN}/api/google/oauth/callback`
);

// Scopes
const scopes = ["https://www.googleapis.com/auth/analytics"];

function createAuthURL() {
  return oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    // If you only need one scope you can pass it as a string
    scope: scopes
  });
}

function loadToken(code) {
  return oauth2Client.getToken(code);
}

module.exports = {
  createAuthURL,
  loadToken
};
