# Delivery dashboard production-foundations app

This Wave 5 app turns the delivery dashboard spec into a routed, authenticated React + TypeScript + Vite workflow backed by the local JWT + shipment API.

## Implemented

- login route and protected dashboard route
- session bootstrap via refresh-token cookie
- React Query shipment loading from the local backend
- delayed-delivery summary card and delayed-only shipment filter
- shipment detail panel selection, dismissal, and priority-note review
- loading, error, and empty states for the authenticated view
- focused tests for login/session, shipment loading, detail interaction, and recovery states

## Setup

1. Copy `.env.example` to `.env` if you need a custom API base URL.
2. Start the backend in `../../jwt-workshop/starter-api/`.
3. Run `npm install`.
4. Run `npm run dev`.

## Deferred

- live updates and polling
- analytics and broader dashboard workflows
- route-level detail pages or deep-linking

## Commands

- `npm run dev`
- `npm run build`
- `npm test`

## Connect back to Wave 2

Start with `../specs/living-spec.md`, then inspect `src/` to see how the delayed-deliveries slice evolved into an authenticated dashboard.
