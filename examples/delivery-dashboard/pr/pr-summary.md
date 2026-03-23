# Delivery dashboard PR summary example

## Summary

This change packages a Wave 6/7 dashboard increment for review: routed login, authenticated shipment loading, URL-driven shipment detail review, expired-session recovery, and explicit UI-state plus CI verification.

## Scope of the change

- login and protected-route expectations
- delayed-delivery summary card expectations
- delayed-only list filtering expectations
- URL-driven shipment detail behavior
- loading, error, and empty-state planning

## Verification story

- operators can authenticate and reach the protected dashboard predictably
- operators can identify delayed work quickly
- applying the filter changes the visible shipment set predictably
- selecting or deep-linking to a shipment reveals the essential operational details predictably
- loading, error, and empty states remain understandable

## Follow-ups

- broader write workflows or mutation flows
- analytics and trend reporting beyond the current slice