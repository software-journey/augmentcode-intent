import type { Shipment } from '../types'

export type ShipmentFilter = 'all' | 'delayed'

export function normalizeShipmentFilter(value: string | null): ShipmentFilter {
  return value === 'delayed' ? 'delayed' : 'all'
}

export function countDelayedShipments(shipments: Shipment[]): number {
  return shipments.filter((shipment) => shipment.status === 'delayed').length
}

export function filterShipments(
  shipments: Shipment[],
  filter: ShipmentFilter,
): Shipment[] {
  if (filter === 'delayed') {
    return shipments.filter((shipment) => shipment.status === 'delayed')
  }

  return shipments
}