import jwt, { type SignOptions } from 'jsonwebtoken'

import type { AccessTokenPayload, PublicUser } from '../types'

export const ACCESS_TOKEN_TTL: SignOptions['expiresIn'] = '1h'

const JWT_SECRET = process.env.JWT_SECRET ?? 'wave-3-learning-secret'

export function signAccessToken(user: PublicUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload
}