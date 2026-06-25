# Plan: PORT-05-DOCS-01 — Sync testing guide and backlog evidence

## Objective
Update SDD docs so test inventory and Sprint 1 evidence match the repository.

## Source of truth
- Spec: docs/specs/portfolio/remediation/10-documentation-evidence-sync.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-DOCS-01
- Dependencies: all other PORT-05-* (run last)

## Scope
- Refresh `e2e/e2e-and-development-testing.md` inventory and gaps
- Check Sprint 1 acceptance boxes with dated evidence
- Link remediation index from portfolio spec README

## Excluded
- Writing new E2E tests (only document existing)
- Lighthouse CI automation

## Relevant files
- `e2e/e2e-and-development-testing.md`
- `docs/tasks/portfolio/backlog.md`
- `docs/specs/portfolio/README.md`

## Implementation steps
1. Run `npm run test` and `npm run test:e2e`; record test counts.
2. Add `e2e/seo.spec.ts` to E2E inventory with test list.
3. Move covered scenarios from Gaps to Covered (CTAs, nav, mailto, footer, grid, SEO routes, reduced motion).
4. Leave only true gaps (non-HTTPS card E2E, Lighthouse CI, multi-viewport matrix).
5. Check Sprint 1 task boxes; add evidence footnote with date.
6. Add Remediation section to `docs/specs/portfolio/README.md`.

## Constraints
- Docs only — no code changes unless linking paths

## Acceptance criteria
- [ ] Guide matches `e2e/*.spec.ts` files
- [ ] Sprint 1 criteria checked or explicitly deferred
- [ ] README links remediation folder

## Verification
- Manual review of diff against `e2e/homepage.spec.ts` and `e2e/seo.spec.ts`

## Risks / open questions
- Test counts change over time — date-stamp evidence
