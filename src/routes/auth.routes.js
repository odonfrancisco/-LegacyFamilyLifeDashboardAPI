// src/routes/auth.routes.js
import { Router } from 'express'
import { googleAuthCallback } from '../controllers/auth.controller.js'

const router = Router()

// eventually: POST /auth/google
router.post('/google/callback', googleAuthCallback)

export default router
