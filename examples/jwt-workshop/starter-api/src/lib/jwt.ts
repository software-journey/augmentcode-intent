import jwt, { type SignOptions } from 'jsonwebtoken'

import { env } from '../config/env'
import type { AccessTokenPayload, PublicUser } from '../types'

export const ACCESS_TOKEN_TTL = env.ACCESS_TOKEN_TTL as SignOptions['expiresIn']

export function signAccessToken(user: PublicUser): string {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload
}