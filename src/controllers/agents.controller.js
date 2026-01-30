// controllers/agentController.js
import { fetchActiveAgents } from '../services/agents.service.js'

export async function getActiveAgents(req, res, next) {
  try {
    const agents = await fetchActiveAgents({ days: 14 })
    res.json(agents)
  } catch (err) {
    next(err)
  }
}
