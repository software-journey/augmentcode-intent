import { Router } from 'express'

import { findUserByCredentials, toPublicUser } from '../data/users'
import { issueRefreshToken, readRefreshToken } from '../data/refreshTokens'
import { ACCESS_TOKEN_TTL, signAccessToken } from '../lib/jwt'
import type { LoginRequest, RefreshRequest } from '../types'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body as Partial<LoginRequest>

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' })
    return
  }

  const user = findUserByCredentials(email, password)

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials.' })
    return
  }

  const publicUser = toPublicUser(user)

  res.status(200).json({
    accessToken: signAccessToken(publicUser),
    refreshToken: issueRefreshToken(publicUser.id),
    tokenType: 'Bearer',
    expiresIn: ACCESS_TOKEN_TTL,
    user: publicUser,
  })
})

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body as Partial<RefreshRequest>

  if (!refreshToken) {
    res.status(400).json({ error: 'Refresh token is required.' })
    return
  }

  const user = readRefreshToken(refreshToken)

  if (!user) {
    res.status(401).json({ error: 'Invalid refresh token.' })
    return
  }

  res.status(200).json({
    accessToken: signAccessToken(user),
    tokenType: 'Bearer',
    expiresIn: ACCESS_TOKEN_TTL,
    user,
  })
})

export default router