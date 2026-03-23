# Delivery dashboard routed operations app

This Wave 6/7 app turns the delivery dashboard spec into a routed, authenticated React + TypeScript + Vite workflow backed by the local JWT + shipment API.

## Implemented

- login route and protected dashboard route
- session bootstrap via refresh-token cookie
- React Query shipment loading from the local backend
- delayed-delivery summary card and server-side delayed-only shipment filter
- route-based shipment detail loading, dismissal, and priority-note review
- expired-session handling that returns users to login with guidance
- loading, error, and empty states for the authenticated view
- focused tests for login/session, shipment loading, detail interaction, and recovery states

## Setup

1. Copy `.env.example` to `.env` if you need a custom API base URL.
2. Start the backend in `../../jwt-workshop/starter-api/`.
3. Run `npm install`.
4. Run `npm run dev`.

## Route highlights

- `/login` for session entry
- `/` for the shipment list dashboard
- `/shipments/:shipmentId` for route-driven shipment detail review
- `?filter=delayed` to keep the delayed-only operator view in the URL

## Deferred

- live updates and polling
- analytics and broader dashboard workflows
- route-level detail pages or deep-linking

## Commands

- `npm run dev`
- `npm run build`
- `npm test`

## Connect back to Wave 2

Start with `../specs/living-spec.md`, then inspect `src/` to see how the delayed-deliveries slice evolved into a routed, session-aware dashboard.
