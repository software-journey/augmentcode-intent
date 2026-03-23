import type { NextFunction, Request, Response } from 'express'

import { findPublicUserById } from '../data/users'
import { verifyAccessToken } from '../lib/jwt'

const UNAUTHORIZED = { error: 'Missing or invalid bearer token.' }

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.header('authorization')

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json(UNAUTHORIZED)
    return
  }

  const token = header.slice('Bearer '.length)

  try {
    const payload = verifyAccessToken(token)
    const currentUser = findPublicUserById(payload.id)

    if (!currentUser) {
      res.status(401).json(UNAUTHORIZED)
      return
    }

    res.locals.currentUser = currentUser
    next()
  } catch {
    res.status(401).json(UNAUTHORIZED)
  }
}