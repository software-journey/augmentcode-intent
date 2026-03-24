# Augmentcode Intent

Learning companion repository for the 8-part dev.to series on building with Augment Code and Intent.

## Start here if you are new to Intent

This repository is designed to be used inside **Intent by Augment**.

If you have never used Intent before, the simplest mental model is:

- **Intent** is the desktop app where you work
- a **Workspace** is your isolated working environment for one task or learning session
- the **Coordinator** is the planning agent in the center panel
- the **Spec** on the right is the written plan for what should be built

### What spec-driven development means here

In this repository, **spec-driven development** means:

1. start with a written plan
2. make sure the plan is correct
3. ask Intent to summarize and plan the work
4. only then move into implementation

So the expected order is: **Spec first, code second**.

## Step 1: Install Intent

Download **Intent by Augment** from the official product page:

- `https://www.augmentcode.com/product/intent`

As of the current public beta documentation, Intent is available for **macOS**.

## Step 2: Install Auggie CLI

Intent's docs say you should also install **Auggie CLI** for AI agent features.

Requirements from the official docs:

- Node.js `22+`
- a modern shell such as `zsh`, `bash`, or `fish`

Install Auggie globally:

```bash
npm install -g @augmentcode/auggie
```

Then log in:

```bash
auggie login
```

Official docs used for this README rewrite:

- `https://docs.augmentcode.com/intent/overview`
- `https://docs.augmentcode.com/cli/setup-auggie/install-auggie-cli`
- `https://docs.augmentcode.com/cli/overview`

## Step 3: Clone this repository

Clone the repo and move into it:

```bash
git clone git@github.com:software-journey/augmentcode-intent.git
cd augmentcode-intent
```

If you use HTTPS instead of SSH, use the HTTPS clone URL for the same repository.

## Step 4: Create a Workspace in Intent

### What to do in the app

1. Open **Intent**.
2. In the main prompt box, paste a beginner-friendly project description like this:

```text
I want to learn how to use Intent with the augmentcode-intent repository.
Help me choose one practice track, initialize the correct Spec, and create a plan before any implementation.
Do not change code yet.
```

3. Create a new **Workspace** for this repository.
4. In the Workspace setup form, use values like these:
   - **Name:** `Augmentcode Intent learning`
   - **Location:** choose a local parent folder where you keep Intent workspaces
   - **Git repository:** select this cloned repository
   - **Description:** `Learning Intent with the example tracks in this repo`
5. Confirm creation.

### What you should see after the Workspace opens

According to the official Intent quickstart, your first session should open with:

- **Explorer** on the left
- **Coordinator** in the center
- **Spec** on the right

Intent also creates an isolated git branch/worktree for the Workspace so you can work without touching your main branch directly.

## Step 5: Choose one practice track before doing anything else

This repository has two practice tracks. Choose **one** first.

### Option A: JWT authentication workshop

Choose `examples/jwt-workshop/` if you want backend-focused practice around:

- JWT login and bearer-token flows
- refresh-token behavior
- protected Express routes
- session inspection and revocation

Track-specific instructions live in:

- `examples/jwt-workshop/README.md`

### Option B: Delivery dashboard

Choose `examples/delivery-dashboard/` if you want product and UI-focused practice around:

- dashboard feature slicing
- routed detail workflows
- authenticated UI behavior
- reviewable spec-to-PR delivery

Track-specific instructions live in:

- `examples/delivery-dashboard/README.md`

## Step 6: Put the correct spec into the right-hand Spec panel

If you have never used Intent before, think of the right-hand **Spec** panel as the written plan for your current task.

After choosing your track, do this immediately:

### If you chose the JWT workshop

1. In the Explorer, open `examples/jwt-workshop/specs/living-spec.md`.
2. Read it once from top to bottom.
3. Copy the content of that file.
4. Look at the right-hand **Spec/Content** area:
   - if it already contains a good draft that matches the JWT workshop, keep it
   - if it is empty, incomplete, or too generic, paste in the content from `living-spec.md`

### If you chose the delivery dashboard

1. In the Explorer, open `examples/delivery-dashboard/specs/living-spec.md`.
2. Read it once from top to bottom.
3. Copy the content of that file.
4. Look at the right-hand **Spec/Content** area:
   - if it already contains a good draft that matches the dashboard track, keep it
   - if it is empty, incomplete, or too generic, paste in the content from `living-spec.md`

Your goal is simple: make sure the right-hand Spec clearly describes the track you chose before asking Intent to plan or change code.

## Step 7: Ask the Coordinator for a plan, not code

Once the Spec is correct, use the center **Coordinator** panel.

Paste a prompt like this:

```text
Read the Spec on the right and summarize it in plain English.
Then create a plan for only the track I selected.
Do not implement anything yet.
```

What you should check before continuing:

1. the summary matches the track you chose
2. the plan stays inside that track's folder
3. the plan does not jump into unrelated files
4. the plan is clear enough that you could approve it confidently

If the plan drifts, fix the Spec or restate the scope before moving on.

## Step 8: Continue into the track README

Once your Workspace is initialized and the Spec is correct, continue into the matching track README:

