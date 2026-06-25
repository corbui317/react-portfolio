# Code Review Remediation Specs

Remediation specs derived from the 2026-06-24 portfolio code review. Each document is implementation-ready and maps to a `PORT-05-*` task and context pack in `docs/tasks/portfolio/plans/`.

## Sequencing

| Order | Spec | Priority | Task ID |
| --- | --- | --- | --- |
| 1 | [01-public-brand-assets.md](./01-public-brand-assets.md) | High | PORT-05-WEB-01 |
| 2 | [02-project-card-preview-resolution.md](./02-project-card-preview-resolution.md) | Medium | PORT-05-WEB-02 |
| 3 | [03-csp-jsonld-hardening.md](./03-csp-jsonld-hardening.md) | Medium | PORT-05-SEC-01 |
| 4 | [04-repository-hygiene.md](./04-repository-hygiene.md) | Medium | PORT-05-CHORE-01 |
| 5 | [05-hero-screen-reader-behavior.md](./05-hero-screen-reader-behavior.md) | Medium | PORT-05-A11Y-01 |
| 6 | [06-project-image-optimization.md](./06-project-image-optimization.md) | Low | PORT-05-PERF-01 |
| 7 | [07-fadein-intersection-observer-fallback.md](./07-fadein-intersection-observer-fallback.md) | Low | PORT-05-WEB-03 |
| 8 | [08-project-card-preview-tests.md](./08-project-card-preview-tests.md) | Low | PORT-05-TEST-01 |
| 9 | [09-eslint-next-version-alignment.md](./09-eslint-next-version-alignment.md) | Medium | PORT-05-CI-01 |
| 10 | [10-documentation-evidence-sync.md](./10-documentation-evidence-sync.md) | Low | PORT-05-DOCS-01 |

## Workflow

1. Read the remediation spec.
2. Open the linked context pack in `docs/tasks/portfolio/plans/`.
3. Implement only the scoped changes.
4. Run verification commands from the plan.
5. Update backlog task status with evidence.

## Non-Goals

- New features beyond fixing review findings
- Contact form, CMS, analytics, or multi-page routing
- Replacing WordPress mshots with self-hosted screenshots (remains future `PORT-03-WEB-01`)
