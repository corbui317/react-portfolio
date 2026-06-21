# ADR-001: Spec-Driven Design for React Portfolio

## Status

Accepted

## Context

The portfolio is a small Next.js site, but changes were previously made ad hoc with only `typecheck`, `lint`, and `build` as quality gates. There was no durable product contract, no task traceability, and no automated behavioral tests.

Homeify demonstrates a lightweight spec-driven workflow:

- Feature specs define behavior before implementation.
- Backlog tasks (`PORT-*`) scope work with acceptance criteria and evidence.
- Context packs / MD plans bridge specs to implementation.
- Verification (unit, E2E, accessibility) proves completion.

## Decision

Adopt a scaled-down spec-driven design (SDD) workflow for this repository:

1. **Specs** in `docs/specs/portfolio/` are the product contract.
2. **Tasks** in `docs/tasks/portfolio/backlog.md` are the implementation unit.
3. **Plans** in `docs/tasks/portfolio/plans/` are execution handoffs for non-trivial work.
4. **Tests** encode acceptance criteria; CI enforces them on every push/PR.
5. **Agent workflows** in `docs/agents/portfolio-agent-workflows.md` guide Cursor-assisted development.

## Consequences

### Positive

- Every change links to a spec and task ID.
- Acceptance criteria are testable and reviewable before coding.
- CI provides evidence; no "fantasy completion."
- Future contributors (human or AI) have structured context.

### Negative

- Small fixes require slightly more ceremony (task ID in commit, verification).
- Docs must stay in sync with behavior (specs updated when contracts change).

## Non-Goals

- Full multi-agent orchestration (Homeify's agency roster).
- Backend/API specs (portfolio has no server routes today).
- CMS or dynamic content pipelines.

## Quality Bar

A task is **done** when:

- [ ] Linked spec acceptance criteria are satisfied.
- [ ] `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` pass.
- [ ] E2E tests pass for affected user flows.
- [ ] Evidence recorded in backlog or PR description.
