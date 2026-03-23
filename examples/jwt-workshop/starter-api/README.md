# JWT production-ready workshop API

This Wave 6/7 app matures the JWT workshop into a realistic local auth + shipment API with session management and CI-ready verification.

## Implemented

- SQLite-backed users, refresh tokens, and shipments via Prisma
- password hashing with `bcryptjs`
- `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me`
- `GET /auth/sessions` and `DELETE /auth/sessions/:sessionId`
- `httpOnly` refresh-token cookies with revocation on logout/refresh
- protected `GET /shipments`, optional `?status=...`, and `GET /shipments/:shipmentId`
- request logging and a stable `/health` readiness endpoint
- request validation and focused backend tests

## Setup

1. Copy `.env.example` to `.env`.
2. Run `npm install`.
3. Run `npm run db:migrate -- --name production_foundations`.
4. Run `npm run db:seed`.

## Deferred

- signup and password reset flows
- advanced refresh-token rotation policies
- production secret management and deployment configuration

## Commands

- `npm run dev`
- `npm run typecheck`
- `npm test`

## API highlights

- `GET /auth/sessions` returns active sessions for the current user
- `DELETE /auth/sessions/:sessionId` revokes one session
- `GET /shipments?status=delayed` applies server-side shipment filtering
- `GET /shipments/:shipmentId` supports route-based dashboard detail views

## Connect back to Wave 2

Start with `../specs/living-spec.md`, then inspect `src/` and `prisma/` to see how the Wave 6/7 auth and shipment workflow builds on the earlier learning slices.