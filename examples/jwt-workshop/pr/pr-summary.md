# JWT PR summary example

## Summary

This change packages the JWT auth slice for review as a Wave 6/7 increment: persisted login flow expectations, refresh-cookie handling, session inspection/revocation, protected shipment detail routes, and CI-backed verification.

## Scope of the change

- login response contract
- refresh-cookie renewal expectations
- active session inspection and revocation expectations
- protected profile route expectations
- protected shipment list/detail endpoint expectations
- unauthorized error handling expectations

## Verification story

- successful login returns token details with clear semantics
- valid refresh tokens renew access predictably through a persisted session record
- active sessions are inspectable and revocable per user
- invalid credentials fail predictably
- protected access requires a valid bearer token

## Follow-ups

- broader refresh-token rotation policies
- production security hardening beyond the workshop scope