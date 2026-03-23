import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'

import request from 'supertest'

import app from '../src/app'
import { resetDatabase } from '../src/db/seed-data'

beforeEach(async () => {
  await resetDatabase()
})

test('POST /auth/login sets a refresh cookie and returns an access token', async () => {
  const response = await request(app).post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  assert.equal(response.status, 200)
  assert.equal(response.body.user.email, 'ada@example.com')
  assert.equal(response.body.tokenType, 'Bearer')
  assert.equal(response.body.expiresIn, '15m')
  assert.equal(typeof response.body.accessToken, 'string')
  assert.match(response.headers['set-cookie'][0], /refreshToken=/)
})

test('POST /auth/login rejects invalid credentials', async () => {
  const response = await request(app).post('/auth/login').send({
    email: 'ada@example.com',
    password: 'wrong-password',
  })

  assert.equal(response.status, 401)
  assert.equal(response.body.error, 'Invalid credentials.')
})

test('POST /auth/refresh returns a new access token when the refresh cookie is present', async () => {
  const agent = request.agent(app)

  await agent.post('/auth/login').send({
    email: 'grace@example.com',
    password: 'navy-debugger',
  })

  const response = await agent.post('/auth/refresh')

  assert.equal(response.status, 200)
  assert.equal(response.body.user.email, 'grace@example.com')
  assert.equal(typeof response.body.accessToken, 'string')
  assert.match(response.headers['set-cookie'][0], /refreshToken=/)
})

test('POST /auth/logout revokes the refresh token and clears the cookie', async () => {
  const agent = request.agent(app)

  await agent.post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const logout = await agent.post('/auth/logout')
  const refresh = await agent.post('/auth/refresh')

  assert.equal(logout.status, 200)
  assert.equal(logout.body.ok, true)
  assert.match(logout.headers['set-cookie'][0], /refreshToken=;/)
  assert.equal(refresh.status, 401)
})

test('GET /auth/me returns the current user for a valid bearer token', async () => {
  const login = await request(app).post('/auth/login').send({
    email: 'grace@example.com',
    password: 'navy-debugger',
  })

  const response = await request(app)
    .get('/auth/me')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 200)
  assert.equal(response.body.user.name, 'Grace Hopper')
  assert.equal(response.body.user.email, 'grace@example.com')
})

test('GET /auth/sessions returns active sessions and marks the current one', async () => {
  const agent = request.agent(app)

  const login = await agent.post('/auth/login').send({
    email: 'ada@example.com',
    password: 'workshop-pass',
  })

  const response = await agent
    .get('/auth/sessions')
    .set('Authorization', `Bearer ${login.body.accessToken}`)

  assert.equal(response.status, 200)
  assert.equal(response.body.sessions.length, 1)
  assert.equal(response.body.sessions[0].current, true)
})

test('DELETE /auth/sessions/:sessionId revokes a session for the current user', async () => {
  const currentAgent = request.agent(app)
  const secondAgent = request.agent(app)

  const firstLogin = await currentAgent.post('/auth/login').send({
    email: 'grace@example.com',
    password: 'navy-debugger',
  })

  await secondAgent.post('/auth/login').send({
    email: 'grace@example.com',
    password: 'navy-debugger',
  })

  const sessions = await currentAgent
    .get('/auth/sessions')
    .set('Authorization', `Bearer ${firstLogin.body.accessToken}`)

  const otherSession = sessions.body.sessions.find((session: { current: boolean }) => !session.current)

  const revoke = await currentAgent
    .delete(`/auth/sessions/${otherSession.id}`)
    .set('Authorization', `Bearer ${firstLogin.body.accessToken}`)

  const revokedRefresh = await secondAgent.post('/auth/refresh')

  assert.equal(revoke.status, 200)
  assert.equal(revoke.body.ok, true)
  assert.equal(revokedRefresh.status, 401)
})