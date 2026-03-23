import { randomBytes, createHash } from 'node:crypto'

import { compare } from 'bcryptjs'

import { prisma } from '../db/client'
import { env } from '../config/env'
import { signAccessToken } from '../lib/jwt'
import type { PublicUser } from '../types'

function toPublicUser(user: { id: string; email: string; name: string }): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  }
}

function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function authenticateUser(email: string, password: string): Promise<PublicUser | null> {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return null
  }

  const matches = await compare(password, user.passwordHash)

  if (!matches) {
    return null
  }

  return toPublicUser(user)
}

export async function buildSession(user: PublicUser) {
  const refreshToken = randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt,
      userId: user.id,
    },
  })

  return {
    accessToken: signAccessToken(user),
    refreshToken,
    tokenType: 'Bearer',
    expiresIn: env.ACCESS_TOKEN_TTL,
    user,
  }
}

export async function getUserByRefreshToken(refreshToken: string): Promise<PublicUser | null> {
  const token = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashRefreshToken(refreshToken) },
    include: { user: true },
  })

  if (!token || token.revokedAt || token.expiresAt <= new Date()) {
    return null
  }

  return toPublicUser(token.user)
}

export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      tokenHash: hashRefreshToken(refreshToken),
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  })
}

export async function getCurrentUser(userId: string): Promise<PublicUser | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  return user ? toPublicUser(user) : null
}