import app from './app'

const port = Number(process.env.PORT ?? 3001)

app.listen(port, () => {
  console.log(`JWT starter API listening on http://localhost:${port}`)
})