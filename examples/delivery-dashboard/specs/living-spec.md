# Delivery dashboard living spec

## Goal

Plan a dashboard slice that helps operators quickly spot delayed deliveries, understand which shipments need immediate attention, and inspect one shipment in more detail when deciding what to do next.

## Scenario

You are practicing how to turn a product idea into a clear spec before implementation. The imagined dashboard shows summary cards, a filtered list for delayed deliveries, and a shipment detail panel opened from the list.

## Scope

- In scope: delayed-delivery summary cards, a delayed-only filter, shipment detail selection, empty and loading states, verification notes
- Out of scope: real-time updates, route optimization, driver messaging, full analytics views, route-level detail pages

## Acceptance criteria

- operators can see the count of delayed deliveries at a glance
- a delayed-only filter narrows the visible shipment list
- selecting a shipment opens a focused detail view with the essential operational context
- empty and loading states are explicitly planned
- the slice is small enough to explain in one PR summary

## Verification notes

- identify the dashboard page, data access layer, filter state, and detail-panel state areas you would inspect
- describe one happy path and one empty-state path
- list what should be tested when implementation exists

## Current implementation link

Inspect `../starter-app/README.md` and `../starter-app/src/` to see this spec translated into a Wave 5 React + TypeScript + Vite app with routed auth and API-backed shipment data.