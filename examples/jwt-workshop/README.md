# JWT authentication workshop

This guide explains exactly how a developer should use **Intent by Augment** with this JWT workshop track: install the tools, create a Space, start with the spec, and run the backend app locally.

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

## Step 4: Create a Space in Intent

Intent's docs use the word **Space** for the isolated working environment. In this repo you may also see older references to isolated workspaces or worktrees; for practical purposes here, start in an Intent Space.

### What to do in the app

1. Open **Intent**.
2. In the main prompt box, paste a project description like this:

```text
I want to work through the JWT authentication workshop in this repository.
Start with examples/jwt-workshop/specs/living-spec.md.
Keep the work scoped to examples/jwt-workshop/starter-api.
Create a spec-first plan before implementation.
```

3. Click **Create space**.
4. In the Space form, use settings like these:
   - **Name:** `JWT workshop`
   - **Location:** choose a local parent folder where you keep Intent spaces
   - **Git repository:** select this cloned repository
   - **Description:** `JWT auth workshop backend practice`
5. Confirm creation.

### What you should see after the Space opens

According to the official Intent quickstart, your first session should open with:

- **Explorer** on the left
- **Coordinator** in the center
- **Spec** on the right

Intent also creates an isolated git branch/worktree for the Space so you can work without touching your main branch directly.

## Step 5: Understand what is expected from the developer in Intent

For this repository, the expected workflow is:

1. **Start with the spec, not the code**
   - open `examples/jwt-workshop/specs/living-spec.md`
   - make sure the Coordinator's plan matches the track goal
2. **Keep scope inside the JWT workshop folder**
   - use `examples/jwt-workshop/`
   - focus implementation work in `examples/jwt-workshop/starter-api/`
3. **Use Intent to plan before changing code**
   - let the Coordinator draft or refine the spec
   - only then move into implementation
4. **Use the repo artifacts as context**
   - spec
   - handoff prompt
   - isolated-workspace exercise
   - context exercise
   - wave plan
   - PR summary
5. **Review generated diffs before staging or merging**
   - inspect changes in Intent's Changes view
   - stage only what belongs to the workshop task

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

## Current implementation state

- Stack: Node.js + TypeScript + Express + Prisma + SQLite
- Runnable app: `starter-api/`
- Verification commands: `npm run typecheck` and `npm test`
- Current Wave 6/7 state: session inspection/revocation, server-side shipment filtering, shipment detail routes, and CI-ready verification

## Folder guide

| Folder | Purpose |
| --- | --- |
| `specs/` | Stable planning artifacts for auth work |
| `prompts/` | Context-rich handoff prompts |
| `workspaces/` | Isolation and execution practice |
| `context/` | Questions to ask before editing |
| `waves/` | Multi-step delivery planning |
| `pr/` | Review-ready change summaries |
| `starter-api/` | Runnable auth + shipment API with persistence, validation, and refresh-cookie session flow |

## If you want one good first prompt, use this

```text
I want to work through the JWT authentication workshop in this repo.
Start with examples/jwt-workshop/specs/living-spec.md.
Create a spec-first plan for the backend track only.
Keep scope inside examples/jwt-workshop/starter-api.
```