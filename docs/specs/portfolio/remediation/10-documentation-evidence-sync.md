# Remediation: Documentation and Evidence Sync

## Objective

Bring testing documentation and backlog task evidence in line with the current test suite so SDD artifacts remain trustworthy verification sources.

## Problem

1. `e2e/e2e-and-development-testing.md` lists gaps that `e2e/homepage.spec.ts` and `e2e/seo.spec.ts` already cover (navigation CTAs, reduced motion, mailto, footer links, project grid count, robots/sitemap/JSON-LD).
2. `docs/tasks/portfolio/backlog.md` marks Sprint 1 complete but leaves acceptance criteria unchecked.

## Affected Files

| File | Role |
| --- | --- |
| `e2e/e2e-and-development-testing.md` | Test inventory and gap list |
| `docs/tasks/portfolio/backlog.md` | Task status and evidence |
| `docs/specs/portfolio/README.md` | Optional link to remediation index |

## Behavior Requirements

### Testing guide updates

- Add `e2e/seo.spec.ts` to E2E inventory table with covered behaviors.
- Move implemented scenarios from "Gaps" to "Covered" in the checklist.
- Retain only genuine remaining gaps (e.g. non-HTTPS card E2E, responsive viewport matrix, Lighthouse CI).

### Backlog evidence

- For completed Sprint 1 tasks (`PORT-00-*`, `PORT-01-*`, `PORT-02-*`), check acceptance criteria boxes that CI and existing tests satisfy.
- Add one-line evidence note per phase (e.g. "Verified 2026-06-24: CI green, 6 unit + 17 E2E tests") — adjust counts to actual suite size at update time.

### Spec index

- Add link to `docs/specs/portfolio/remediation/README.md` from portfolio spec README under a "Remediation" section.

## Acceptance Criteria

- [ ] Testing guide inventory matches files in `e2e/`
- [ ] No implemented E2E scenario remains listed only under "Gaps"
- [ ] Sprint 1 task checkboxes reflect verified completion or document explicit deferral
- [ ] Portfolio spec README links to remediation specs

## Edge Cases

- Test counts will change as new tests land — use command output not hard-coded forever counts in prose, or date-stamp evidence.

## Dependency Map

**Depends on:** none (can run anytime)

**Should run after:** other PORT-05-* tasks so final test counts are accurate

## Verification

- Manual diff review: each gap row in guide maps to absent or present test
- `npm run test && npm run test:e2e` — record counts in backlog evidence note
