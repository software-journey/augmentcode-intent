import { Router } from 'express'

import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/', requireAuth, (_req, res) => {
  res.status(200).json({ user: res.locals.currentUser })
})

export default router