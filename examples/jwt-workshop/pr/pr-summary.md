# JWT PR summary example

## Summary

This change packages the JWT auth slice for review as a Wave 5 production-foundations increment: persisted login flow expectations, refresh-cookie handling, protected profile access, protected shipment data, and the verification story needed to confirm the behavior.

## Scope of the change

- login response contract
- refresh-cookie renewal expectations
- protected profile route expectations
- protected shipment endpoint expectations
- unauthorized error handling expectations

## Verification story

- successful login returns token details with clear semantics
- valid refresh tokens renew access predictably through a persisted session record
- invalid credentials fail predictably
- protected access requires a valid bearer token

## Follow-ups

- broader refresh-token rotation policies
- production security hardening beyond the workshop scope