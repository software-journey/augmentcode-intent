import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed.',
        details: result.error.flatten().fieldErrors,
      })
      return
    }

    req.body = result.data
    next()
  }
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query)

    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed.',
        details: result.error.flatten().fieldErrors,
      })
      return
    }

    Object.assign(req.query as Record<string, unknown>, result.data)
    next()
  }
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params)

    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed.',
        details: result.error.flatten().fieldErrors,
      })
      return
    }

    Object.assign(req.params as Record<string, unknown>, result.data)
    next()
  }
}