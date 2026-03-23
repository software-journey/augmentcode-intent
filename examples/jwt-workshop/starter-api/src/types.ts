import type { Request } from 'express'

export type PublicUser = {
  id: string
  email: string
  name: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type AccessTokenPayload = PublicUser

export type ShipmentStatus = 'delayed' | 'on-time' | 'at-risk'

export type ShipmentRecord = {
  id: string
  route: string
  destination: string
  courier: string
  etaWindow: string
  status: ShipmentStatus
  delayMinutes: number
  priorityNote: string
}

export type AuthenticatedRequest = Request & {
  currentUser: PublicUser
}