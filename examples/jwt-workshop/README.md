# JWT authentication workshop

This guide explains exactly how a developer should use **Intent by Augment** with this JWT workshop track: create a Workspace, load the correct Spec, ask the Coordinator for a plan, and then run the backend app locally.

## What this track is for

Use this track for backend-focused practice around a realistic auth slice:

- JWT login and bearer-token flows
- refresh-token follow-up behavior
- protected Express routes
- session inspection and revocation
- spec-first planning before implementation

The runnable app for this track lives in `starter-api/`.

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
I want to work through the JWT authentication workshop in this repository.
Start with examples/jwt-workshop/specs/living-spec.md.
Keep the work scoped to examples/jwt-workshop/starter-api.
Create a spec-first plan before implementation.
```

3. Create a new **Workspace**.
4. In the Workspace setup form, use settings like these:
   - **Name:** `JWT workshop`
   - **Location:** choose a local parent folder where you keep Intent workspaces
   - **Git repository:** select this cloned repository
   - **Description:** `JWT auth workshop backend practice`
5. Confirm creation.

### What you should see after the Workspace opens

According to the official Intent quickstart, your first session should open with:

- **Explorer** on the left
- **Coordinator** in the center
- **Spec** on the right

Intent also creates an isolated git branch/worktree for the Workspace so you can work without touching your main branch directly.

### What to do with the right-hand Spec panel

If you have never used Intent before, think of the right-hand **Spec** panel as the written plan for the work. In this repository, that plan starts from the workshop spec file that already exists in the repo.

Do this immediately after the Workspace opens:

1. In the Explorer, open `examples/jwt-workshop/specs/living-spec.md`.
2. Read it once from top to bottom so you understand the goal of the workshop.
3. Copy the content of that file.
4. Look at the right-hand panel:
   - if it already contains a draft Spec created by Intent, compare it with `living-spec.md`
   - if it is empty, incomplete, or too generic, paste the workshop spec content into the right-hand **Spec/Content** area
5. Keep that Spec visible while you work.

Your goal at this point is simple: make sure the right-hand Spec panel clearly describes the JWT workshop work before asking Intent to plan or change code.

## Step 5: Understand what is expected from the developer in Intent

If you are new to Intent, the key idea is this:

- a **spec** is the written plan for what should be built
- **spec-driven development** means you agree on that plan first, then let Intent help plan and implement against it

For this repository, here is exactly what you should do:

1. **Start with the written plan**
   - open `examples/jwt-workshop/specs/living-spec.md`
   - make sure the right-hand Spec panel contains that workshop goal in clear form
   - do not start by opening random source files

2. **Ask the Coordinator to explain the spec back to you**
   - in the center Coordinator panel, ask for a short summary of the current Spec
   - confirm the summary is about the JWT backend workshop, not the delivery dashboard track
   - if the summary is wrong, fix the Spec before continuing

3. **Ask for a plan before asking for code changes**
   - tell the Coordinator to create a plan limited to `examples/jwt-workshop/starter-api`
   - make sure the plan stays inside `examples/jwt-workshop/`
   - do not approve implementation until the plan matches the workshop spec

4. **Use the repo artifacts as supporting context**
   - `specs/living-spec.md` = the main source of truth
   - `prompts/coordinator-handoff.md` = an example of how to frame the work
   - `workspaces/isolated-workspace-exercise.md` = how to think about isolated work
   - `context/context-exercise.md` = questions to ask before editing
   - `waves/wave-plan.md` = how work can be delivered in increments
   - `pr/pr-summary.md` = what a review-ready summary looks like

5. **Only then move into implementation**
   - once the Spec and plan are correct, let Intent help with implementation
   - keep checking that changes stay inside the JWT backend scope
   - if Intent starts drifting into unrelated files or frontend work, stop and narrow the scope again

6. **Review before staging or merging**
   - open Intent's **Changes** view
   - inspect the diffs file by file
   - stage only the changes that belong to the JWT workshop task

### A good first Coordinator prompt after the Workspace opens

Paste this into the center Coordinator panel after you have reviewed or pasted the Spec on the right:

```text
Read the Spec on the right and summarize it in plain English.
Then create a backend-only plan limited to examples/jwt-workshop/starter-api.
Do not implement anything yet.
```

## Step 6: Follow the JWT workshop path in this repo

Use this order.

1. Start with `specs/living-spec.md`.
2. Review `prompts/coordinator-handoff.md`.
3. Read `workspaces/isolated-workspace-exercise.md`.
4. Continue with `context/context-exercise.md`.
5. Review `waves/wave-plan.md`.
6. Review `pr/pr-summary.md`.
7. Open `starter-api/README.md`.
8. Inspect `starter-api/src/` and `starter-api/prisma/`.
9. Run the backend app and tests locally.

## Step 7: Run the JWT backend locally

From the repo root:

```bash
cd examples/jwt-workshop/starter-api
npm install
```

This workshop repo already includes a local `.env` file in `starter-api/` with default values for local development.

Generate Prisma client, create/update the local SQLite schema, seed the database, and verify the app:

```bash
npm run db:generate
npm run db:migrate -- --name local_setup
npm run db:seed
npm run typecheck
npm test
```

Start the API server:

```bash
npm run dev
```

The default local API port in this track is `3001`.

## Step 8: Example Auggie CLI command from inside the repo

If you want to work from the terminal in the same repository, run Auggie from the repo root:

```bash
cd /path/to/augmentcode-intent
auggie "Read examples/jwt-workshop/specs/living-spec.md and create a backend-only implementation plan for examples/jwt-workshop/starter-api."
```

Or run Auggie directly from the JWT backend folder:

```bash
cd examples/jwt-workshop/starter-api
auggie "Explain the auth routes, validation flow, and test coverage in this workshop app before changing any code."
```

## Current implementation path

- Stack: Node.js + TypeScript + Express + Prisma + SQLite
- Current app: `starter-api/`
- Start with: `starter-api/README.md`
- Verify with: `npm run typecheck` and `npm test`
- Wave 6/7 state: session inspection/revocation, server-side shipment filtering, shipment detail routes, and CI-ready verification

## Folder guide

| Folder | Purpose |
| --- | --- |
| specs/ | Stable planning artifacts for auth work |
| prompts/ | Context-rich handoff prompts |
| workspaces/ | Isolation and execution practice |
| context/ | Questions to ask before editing |
| waves/ | Multi-step delivery planning |
| pr/ | Review-ready change summaries |
| starter-api/ | Runnable auth + shipment API with persistence, validation, and refresh-cookie session flow |

## If you want one good first prompt, use this

```text
I want to work through the JWT authentication workshop in this repo.
Start with examples/jwt-workshop/specs/living-spec.md.
Create a spec-first plan for the backend track only.
Keep scope inside examples/jwt-workshop/starter-api.
```