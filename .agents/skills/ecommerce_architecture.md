# Skill: Ecommerce Architecture for Skincare

## Objective
Define the commerce model and technical boundaries required for a production-ready skincare store.

## Inputs
- `production_artifacts/00_project/Project_Charter.md`
- `production_artifacts/01_research/UX_Requirements.md`
- `production_artifacts/03_ux_ui/UI_Handoff.md`

## Define
- product/catalog model
- product categories
- variants
- price and availability
- ingredients and product attributes
- product media
- routine/bundle relationships if approved
- cart
- checkout
- customer/account boundaries
- search/filter/sort
- inventory boundaries
- analytics events
- SEO boundaries
- API/data contracts
- error/loading/empty states

## Separation rule
Business state must remain independent from GSAP/parallax state.
Animation may visually respond to product state but must never control:
- variant selection
- inventory
- cart quantity
- checkout
- payment
- order state

## Truthfulness
Do not invent medical, clinical, dermatological or efficacy claims. Any such content must come from approved product data or approved content.

## Deliverable
Write:
`production_artifacts/04_commerce/Commerce_Architecture.md`

Include assumptions, interfaces, risks and handoff notes.
