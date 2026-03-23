import { Router } from 'express'

import { requireAuth } from '../middleware/auth'
import { listShipments } from '../services/shipment-service'

const router = Router()

router.get('/', requireAuth, async (_req, res) => {
  const shipments = await listShipments()
  res.status(200).json({ shipments })
})

export default router