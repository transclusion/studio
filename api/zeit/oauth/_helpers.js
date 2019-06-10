function getOrigin (req) {
  const proto = req.headers['x-forwarded-proto'] || req.headers.proto
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${proto}://${host}`
}

module.exports = {getOrigin}
