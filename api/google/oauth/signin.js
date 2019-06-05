const { createAuthURL } = require("./_helpers");

module.exports = (_, res) => {
  res.writeHead(302, { location: createAuthURL() });
  res.end();
};
