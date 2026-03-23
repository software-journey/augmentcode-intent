export type ShipmentStatus = 'delayed' | 'on-time' | 'at-risk'

export type Shipment = {
  id: string
  route: string
  destination: string
  courier: string
  etaWindow: string
  status: ShipmentStatus
  delayMinutes: number
  priorityNote: string
}

export type SessionUser = {
  id: string
  email: string
  name: string
}

export type AuthResponse = {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: string
  user: SessionUser
}

export type LoginCredentials = {
  email: string
  password: string
}