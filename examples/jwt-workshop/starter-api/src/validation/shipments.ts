import { z } from 'zod'

export const shipmentQuerySchema = z.object({
  status: z.enum(['delayed', 'on-time', 'at-risk']).optional(),
})

export const shipmentParamsSchema = z.object({
  shipmentId: z.string().min(1),
})