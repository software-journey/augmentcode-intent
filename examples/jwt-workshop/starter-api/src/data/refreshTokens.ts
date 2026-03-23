import { randomUUID } from 'node:crypto'

import { findPublicUserById } from './users'

const refreshTokens = new Map<string, string>()

export function issueRefreshToken(userId: string): string {
  const refreshToken = randomUUID()
  refreshTokens.set(refreshToken, userId)
  return refreshToken
}

export function readRefreshToken(refreshToken: string) {
  const userId = refreshTokens.get(refreshToken)

  if (!userId) {
    return undefined
  }

  return findPublicUserById(userId)
}