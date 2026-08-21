# Workflow: Start Skincare

## Purpose
Initialize and execute the skincare ecommerce project through controlled agent handoffs.

## Preconditions
- Read `.agents/agents.md`.
- Inspect current repository state.
- Inspect supplied reference video/materials.
- Create missing `production_artifacts/` and `docs/` directories.
- Do not start production implementation before the required upstream decisions are documented.

## Sequence
1. @pm creates/updates:
   - `production_artifacts/00_project/Project_Charter.md`
   - `production_artifacts/00_project/Backlog.md`
   - `docs/Risk_Register.md`
2. @ux produces:
   - `production_artifacts/01_research/UX_Requirements.md`
3. @brand produces:
   - `production_artifacts/02_brand/Brand_Strategy.md`
4. @ui produces:
   - `production_artifacts/03_ux_ui/UI_Handoff.md`
5. @commerce produces:
   - `production_artifacts/04_commerce/Commerce_Architecture.md`
6. @parallax defines:
   - `production_artifacts/06_motion_3d/Motion_Spec.md`
   - `Performance_Budget.md`
7. @imagegen prepares/creates approved assets after UI/brand/motion requirements are ready.
8. @frontend implements the application and GSAP/ScrollTrigger behavior.
9. @qa validates the integrated result.
10. @pm reviews acceptance evidence and decides whether the phase/release can advance.

## Reference-video rule
The supplied video is the visual interaction reference. Analyze it for:
- pacing
- section composition
- depth
- transition style
- product focus
- scroll choreography

Do not clone proprietary design, assets, copy or branding.

## Gate
Never skip upstream artifacts merely to start coding faster. If an artifact is unavailable, record the dependency and ask for the minimum missing input.

## Final handoff
Report concise summaries and artifact paths, not raw agent logs.
