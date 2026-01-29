export async function getActiveAgents(req, res, next) {
  try {
    res.json({ message: 'getActiveAgents not implemented' })
  } catch (err) {
    next(err)
  }
}
