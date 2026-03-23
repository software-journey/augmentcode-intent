# JWT coordinator handoff

## Objective

Prepare an implementor to add the first authentication slice without overbuilding the solution.

## Context to pass

- The repository is in learning mode, so prioritize clarity over completeness.
- The current slice covers `POST /login` and protected access to `GET /me`.
- Stay within the living spec and defer refresh tokens, signup, and password resets.

## Questions the implementor should answer first

- Where would request validation likely live?
- Which component should issue and verify tokens?
- What is the minimal middleware behavior needed for the protected route?

## Expected output

- changed files or intended edit targets
- short implementation summary
- verification evidence or planned checks
- follow-ups intentionally deferred