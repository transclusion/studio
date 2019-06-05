const cookie = require("cookie");
const { URL } = require("url");
const qs = require("qs");
const { loadToken } = require("./_helpers");

module.exports = async (req, res) => {
  const url = new URL(req.url, process.env.ORIGIN);
  const query = url.search ? qs.parse(url.search.substr(1)) : {};
  const code = query.code;
  if (typeof code !== "string") {
    res.end(JSON.stringify({ message: "No code provided" }));
    return;
  }
  try {
    const { tokens } = await loadToken(code);
    const cookies = [];
    cookies.push(
      cookie.serialize("__google_api_tokens", JSON.stringify(tokens), {
        path: "/",
        expires: new Date(tokens.expiry_date),
        httpOnly: true
      })
    );
    res.setHeader("Set-Cookie", cookies);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("close window");
  } catch (err) {
    res.end(JSON.stringify({ message: err.message }));
  }
};
