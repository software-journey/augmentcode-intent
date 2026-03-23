import { resetDatabase } from '../src/db/seed-data'

async function main() {
  await resetDatabase()
}

main()
  .then(() => {
    console.log('Seeded Wave 5 backend fixtures.')
  })
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })