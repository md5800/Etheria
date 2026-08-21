# Skill: 3D / Parallax Experience Specification

## Objective
Specify a cinematic skincare scroll experience inspired by the supplied video, implemented with the lowest-complexity technique that achieves the intended perception.

## Principle
Prefer:
1. static/CSS
2. micro-motion
3. 2D GSAP
4. 2.5D layered parallax
5. true 3D/WebGL

Use a more complex technique only when it creates a meaningful user-visible benefit.

## Section classification
Classify every major section as:
STATIC / MICRO-MOTION / 2D GSAP / 2.5D PARALLAX / TRUE 3D / WEBGL.

## Depth model
Use:
- Z0 distant background
- Z1 environment/atmosphere
- Z2 typography
- Z3 person/subject
- Z4 skincare product
- Z5 foreground/decorative elements
- Z6 UI overlay

Specify relative translate, scale, rotation, blur and opacity behavior.

## Scroll storyboard
For every signature sequence define:
- ENTRY
- BUILD
- PEAK
- EXIT

The reference video should be analyzed for pacing and composition, but implementation must remain original and usable.

## Skincare storytelling
Prioritize visual sequences such as:
- ingredient/environment reveal
- product emergence
- texture/detail emphasis
- routine storytelling
- product-to-commerce transition

Do not let animation obscure product information or CTAs.

## Mobile
- Desktop: full justified experience
- Tablet: reduced depth and fewer pinned sequences
- Mobile: simplified composition and shorter timelines
- Reduced motion/low power: static or subtle equivalent

## Performance budget
Define budgets for:
- image/video weight
- image sequences
- DOM layers
- simultaneous animated elements
- optional 3D model/texture weight
- GPU-intensive effects

Give signature effects first claim on the budget.

## Developer spec
For each effect record:
Element / trigger / timeline / start / end / duration / ease / scrub / pin / transforms / breakpoints / reduced-motion / asset dependency / performance note.

## Deliverable
Write:
`production_artifacts/06_motion_3d/Motion_Spec.md`
and, when needed:
`Asset_Request.md`
`Performance_Budget.md`

## Acceptance
Every heavy effect must have:
- user-value justification
- mobile fallback
- reduced-motion behavior
- performance consideration
