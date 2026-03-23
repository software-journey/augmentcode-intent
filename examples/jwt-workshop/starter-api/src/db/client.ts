import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'

import { env } from '../config/env'

const adapter = new PrismaBetterSqlite3({ url: env.DATABASE_URL })

declare global {
  // eslint-disable-next-line no-var
  var __wave5Prisma: PrismaClient | undefined
}

export const prisma = globalThis.__wave5Prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__wave5Prisma = prisma
}