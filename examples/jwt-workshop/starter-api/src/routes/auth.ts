import { Router, type Response } from 'express'

import { env } from '../config/env'
import { requireAuth } from '../middleware/auth'
import { validateBody } from '../middleware/validate'
import {
  authenticateUser,
  buildSession,
  getUserByRefreshToken,
  revokeRefreshToken,
} from '../services/auth-service'
import type { AuthenticatedRequest, LoginRequest } from '../types'
import { loginSchema } from '../validation/auth'

const router = Router()

function setRefreshCookie(res: Response, token: string): void {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body as LoginRequest
  const user = await authenticateUser(email, password)

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials.' })
    return
  }

  const session = await buildSession(user)
  setRefreshCookie(res, session.refreshToken)

  res.status(200).json({
    accessToken: session.accessToken,
    tokenType: session.tokenType,
    expiresIn: session.expiresIn,
    user: session.user,
  })
})

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token is missing.' })
    return
  }

  const user = await getUserByRefreshToken(refreshToken)

  if (!user) {
    res.status(401).json({ error: 'Invalid refresh token.' })
    return
  }

  const session = await buildSession(user)
  await revokeRefreshToken(refreshToken)
  setRefreshCookie(res, session.refreshToken)

  res.status(200).json({
    accessToken: session.accessToken,
    tokenType: session.tokenType,
    expiresIn: session.expiresIn,
    user: session.user,
  })
})

router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined

  if (refreshToken) {
    await revokeRefreshToken(refreshToken)
  }

  res.clearCookie('refreshToken', { path: '/' })
  res.status(200).json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({ user: (req as AuthenticatedRequest).currentUser })
})

export default router