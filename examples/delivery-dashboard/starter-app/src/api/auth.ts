import { apiRequest } from './client'
import type { AuthResponse, LoginCredentials } from '../types'

export function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
  })
}

export function refreshSession(): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/refresh', { method: 'POST' })
}

export function logout(): Promise<{ ok: true }> {
  return apiRequest<{ ok: true }>('/auth/logout', { method: 'POST' })
}