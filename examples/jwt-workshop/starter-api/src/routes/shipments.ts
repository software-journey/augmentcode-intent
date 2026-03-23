import { Router } from 'express'

import { requireAuth } from '../middleware/auth'
import { validateParams, validateQuery } from '../middleware/validate'
import { getShipmentById, listShipments } from '../services/shipment-service'
import { shipmentParamsSchema, shipmentQuerySchema } from '../validation/shipments'
import type { ShipmentStatus } from '../types'

const router = Router()

router.get('/', requireAuth, validateQuery(shipmentQuerySchema), async (req, res) => {
  const shipments = await listShipments(req.query.status as ShipmentStatus | undefined)
  res.status(200).json({ shipments })
})

router.get('/:shipmentId', requireAuth, validateParams(shipmentParamsSchema), async (req, res) => {
  const shipment = await getShipmentById(String(req.params.shipmentId))

  if (!shipment) {
    res.status(404).json({ error: 'Shipment not found.' })
    return
  }

  res.status(200).json({ shipment })
})

export default router