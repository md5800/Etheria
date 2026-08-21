# Workflow: Design Review

## Purpose
Review the skincare site's approved UX, brand, UI, assets and motion before or during implementation.

## Inputs
Read:
- `production_artifacts/01_research/UX_Requirements.md`
- `production_artifacts/02_brand/Brand_Strategy.md`
- `production_artifacts/03_ux_ui/UI_Handoff.md`
- `production_artifacts/04_commerce/Commerce_Architecture.md`
- `production_artifacts/05_visual_assets/Asset_Manifest.md` when available
- `production_artifacts/06_motion_3d/Motion_Spec.md`
- supplied reference video

## Review checklist

### Brand
- visual system is coherent
- skincare positioning is clear
- typography and color follow approved strategy
- imagery is consistent
- no unsupported claims

### UX
- navigation is understandable
- product discovery is clear
- product information is readable
- CTAs remain visible/usable
- motion does not hide content

### UI
- spacing and hierarchy are consistent
- responsive states are defined
- interaction states exist
- accessibility requirements are represented

### Motion
- each major animation has a purpose
- parallax uses appropriate depth
- sequences do not become visually chaotic
- scroll behavior works forward and reverse
- mobile fallback exists
- reduced-motion fallback exists
- performance budget is respected

### Commerce
- animation does not control commerce state
- product/variant/cart behavior matches architecture

## Decision handling
If a review exposes an upstream flaw:
1. record the conflict/change;
2. identify the decision owner;
3. update the appropriate artifact;
4. do not silently patch the decision in code.

## Output
Produce a concise review summary with:
- PASS / CONDITIONAL PASS / FAIL
- approved items
- required changes
- risks
- owner for each action
- verification evidence
