// src/routes/agents.routes.js
import { Router } from 'express'
import { getActiveAgents } from '../controllers/agents.controller.js'

const router = Router()

router.get('/active', getActiveAgents)

export default router
