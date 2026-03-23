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

function mapFilterStatus(status?: ShipmentStatus): PrismaShipmentStatus | undefined {
  if (status === 'on-time') {
    return 'ON_TIME'
  }

  if (status === 'at-risk') {
    return 'AT_RISK'
  }

  if (status === 'delayed') {
    return 'DELAYED'
  }

  return undefined
}

export async function listShipments(status?: ShipmentStatus): Promise<ShipmentRecord[]> {
  const shipments = await prisma.shipment.findMany({
    where: status ? { status: mapFilterStatus(status) } : undefined,
    orderBy: { route: 'asc' },
  })
  return shipments.map(mapShipment)
}

export async function getShipmentById(shipmentId: string): Promise<ShipmentRecord | null> {
  const shipment = await prisma.shipment.findUnique({ where: { id: shipmentId } })
  return shipment ? mapShipment(shipment) : null
}