# Workflow: Release Check

## Purpose
Perform the final coordinated release gate for the skincare ecommerce experience.

## Preconditions
- implementation is complete enough to test;
- approved UI, commerce and motion artifacts exist;
- QA has access to the running build.

## Sequence
1. @frontend runs tests, type checks, lint and production build.
2. @qa performs:
   - functional checks
   - responsive checks
   - animation/parallax checks
   - accessibility checks
   - cross-browser checks
   - performance checks
   - failure/edge-state checks
3. Verify supplied reference-video-inspired visual behavior against the approved Motion Spec, not against an assumption of pixel-perfect copying.
4. Verify reduced-motion and mobile fallbacks.
5. Verify no P0/P1 defects remain.
6. @pm reviews evidence, risks and rollback concerns.
7. Record the final decision in `docs/Release_Checklist.md` and the decision log.

## Release verdict
Return exactly one:
- PASS
- CONDITIONAL PASS
- FAIL

## Release evidence
Include:
- build/test results
- browser verification
- screenshots or recordings where available
- performance observations
- accessibility observations
- known risks
- unresolved issues
- rollback concerns

## Hard rule
Do not declare release complete with unresolved P0/P1 defects.
