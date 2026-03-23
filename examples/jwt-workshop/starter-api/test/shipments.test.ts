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

test('GET /shipments filters shipment data by status', async () => {
  const login = await request(app).post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const response = await request(app)
    .get('/shipments?status=delayed')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 200)
  assert.equal(response.body.shipments.length, 2)
  assert.equal(response.body.shipments.every((shipment: { status: string }) => shipment.status === 'delayed'), true)
})

test('GET /shipments/:shipmentId returns a single shipment detail record', async () => {
  const login = await request(app).post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const list = await request(app)
    .get('/shipments')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  const response = await request(app)
    .get(`/shipments/${list.body.shipments[0].id}`)
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 200)
  assert.equal(response.body.shipment.id, list.body.shipments[0].id)
  assert.equal(typeof response.body.shipment.priorityNote, 'string')
})

test('GET /shipments/:shipmentId returns 404 for an unknown shipment', async () => {
  const login = await request(app).post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const response = await request(app)
    .get('/shipments/missing-shipment-id')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 404)
  assert.equal(response.body.error, 'Shipment not found.')
})