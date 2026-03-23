# JWT production-foundations API

This Wave 5 app matures the JWT workshop into a realistic local auth + shipment API.

## Implemented

- SQLite-backed users, refresh tokens, and shipments via Prisma
- password hashing with `bcryptjs`
- `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me`
- `httpOnly` refresh-token cookies with revocation on logout/refresh
- protected `GET /shipments` for the dashboard track
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

## Connect back to Wave 2

Start with `../specs/living-spec.md`, then inspect `src/` and `prisma/` to see how the Wave 5 production foundations build on the earlier learning slices.