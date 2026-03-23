import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { env } from './config/env'
import { errorHandler } from './middleware/error-handler'
import { requestLogger } from './middleware/request-logger'
import authRouter from './routes/auth'
import shipmentsRouter from './routes/shipments'

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(requestLogger)

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/auth', authRouter)
app.use('/shipments', shipmentsRouter)
app.use(errorHandler)

export default app