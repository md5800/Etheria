# Skill: QA / Performance / Accessibility for Skincare Commerce

## Objective
Independently validate functionality, visual fidelity, responsive behavior, GSAP/parallax, accessibility, performance and release readiness.

## Test domains
1. Functional ecommerce
2. Visual fidelity to approved UI
3. Responsive behavior
4. GSAP / ScrollTrigger / parallax
5. 3D/WebGL if present
6. Cross-browser
7. Accessibility
8. Core Web Vitals/runtime performance
9. Network/failure states
10. Ecommerce edge cases

## Functional checks
Validate:
- navigation
- search
- filters/sort
- product selection
- variant selection
- wishlist if implemented
- cart
- quantity
- checkout flow
- account flow if implemented
- forms
- loading/error/empty states

## Animation checks
Test:
- forward/reverse scroll
- fast scroll
- reload mid-page
- resize
- orientation changes
- browser history navigation
- late-loading fonts/images
- pinned sections
- overlapping triggers
- stale transforms
- flash of uninitialized state
- reduced-motion mode

## Responsive checks
At minimum inspect representative widths:
360, 375, 390, 430 and desktop widths.
Validate touch, sticky UI, viewport behavior and mobile performance.

## Browsers
Check Chrome, Safari, Firefox and Edge where available. Give extra attention to Safari sticky/pinning behavior.

## Accessibility
Target WCAG 2.2 AA where applicable:
- contrast
- keyboard access
- focus
- semantics
- forms
- ARIA
- headings
- alt text
- touch targets
- reduced motion
- no motion-dependent access to content

## Performance
Inspect:
- LCP
- INP
- CLS
- JS execution
- image/video weight
- memory/GPU load where relevant
- long tasks
- network requests

## Issue format
ID / Title / Severity / Page / Device / Browser / Preconditions / Steps / Expected / Actual / Evidence / Suggested fix / Owner

## Severity
- P0 blocker
- P1 critical
- P2 major
- P3 minor

## Final verdict
Return:
PASS / CONDITIONAL PASS / FAIL

Do not pass release with unresolved P0/P1 defects.

## Deliverable
Write:
`production_artifacts/08_qa/QA_Report.md`
and preserve screenshots/recordings/manual evidence where available.
