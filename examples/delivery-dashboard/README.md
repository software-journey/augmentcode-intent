# Delivery dashboard

This guide explains exactly how a developer should use **Intent by Augment** with the delivery dashboard track: create a Workspace, load the correct Spec, ask the Coordinator for a plan, and then run the frontend app locally.

## What this track is for

Use this track for product and dashboard-focused practice around a realistic feature slice:

- surfacing delayed deliveries
- improving operator visibility
- reviewing shipment details through routes
- working with authenticated frontend behavior
- planning dashboard work before implementation

The runnable app for this track lives in `starter-app/`.

## Step 1: Install Intent

Download **Intent by Augment** from the official product page:

- `https://www.augmentcode.com/product/intent`

As of the current public beta docs, Intent is available for **macOS**.

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
2. In the main prompt box, paste a project description like this:

```text
I want to work through the delivery dashboard track in this repository.
Start with examples/delivery-dashboard/specs/living-spec.md.
Keep the work scoped to examples/delivery-dashboard/starter-app.
Create a spec-first plan before implementation.
```

3. Create a new **Workspace**.
4. In the Workspace setup form, use values like these:
   - **Name:** `Delivery dashboard`
   - **Location:** choose a local parent folder where you keep Intent workspaces
   - **Git repository:** select this cloned repository
   - **Description:** `Dashboard track with routed shipment detail workflow`
5. Confirm creation.

### What you should see after the Workspace opens

According to the official Intent quickstart, your first session should open with:

- **Explorer** on the left
- **Coordinator** in the center
- **Spec** on the right

Intent also creates an isolated git branch/worktree for the Workspace so you can work without touching your main branch directly.

### What to do with the right-hand Spec panel

If you have never used Intent before, think of the right-hand **Spec** panel as the written plan for the work. In this repository, that plan starts from the dashboard spec file that already exists in the repo.

Do this immediately after the Workspace opens:

1. In the Explorer, open `examples/delivery-dashboard/specs/living-spec.md`.
2. Read it once from top to bottom so you understand the goal of the dashboard track.
3. Copy the content of that file.
4. Look at the right-hand panel:
   - if it already contains a draft Spec created by Intent, compare it with `living-spec.md`
   - if it is empty, incomplete, or too generic, paste the dashboard spec content into the right-hand **Spec/Content** area
5. Keep that Spec visible while you work.

Your goal at this point is simple: make sure the right-hand Spec panel clearly describes the delivery dashboard work before asking Intent to plan or change code.

## Step 5: Understand what is expected from the developer in Intent

If you are new to Intent, the key idea is this:

- a **spec** is the written plan for what should be built
- **spec-driven development** means you agree on that plan first, then let Intent help plan and implement against it

For this repository, here is exactly what you should do:

1. **Start with the written plan**
   - open `examples/delivery-dashboard/specs/living-spec.md`
   - make sure the right-hand Spec panel contains that dashboard goal in clear form
   - do not start by opening random source files

2. **Ask the Coordinator to explain the spec back to you**
   - in the center Coordinator panel, ask for a short summary of the current Spec
   - confirm the summary is about the delivery dashboard track, not the JWT backend track
   - if the summary is wrong, fix the Spec before continuing

3. **Ask for a plan before asking for code changes**
   - tell the Coordinator to create a plan limited to `examples/delivery-dashboard/starter-app`
   - make sure the plan stays inside `examples/delivery-dashboard/`
   - do not approve implementation until the plan matches the dashboard spec

4. **Use the repo artifacts as supporting context**
   - `specs/living-spec.md` = the main source of truth
   - `prompts/coordinator-handoff.md` = an example of how to frame the work
   - `workspaces/isolated-workspace-exercise.md` = how to think about isolated work
   - `context/context-exercise.md` = questions to ask before editing
   - `waves/wave-plan.md` = how work can be delivered in increments
   - `pr/pr-summary.md` = what a review-ready summary looks like

5. **Only then move into implementation**
   - once the Spec and plan are correct, let Intent help with implementation
   - keep checking that changes stay inside the dashboard scope
   - if Intent starts drifting into unrelated backend files, stop and narrow the scope again

6. **Review before staging or merging**
   - open Intent's **Changes** view
   - inspect the diffs file by file
   - stage only the changes that belong to the dashboard task

### A good first Coordinator prompt after the Workspace opens

Paste this into the center Coordinator panel after you have reviewed or pasted the Spec on the right:

```text
Read the Spec on the right and summarize it in plain English.
Then create a frontend-only plan limited to examples/delivery-dashboard/starter-app.
Do not implement anything yet.
```

## Step 6: Follow the delivery dashboard path in this repo

Use this order.

1. Start with `specs/living-spec.md`.
2. Review `prompts/coordinator-handoff.md`.
3. Read `workspaces/isolated-workspace-exercise.md`.
4. Continue with `context/context-exercise.md`.
5. Review `waves/wave-plan.md`.
6. Review `pr/pr-summary.md`.
7. Open `starter-app/README.md`.
8. Inspect `starter-app/src/`.
9. Run the frontend app and tests locally.

## Step 7: Run the delivery dashboard locally

This frontend track depends on the local JWT backend API.

### Terminal 1: start the backend API

From the repo root:

```bash
cd examples/jwt-workshop/starter-api
npm install
npm run db:generate
npm run db:migrate -- --name local_setup
npm run db:seed
npm run dev
```

### Terminal 2: start the dashboard app

From the repo root:

```bash
cd examples/delivery-dashboard/starter-app
npm install
npm run dev
```

### Verify the frontend track

From `examples/delivery-dashboard/starter-app/`:

```bash
npm test
npm run build
```

## Step 8: Example Auggie CLI command from inside the repo

If you want to work from the terminal in the same repository, run Auggie from the repo root:

```bash
cd /path/to/augmentcode-intent
auggie "Read examples/delivery-dashboard/specs/living-spec.md and create a frontend-only implementation plan for examples/delivery-dashboard/starter-app."
```

Or run Auggie directly from the dashboard app folder:

```bash
cd examples/delivery-dashboard/starter-app
auggie "Explain the routes, session behavior, loading states, and test coverage in this dashboard app before changing any code."
```

## Current implementation path

- Stack: React + TypeScript + Vite
- Current app: `starter-app/`
- Start with: `starter-app/README.md`
- Verify with: `npm test` and `npm run build`
- Wave 6/7 state: URL-driven shipment detail routes, server-side delayed filtering, expired-session recovery, and CI-backed verification

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

## If you want one good first prompt, use this

```text
I want to work through the delivery dashboard track in this repo.
Start with examples/delivery-dashboard/specs/living-spec.md.
Create a spec-first plan for the frontend track only.
Keep scope inside examples/delivery-dashboard/starter-app.
```