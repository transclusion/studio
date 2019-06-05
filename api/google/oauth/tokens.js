const cookie = require("cookie");
const { URL } = require("url");

const allowedCorsOrigins = (process.env.GOOGLE_OAUTH_CORS_ORIGINS || "").split(
  ","
);

function getRemoteOrigin(req) {
  if (!req.headers.referer) {
    return null;
  }

  return new URL(req.headers.referer).origin;
}

module.exports = (req, res) => {
  const remoteOrigin = getRemoteOrigin(req);

  if (allowedCorsOrigins.indexOf(remoteOrigin) === -1) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: `origin is not allowed: ${remoteOrigin}` })
    );
    return;
  }

  const cookies = cookie.parse(req.headers.cookie || "");
  const tokens =
    cookies && cookies.__google_api_tokens
      ? JSON.parse(cookies.__google_api_tokens)
      : null;

  res.writeHead(200, {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": remoteOrigin,
    "Access-Control-Allow-Methods": "HEAD, GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(tokens, null, 2));
};