- JWT workshop: `examples/jwt-workshop/README.md`
- Delivery dashboard: `examples/delivery-dashboard/README.md`

Those track READMEs contain the more specific, track-by-track instructions.

## Repository purpose

This repository is the hands-on companion for the series: [Augmentcode Intent](https://dev.to/wvanheemstra/series/37310)

Wave 1 established the learning foundation. Wave 2 added mirrored, track-specific worked artifacts. Wave 3 added small starter implementations for both tracks. Wave 4 extended those starters with a realistic second-slice increment per track. Wave 5 turned both tracks into production-style local applications, Wave 6 added routed operator workflows and stronger session behavior, and Wave 7 added delivery-readiness polish through repo automation and clearer run/verification guidance.

Treat the repository as a study workbook: the articles explain the concepts, and this repo gives you a place to inspect examples, copy templates, and build your own iterations.

## Repository map

| Area | Purpose |
| --- | --- |
| `episodes/` | Per-episode guides and placeholder learning artifacts |
| `examples/` | Two practice tracks used across the series |
| `templates/` | Reusable specs, prompts, verifier checklists, and PR summary scaffolds |

## Episode navigation

| Episode | Focus | Primary repo location | Concrete artifact(s) |
| --- | --- | --- | --- |
| 1 | Repo overview / learning path | `episodes/01-welcome/` | `episodes/01-welcome/README.md` |
| 2 | Living spec example/template | `episodes/02-living-spec/` | `episodes/02-living-spec/living-spec-template.md`, `templates/specs/episode-spec-template.md` |
| 3 | Coordinator/specialist handoff example | `episodes/03-coordinator-specialists/` | `episodes/03-coordinator-specialists/handoff-example.md`, `templates/prompts/context-prompt-template.md` |
| 4 | Git worktree / isolated workspace practice guide | `episodes/04-isolated-workspaces/` | `episodes/04-isolated-workspaces/worktree-practice-guide.md` |
| 5 | Spec-driven development exercise/spec seed | `episodes/05-spec-driven-development/` | `episodes/05-spec-driven-development/spec-seed.md` |
| 6 | Context-oriented prompt/context exercise | `episodes/06-context-engine/` | `episodes/06-context-engine/context-exercise.md`, `templates/prompts/context-prompt-template.md` |
| 7 | Multi-agent orchestration wave example | `episodes/07-multi-agent-orchestration/` | `episodes/07-multi-agent-orchestration/orchestration-wave.md`, `templates/verifier-checklists/review-checklist.md` |
| 8 | Full spec-to-PR walkthrough | `episodes/08-spec-to-pr/` | `episodes/08-spec-to-pr/walkthrough-outline.md`, `templates/pr-summaries/pr-summary-template.md` |

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

## Current implementation tracks

| Track | Stack | Current app location | Verification |
| --- | --- | --- | --- |
| JWT workshop | Node.js + TypeScript + Express | `examples/jwt-workshop/starter-api/` | `npm run typecheck` and `npm test` |
| Delivery dashboard | React + TypeScript + Vite | `examples/delivery-dashboard/starter-app/` | `npm test` and `npm run build` |

### Wave 6 / Wave 7 current state

- JWT workshop: SQLite + Prisma persistence, hashed passwords, refresh-cookie auth flow, session inspection/revocation, filtered shipment APIs, and shipment detail routes
- Delivery dashboard: routed login flow, protected app shell, React Query data loading, route-based shipment detail views, and expired-session recovery UI
- Repo automation: GitHub Actions CI for backend/frontend verification

## Recommended reading and practice order

### First pass: understand the workflow

1. Episode 1 — orient yourself to the repo and both tracks.
2. Episode 2 — learn the living spec pattern.
3. Episode 3 — understand coordinator/specialist handoffs.
4. Episode 4 — practice isolated workspace setup before larger exercises.

### Second pass: apply the workflow on one track

1. Choose **one** practice track.
2. Use the matching Wave 2 track artifact for each episode from the table above.
3. Continue through Episodes 5-8 while staying on the same track.
4. Inspect the matching starter implementation once the planning flow makes sense.
5. Compare the Wave 6/7 implementation against the original Wave 2 spec and PR summary to see how a learning slice matures.
6. Revisit the second track after finishing the first if you want repetition in a different domain.

## Suggested learner workflow

- Start in this root README if you are new to Intent.
- Then continue into one track README, not both at once.
- Start with the Spec before you review code.
- Copy from `templates/` instead of writing from scratch.
- Use the starter-to-production progression to compare planning artifacts against real code.
- Expand the apps only after you understand what each wave intentionally defers.

## Current state of the repository

The repository is intentionally learning-first. It now provides:

- a navigable course structure
- episode-level placeholder artifacts
- reusable templates for future waves
- two example tracks with concrete worked materials for Episodes 2-8
- two runnable implementations that make the track scenarios inspectable and verifiable
- a concrete Wave 5 full-stack connection between the auth and dashboard tracks
- route-driven and session-aware Wave 6 workflows across both tracks
- a Wave 7 CI baseline that replays the main backend/frontend verification commands automatically

Broader deployment, observability, and enterprise-hardening concerns are still intentionally deferred to later waves.