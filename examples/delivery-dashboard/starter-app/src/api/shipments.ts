import { apiRequest } from './client'
import type { Shipment } from '../types'

type ShipmentsResponse = {
  shipments: Shipment[]
}

type ShipmentResponse = {
  shipment: Shipment
}

export async function fetchShipments(token: string, filter?: Shipment['status']): Promise<Shipment[]> {
  const search = filter ? `?status=${encodeURIComponent(filter)}` : ''
  const response = await apiRequest<ShipmentsResponse>(`/shipments${search}`, { token })
  return response.shipments
}

export async function fetchShipment(token: string, shipmentId: string): Promise<Shipment> {
  const response = await apiRequest<ShipmentResponse>(`/shipments/${shipmentId}`, { token })
  return response.shipment
}