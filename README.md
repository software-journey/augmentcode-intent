# Augmentcode Intent

Learning companion repository for the 8-part dev.to series on building with Augment Code and Intent.

## Purpose

This repository is the hands-on workspace for the series: [Augmentcode Intent](https://dev.to/wvanheemstra/series/37310)

Wave 1 established the learning foundation. Wave 2 added mirrored, track-specific worked artifacts. Wave 3 added small starter implementations for both tracks. Wave 4 now extends those starters with one realistic second-slice increment per track so learners can see how the workflow evolves beyond the first implementation pass.

## How to use this repository with the article series

1. Read the matching dev.to episode.
2. Open the corresponding folder in `episodes/`.
3. Review the concrete artifact for that episode.
4. Reuse or adapt a template from `templates/`.
5. Apply the episode's ideas to one of the practice tracks in `examples/`.

For Episodes 2-8, each practice track now contains a concrete artifact chain you can follow from living spec to PR summary, plus a starter implementation you can inspect, extend, and verify.

Treat the repository as a study workbook: the articles explain the concepts, and this repo gives you a place to inspect examples, copy templates, and build your own iterations.

## Practice tracks

### JWT authentication workshop

Use `examples/jwt-workshop/` if you want a backend-leaning track focused on:

- living specs for auth flows
- prompt handoffs for implementation and verification
- context gathering around routes, tokens, and middleware
- spec-to-PR style delivery for a small but realistic workflow

### Delivery dashboard

Use `examples/delivery-dashboard/` if you want a product/UI-oriented track focused on:

- planning features for dashboard slices
- coordinating specialists for UX, implementation, and verification
- working in isolated workspaces for concurrent feature work
- turning a spec into a reviewable PR narrative

## Repository map

| Area | Purpose |
| --- | --- |
| episodes/ | Per-episode guides and placeholder learning artifacts |
| examples/ | Two practice tracks used across the series |
| templates/ | Reusable specs, prompts, verifier checklists, and PR summary scaffolds |

## Episode navigation

| Episode | Focus | Primary repo location | Concrete artifact(s) |
| --- | --- | --- | --- |
| 1 | Repo overview / learning path | episodes/01-welcome/ | episodes/01-welcome/README.md |
| 2 | Living spec example/template | episodes/02-living-spec/ | episodes/02-living-spec/living-spec-template.md, templates/specs/episode-spec-template.md |
| 3 | Coordinator/specialist handoff example | episodes/03-coordinator-specialists/ | episodes/03-coordinator-specialists/handoff-example.md, templates/prompts/context-prompt-template.md |
| 4 | Git worktree / isolated workspace practice guide | episodes/04-isolated-workspaces/ | episodes/04-isolated-workspaces/worktree-practice-guide.md |
| 5 | Spec-driven development exercise/spec seed | episodes/05-spec-driven-development/ | episodes/05-spec-driven-development/spec-seed.md |
| 6 | Context-oriented prompt/context exercise | episodes/06-context-engine/ | episodes/06-context-engine/context-exercise.md, templates/prompts/context-prompt-template.md |
| 7 | Multi-agent orchestration wave example | episodes/07-multi-agent-orchestration/ | episodes/07-multi-agent-orchestration/orchestration-wave.md, templates/verifier-checklists/review-checklist.md |
| 8 | Full spec-to-PR walkthrough | episodes/08-spec-to-pr/ | episodes/08-spec-to-pr/walkthrough-outline.md, templates/pr-summaries/pr-summary-template.md |

## Wave 2 practice-track map

| Episode | JWT workshop artifact | Delivery dashboard artifact |
| --- | --- | --- |
| 2 | `examples/jwt-workshop/specs/living-spec.md` | `examples/delivery-dashboard/specs/living-spec.md` |
| 3 | `examples/jwt-workshop/prompts/coordinator-handoff.md` | `examples/delivery-dashboard/prompts/coordinator-handoff.md` |
| 4 | `examples/jwt-workshop/workspaces/isolated-workspace-exercise.md` | `examples/delivery-dashboard/workspaces/isolated-workspace-exercise.md` |
| 5 | `examples/jwt-workshop/specs/spec-seed.md` | `examples/delivery-dashboard/specs/spec-seed.md` |
| 6 | `examples/jwt-workshop/context/context-exercise.md` | `examples/delivery-dashboard/context/context-exercise.md` |
| 7 | `examples/jwt-workshop/waves/wave-plan.md` | `examples/delivery-dashboard/waves/wave-plan.md` |
| 8 | `examples/jwt-workshop/pr/pr-summary.md` | `examples/delivery-dashboard/pr/pr-summary.md` |

## Current starter implementations

| Track | Stack | Starter location | Verification |
| --- | --- | --- | --- |
| JWT workshop | Node.js + TypeScript + Express | `examples/jwt-workshop/starter-api/` | `npm run typecheck` and `npm test` |
| Delivery dashboard | React + TypeScript + Vite | `examples/delivery-dashboard/starter-app/` | `npm test` and `npm run build` |

### Wave 4 second-slice increments

- JWT workshop: `POST /refresh` with in-memory refresh-token validation
- Delivery dashboard: shipment detail panel opened from the shipment list

## Recommended reading and practice order

### First pass: understand the workflow

1. Episode 1 — orient yourself to the repo and both tracks.
2. Episode 2 — learn the living spec pattern.
3. Episode 3 — understand coordinator/specialist handoffs.
4. Episode 4 — practice isolated workspace setup before larger exercises.

### Second pass: apply the workflow on one track

1. Choose **one** practice track:

- `examples/jwt-workshop/` for backend/auth work
- `examples/delivery-dashboard/` for feature/dashboard work

1. Use the matching Wave 2 track artifact for each episode from the table above.
2. Continue through Episodes 5-8 while staying on the same track.
3. Inspect the matching starter implementation once the planning flow makes sense.
4. Compare the Wave 4 second-slice increment against the original Wave 2 spec and PR summary.
5. Revisit the second track after finishing the first if you want repetition in a different domain.

## Suggested learner workflow

- Start in `episodes/` for episode-specific guidance.
- Copy from `templates/` instead of writing from scratch.
- Keep your own working notes or specs next to the example track you choose.
- Use the starter slices and Wave 4 follow-ups to compare the planning artifacts against real code.
- Expand the starter implementations only after you understand what each wave intentionally defers.

## Current state of the repository

The repository is still intentionally learning-first. It now provides:

- a navigable course structure
- episode-level placeholder artifacts
- reusable templates for future waves
- two example tracks with concrete worked materials for Episodes 2-8
- two small starter implementations that make the track scenarios inspectable and testable
- two second-slice follow-ups that show how each starter evolves in a controlled way

Full production-style JWT and dashboard implementations are intentionally deferred to later waves.