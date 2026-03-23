import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'

import request from 'supertest'

import app from '../src/app'
import { resetDatabase } from '../src/db/seed-data'

beforeEach(async () => {
  await resetDatabase()
})

test('GET /shipments requires authentication', async () => {
  const response = await request(app).get('/shipments')

  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'Missing or invalid bearer token.')
})

test('GET /shipments returns seeded shipment data for authenticated users', async () => {
  const login = await request(app).post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const response = await request(app)
    .get('/shipments')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 200)
  assert.equal(response.body.shipments.length, 4)
  assert.equal(response.body.shipments.some((shipment: { status: string }) => shipment.status === 'delayed'), true)
})