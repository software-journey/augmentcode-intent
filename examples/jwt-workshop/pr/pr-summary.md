# JWT PR summary example

## Summary

This change packages the JWT auth slice for review with a second-step lifecycle increment: login flow expectations, refresh-token handling, protected profile access, and the verification story needed to confirm the behavior.

## Scope of the change

- login response contract
- refresh-token renewal expectations
- protected profile route expectations
- unauthorized error handling expectations

## Verification story

- successful login returns token details with clear semantics
- valid refresh tokens renew access predictably
- invalid credentials fail predictably
- protected access requires a valid bearer token

## Follow-ups

- logout or revocation behavior
- refresh token rotation and persistent session storage
- production security hardening beyond the workshop scope