# Portfolio Specifications

Implementation-ready specs for the Corey Bui portfolio. Each document defines behavior, acceptance criteria, and verification before code changes.

## Reading Order

1. [00-portfolio-roadmap.md](./00-portfolio-roadmap.md) — scope, sequencing, non-goals, quality bar
2. **P0:** [01-homepage](./01-homepage-experience.md) · [02-projects](./02-project-content-and-cards.md) · [03-seo-a11y-perf](./03-seo-accessibility-performance.md)
3. **Remediation:** [remediation/](./remediation/README.md) — code review fixes (PORT-05-*)

## Workflow

| Step | Artifact |
| --- | --- |
| Define behavior | Spec in this folder |
| Break into work | Task in [docs/tasks/portfolio/backlog.md](../../tasks/portfolio/backlog.md) |
| Plan execution | Context pack in [docs/tasks/portfolio/plans/](../../tasks/portfolio/plans/) |
| Implement | Code + tests |
| Verify | CI + evidence in backlog/PR |

**Agent workflows:** [docs/agents/portfolio-agent-workflows.md](../../agents/portfolio-agent-workflows.md)

**ADR:** [docs/adr/ADR-001-spec-driven-design.md](../../adr/ADR-001-spec-driven-design.md)

## Spec Template

Each feature spec includes:

1. Objective
2. Affected files
3. Behavior / UX requirements
4. Acceptance criteria (testable)
5. Edge cases
6. Dependency map
7. Verification type
