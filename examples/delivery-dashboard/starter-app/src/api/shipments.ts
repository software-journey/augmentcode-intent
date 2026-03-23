import { apiRequest } from './client'
import type { Shipment } from '../types'

type ShipmentsResponse = {
  shipments: Shipment[]
}

export async function fetchShipments(token: string): Promise<Shipment[]> {
  const response = await apiRequest<ShipmentsResponse>('/shipments', { token })
  return response.shipments
}