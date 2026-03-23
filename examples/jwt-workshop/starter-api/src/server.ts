import { env } from './config/env'
import app from './app'

app.listen(env.PORT, () => {
  console.log(`JWT production-foundations API listening on http://localhost:${env.PORT}`)
})