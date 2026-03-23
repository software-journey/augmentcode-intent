import type { NextFunction, Request, Response } from 'express'

import { getCurrentUser } from '../services/auth-service'
import { verifyAccessToken } from '../lib/jwt'

const UNAUTHORIZED = { error: 'Missing or invalid bearer token.' }

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const header = req.header('authorization')

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json(UNAUTHORIZED)
    return
  }

  const token = header.slice('Bearer '.length)

  try {
    const payload = verifyAccessToken(token)
    const currentUser = await getCurrentUser(payload.id)

    if (!currentUser) {
      res.status(401).json(UNAUTHORIZED)
      return
    }

    Object.assign(req, { currentUser })
    next()
  } catch {
    res.status(401).json(UNAUTHORIZED)
  }
}