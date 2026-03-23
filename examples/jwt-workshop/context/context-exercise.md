# JWT context exercise

## Objective

List the exact areas you would inspect before editing an authentication feature.

## Likely context targets

- request handlers or route definitions
- token creation and verification utilities
- auth middleware or guard logic
- tests that cover successful and failed authentication

## Questions to answer

- Where would credential validation be implemented?
- How is the current user attached to a request?
- What error format should unauthorized responses follow?

## Expected outcome

You can name the likely edit targets and explain why each one matters before making a change.