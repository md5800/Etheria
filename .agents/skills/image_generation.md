# Skill: Skincare Visual Asset Generation

## Objective
Turn approved brand, UI and motion requirements into production-ready skincare visual assets.

## Inputs
Read:
- `production_artifacts/02_brand/Brand_Strategy.md`
- `production_artifacts/03_ux_ui/UI_Handoff.md`
- `production_artifacts/06_motion_3d/Motion_Spec.md` when available
- approved product references
- supplied video/reference images
- existing `production_artifacts/05_visual_assets/Asset_Manifest.md`

## Asset types
May include:
- hero skincare editorial imagery
- product photography/concepts
- ingredient still life
- botanical/background environments
- foreground objects
- atmospheric texture layers
- isolated product/subject layers
- routine/editorial scenes
- decorative visual assets
- parallax backgrounds/midgrounds/foregrounds
- placeholder imagery for prototypes

## Truthfulness boundary
Never present generated imagery as:
- a real customer review/photo
- real clinical evidence
- a real endorsement
- an exact product photograph when the product reference is unavailable

Mark insufficiently verified outputs as `CONCEPT` or `PLACEHOLDER`.

## Brand consistency
Every asset must inherit:
- approved palette
- photography/cinematography language
- lighting
- texture/grain
- composition
- cultural tone
- approved product references
- prohibited visual clichés

## Asset request contract
For each asset record:
- Asset ID
- page/section
- purpose
- subject
- composition
- aspect ratio/pixel target
- desktop/mobile crop
- background requirement
- parallax layer/z-depth
- reference images
- brand constraints
- product-fidelity constraints
- text/no-text rule
- safe zones
- output format
- max file-weight target
- priority

## Generation loop
1. Read approved request and references.
2. Build structured prompt and negative constraints.
3. Generate candidates.
4. Inspect composition, brand fit, object/product consistency, crop safety and unwanted text.
5. Reject weak variants.
6. Regenerate only within the approved regeneration budget.
7. Select and crop the approved candidate.
8. Optimize web derivatives.
9. Update `Asset_Manifest.md`.
10. Notify parallax/frontend agents of exact paths and constraints.

## Parallax rules
When layered:
- separate background, midground, subject and foreground when practical;
- preserve clean edges for masking;
- preserve overscan for movement;
- avoid baked-in text;
- maintain consistent perspective/lighting;
- create desktop/mobile crops where needed;
- do not assume transparent-background support from a provider; use masking/background removal when necessary.

## Deliverable
Maintain:
`production_artifacts/05_visual_assets/Asset_Request.md`
`production_artifacts/05_visual_assets/Prompt_Log.md`
`production_artifacts/05_visual_assets/Asset_Manifest.md`

Do not declare an asset complete merely because an image was generated. Completion requires review, technical validation, correct variants and a manifest entry.
