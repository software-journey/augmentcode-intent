import type { Shipment, ShipmentStatus as PrismaShipmentStatus } from '@prisma/client'

import { prisma } from '../db/client'
import type { ShipmentRecord, ShipmentStatus } from '../types'

function mapStatus(status: PrismaShipmentStatus): ShipmentStatus {
  if (status === 'ON_TIME') {
    return 'on-time'
  }

  if (status === 'AT_RISK') {
    return 'at-risk'
  }

  return 'delayed'
}

function mapShipment(shipment: Shipment): ShipmentRecord {
  return {
    id: shipment.id,
    route: shipment.route,
    destination: shipment.destination,
    courier: shipment.courier,
    etaWindow: shipment.etaWindow,
    status: mapStatus(shipment.status),
    delayMinutes: shipment.delayMinutes,
    priorityNote: shipment.priorityNote,
  }
}

export async function listShipments(): Promise<ShipmentRecord[]> {
  const shipments = await prisma.shipment.findMany({ orderBy: { route: 'asc' } })
  return shipments.map(mapShipment)
}