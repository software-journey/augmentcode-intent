# Delivery dashboard

Use this track for product and dashboard-oriented practice built around a realistic feature slice: surfacing delayed deliveries, improving operator visibility, extending the list with shipment detail review, and then maturing it into an authenticated product-style dashboard.

## Focus areas

- dashboard feature slicing
- focused operator detail workflows with authenticated data
- specialist coordination for UX, implementation, and verification
- context gathering around UI states, data sources, and acceptance criteria
- spec-to-PR storytelling for incremental product work

## Recommended learner path

1. Start with `specs/living-spec.md`.
2. Review `prompts/coordinator-handoff.md` to see how a planner would package the change.
3. Use `workspaces/isolated-workspace-exercise.md` before imagining concurrent work.
4. Continue with `context/context-exercise.md`, `waves/wave-plan.md`, and `pr/pr-summary.md`.
5. Inspect `starter-app/README.md` and `starter-app/src/` to compare the spec with the Wave 5 routed, authenticated implementation.
6. Use `specs/spec-seed.md` as the next dashboard slice once the first walkthrough feels clear.

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

- Stack: React + TypeScript + Vite
- Current app: `starter-app/`
- Start with: `starter-app/README.md`
- Verify with: `npm test` and `npm run build`
- Wave 5 state: login route, protected dashboard shell, React Query shipment loading, API-backed detail workflow

## Folder guide

| Folder | Purpose |
| --- | --- |
| `specs/` | Planning artifacts for dashboard slices |
| `prompts/` | Context-rich role handoffs |
| `workspaces/` | Isolated execution exercises |
| `context/` | Pre-edit discovery exercises |
| `waves/` | Multi-step delivery plans |
| `pr/` | Review-ready summaries |
| `starter-app/` | Runnable dashboard implementation with routed auth, protected views, and API-backed shipment review |