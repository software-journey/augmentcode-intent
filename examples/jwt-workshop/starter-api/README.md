# JWT starter API

This Wave 4 starter turns the JWT workshop spec into a small Express + TypeScript auth flow with a second-step token lifecycle increment.

## Implemented

- `POST /login` with an in-memory user fixture
- JWT signing for a successful login
- refresh-token issuance and a minimal `POST /refresh` flow
- `GET /me` protected by bearer-token middleware
- focused tests for login, refresh, and protected-profile behavior

## Deferred

- signup and password resets
- logout flows and persistent refresh-token storage
- persistent storage and production hardening

## Commands

- `npm run dev`
- `npm run typecheck`
- `npm test`

## Connect back to Wave 2

Start with `../specs/living-spec.md`, then inspect `src/` to see the minimal implementation of that slice.