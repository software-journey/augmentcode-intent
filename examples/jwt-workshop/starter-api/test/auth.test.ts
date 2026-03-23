import assert from 'node:assert/strict'
import test from 'node:test'

import request from 'supertest'

import app from '../src/app'

test('POST /login returns a token for valid credentials', async () => {
  const response = await request(app).post('/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  assert.equal(response.status, 200)
  assert.equal(response.body.user.email, 'ada@example.com')
  assert.equal(response.body.tokenType, 'Bearer')
  assert.equal(response.body.expiresIn, '1h')
  assert.equal(typeof response.body.accessToken, 'string')
  assert.equal(typeof response.body.refreshToken, 'string')
})

test('POST /login rejects invalid credentials', async () => {
  const response = await request(app).post('/login').send({
    email: 'ada@example.com',
    password: 'wrong-password',
  })

  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'Invalid credentials.')
})

test('GET /me rejects requests without a bearer token', async () => {
  const response = await request(app).get('/me')

  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'Missing or invalid bearer token.')
})

test('GET /me returns the current user for a valid bearer token', async () => {
  const login = await request(app).post('/login').send({
    email: 'grace@example.com',
    password: 'navy-debugger',
  })

  const response = await request(app)
    .get('/me')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 200)
  assert.equal(response.body.user.name, 'Grace Hopper')
  assert.equal(response.body.user.email, 'grace@example.com')
})

test('POST /refresh returns a new access token for a valid refresh token', async () => {
  const login = await request(app).post('/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const response = await request(app).post('/refresh').send({
    refreshToken: login.body.refreshToken,
  })

  assert.equal(response.status, 200)
  assert.equal(response.body.user.email, 'ada@example.com')
  assert.equal(response.body.tokenType, 'Bearer')
  assert.equal(response.body.expiresIn, '1h')
  assert.equal(typeof response.body.accessToken, 'string')
})

test('POST /refresh rejects an unknown refresh token', async () => {
  const response = await request(app).post('/refresh').send({
    refreshToken: 'invalid-refresh-token',
  })

  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'Invalid refresh token.')
})