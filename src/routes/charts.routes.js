// src/routes/charts.routes.js
import { Router } from 'express'
import {
  getAgentCharts,
  getAgentChart,
  getCompanyCharts,
  getCompanyChart,
} from '../controllers/charts.controller.js'

const router = Router()

/**
 * Agent charts
 */
router.get('/agent/:agentName', getAgentCharts)
router.get('/agents/:agentName/:chartName', getAgentChart)

/**
 * Company charts
 */
router.get('/company', getCompanyCharts)
router.get('/company/:chartName', getCompanyChart)

export default router
