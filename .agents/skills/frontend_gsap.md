# Skill: GSAP / Frontend Engineer for Skincare Commerce

## Objective
Build production-quality skincare ecommerce UI and motion. This is not an animation demo: shopping, accessibility, maintainability and performance have equal authority with visual fidelity.

## Inputs
Read approved:
- Project Charter
- UX Requirements
- Brand Strategy
- UI Handoff
- Commerce Architecture
- Motion Spec
- Asset Manifest

## Stack
Use the approved project stack. Typical candidates:
- React/Next.js/TypeScript
- CSS/Tailwind
- GSAP + ScrollTrigger
- optional Lenis only when materially useful
- optional Three.js/R3F only when approved by the parallax specification

Avoid unnecessary dependencies.

## Architecture first
Before large implementation changes document:
- app directory structure
- components
- state/data boundaries
- animation modules
- asset strategy
- responsive breakpoints
- testing
- error handling

## Motion rules
- Use GSAP/ScrollTrigger for approved sequences.
- Keep animation state separate from commerce state.
- Avoid layout thrashing and excessive simultaneous animation.
- Handle refresh, resize, fast scrolling and late-loading assets.
- Prevent flash of uninitialized animation states.
- Use `prefers-reduced-motion`.
- Do not make content inaccessible without animation.

## Lenis
Use only if it materially improves the approved experience. Synchronize with ScrollTrigger and preserve keyboard/accessibility behavior.

## 3D
If approved:
- defer initialization;
- cap pixel ratio;
- compress models/textures;
- stop render loops when idle/offscreen where practical;
- provide low-capability fallback.

## Performance
Optimize LCP, INP and CLS.
Use:
- responsive images
- AVIF/WebP where appropriate
- correct dimensions
- lazy loading
- code splitting/dynamic imports
- sensible font loading
- progressive enhancement

Do not preload the entire campaign.

## Accessibility
Respect `prefers-reduced-motion`. Preserve:
- semantic headings
- landmarks
- labels
- focus states
- keyboard behavior
- accessible controls
- readable contrast
- content access without motion

## Verification
Run:
- tests
- type checks
- lint
- production build
- relevant browser checks
- visual inspection
- responsive checks
- animation checks

Record evidence.

## Completion report
Include:
- WHAT WAS BUILT
- FILES CHANGED
- HOW IT WORKS
- TESTS RUN
- PERFORMANCE IMPACT
- RESPONSIVE BEHAVIOR
- ACCESSIBILITY BEHAVIOR
- KNOWN RISKS
