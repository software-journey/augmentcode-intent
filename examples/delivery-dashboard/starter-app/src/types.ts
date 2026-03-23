export type ShipmentStatus = 'delayed' | 'on-time' | 'at-risk'

export type Shipment = {
  id: string
  route: string
  destination: string
  courier: string
  etaWindow: string
  status: ShipmentStatus
  delayMinutes: number
}