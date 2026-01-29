export function requireOrgEmail(req, res, next) {
  if (!req.user?.email.endsWith('@legacyfamilylife.com')) {
    return res.status(403).send('Forbidden')
  }
  next()
}
