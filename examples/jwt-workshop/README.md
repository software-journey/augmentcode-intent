# JWT authentication workshop

Use this track for backend-leaning practice built around a realistic auth slice: planning a JWT login flow, protecting a user profile endpoint, extending the flow with refresh behavior, and turning the work into a reviewable delivery story.

## Focus areas

- login and token flows
- lightweight token lifecycle follow-ups
- spec-first planning for auth changes
- targeted context gathering around handlers, middleware, and tests
- concise handoffs between planner, implementor, and verifier roles

## Recommended learner path

1. Start with `specs/living-spec.md`.
2. Review `prompts/coordinator-handoff.md` before imagining implementation work.
3. Use `workspaces/isolated-workspace-exercise.md` to plan isolated execution.
4. Continue with `context/context-exercise.md`, `waves/wave-plan.md`, and `pr/pr-summary.md`.
5. Inspect `starter-api/README.md` and `starter-api/src/` to compare the spec with a minimal implementation and the Wave 4 refresh follow-up.
6. Revisit `specs/spec-seed.md` when you want a follow-up exercise.

## Episode-to-artifact map

| Episode | Artifact |
| --- | --- |
| 2 | `specs/living-spec.md` |
| 3 | `prompts/coordinator-handoff.md` |
| 4 | `workspaces/isolated-workspace-exercise.md` |
| 5 | `specs/spec-seed.md` |
| 6 | `context/context-exercise.md` |
| 7 | `waves/wave-plan.md` |
| 8 | `pr/pr-summary.md` |

## Current implementation path

- Stack: Node.js + TypeScript + Express
- Starter code: `starter-api/`
- Start with: `starter-api/README.md`
- Verify with: `npm run typecheck` and `npm test`
- Wave 4 increment: `POST /refresh` with in-memory refresh-token validation

## Folder guide

| Folder | Purpose |
| --- | --- |
| `specs/` | Stable planning artifacts for auth work |
| `prompts/` | Context-rich handoff prompts |
| `workspaces/` | Isolation and execution practice |
| `context/` | Questions to ask before editing |
| `waves/` | Multi-step delivery planning |
| `pr/` | Review-ready change summaries |
| `starter-api/` | Minimal runnable auth implementation with login, profile access, and refresh follow-up |