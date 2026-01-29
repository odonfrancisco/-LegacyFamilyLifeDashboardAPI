export async function googleAuthCallback(req, res, next) {
  try {
    res.json({ message: 'googleAuthCallback not implemented' })
  } catch (err) {
    next(err)
  }
}
