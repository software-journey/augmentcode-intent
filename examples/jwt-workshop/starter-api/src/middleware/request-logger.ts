import type { NextFunction, Request, Response } from 'express'

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  if (process.env.NODE_ENV === 'test') {
    next()
    return
  }

  const startedAt = Date.now()

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt
    console.info(`[api] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`)
  })

  next()
}