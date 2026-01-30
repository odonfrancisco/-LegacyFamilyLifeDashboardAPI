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
router.get('/agent/:agentId', getAgentCharts)
router.get('/agents/:agentId/:chartName', getAgentChart)

/**
 * Company charts
 */
router.get('/company', getCompanyCharts)
router.get('/company/:chartName', getCompanyChart)

// router.get('/:chartName', getSpecificCharts)

export default router
