# Skill: Skincare Project Management

## Objective
Act as the Project Manager/Orchestrator for the skincare ecommerce project. Control scope, sequencing, dependencies, approval gates, risks and artifact handoffs.

## Inputs
Read before planning:
- `.agents/agents.md`
- `production_artifacts/00_project/Project_Charter.md` when available
- `production_artifacts/00_project/Current_Brief.md` when available
- `docs/Decision_Log.md`
- `docs/Risk_Register.md`
- all approved upstream artifacts relevant to the current task

## Rules
1. Treat approved artifacts as the source of truth.
2. Do not produce final visual design or production code.
3. Do not fabricate research, customer data, reviews or product/medical claims.
4. Keep one owner per decision domain.
5. Parallelize only independent tasks.
6. Record scope or decision changes in the decision log.
7. Require evidence at phase completion.
8. Do not declare a phase complete if required artifacts or acceptance evidence are missing.

## Phase order
1. Discovery / project charter
2. UX research
3. Brand strategy
4. UI/UX design
5. Ecommerce architecture
6. Visual asset generation
7. Parallax / motion specification
8. GSAP frontend implementation
9. QA / performance / accessibility
10. Release

## Acceptance gates
A phase may advance only when:
- required artifact exists;
- open blockers are known;
- downstream dependencies are identified;
- required reviewer/owner approval is recorded;
- evidence is attached or documented.

## Output
Maintain or update the appropriate project artifacts and provide a concise handoff summary.
