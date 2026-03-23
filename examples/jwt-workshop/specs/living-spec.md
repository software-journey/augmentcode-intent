# JWT workshop living spec

## Goal

Plan a learner-friendly authentication slice where a user can sign in, receive a JWT-based access token, refresh that access when needed, and use it to reach a protected profile endpoint.

## Scenario

You are practicing how to translate an auth idea into a spec before touching implementation. The imagined product has a `POST /login` endpoint, a `POST /refresh` endpoint, and a protected `GET /me` endpoint.

## Scope

- In scope: login request/response shape, refresh-token behavior, protected endpoint expectations, error cases, verification notes
- Out of scope: signup, password reset, persistent session storage, refresh token rotation, production-grade security hardening

## Acceptance criteria

- valid credentials lead to an access token response with clear expiry semantics
- a valid refresh token can renew access without requiring another password submission
- invalid credentials return a predictable error response
- a protected profile route requires a valid bearer token
- missing or invalid tokens are described as explicit failure cases

## Verification notes

- identify the handler, token utility, refresh-token storage, and auth middleware areas you would expect to inspect
- describe one successful request flow and one failure flow
- list which parts should be verified by tests once implementation exists

## Current implementation link

Inspect `../starter-api/README.md`, `../starter-api/src/`, and `../starter-api/prisma/` to see this spec translated into a Wave 5 Express + TypeScript implementation with persisted auth and shipment data.