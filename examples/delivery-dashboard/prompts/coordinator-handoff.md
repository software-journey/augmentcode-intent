# Delivery dashboard coordinator handoff

## Objective

Prepare a specialist to implement a focused dashboard slice that highlights delayed deliveries without broadening scope into unrelated UI work.

## Context to pass

- The repository is a learning workbook, so the change should stay easy to inspect.
- The slice covers summary cards plus a delayed-only filter on the shipment list.
- Defer route optimization, live refresh, and analytics expansion.

## Questions the implementor should answer first

- Where does the dashboard currently assemble shipment data?
- Which component or state layer should own the delayed filter?
- What loading and empty states already exist, if any?

## Expected output

- intended edit targets
- concise UI behavior summary
- verification evidence or planned checks
- follow-ups intentionally deferred