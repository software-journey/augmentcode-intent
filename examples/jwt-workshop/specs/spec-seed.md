# JWT workshop spec seed

## Next exercise

Add refresh-token support for the JWT workshop after the base login flow is understood.

## Why this is a good follow-up

It extends the auth story without changing the domain. Learners can practice scope control, token lifecycle thinking, and verifier expectations.

## Seed questions

- What should trigger a refresh request?
- Where should refresh-token storage or invalidation rules live?
- How will you verify expired, revoked, and valid refresh flows?

## Done when

- the refresh feature is scoped before implementation
- success and failure flows are explicit
- verification steps are written down before coding begins