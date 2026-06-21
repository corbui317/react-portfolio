# Portfolio Task Plans (Context Packs)

Durable execution handoffs for non-trivial `PORT-*` tasks. Adapted from Homeify's context pack pattern.

Save plans here (e.g. `PORT-01-E2E-01-context-pack.md`) before clicking **Build** in Cursor.

## MD Plan Template

```markdown
# Plan: {TASK_ID} — {short title}

## Objective
{one sentence}

## Source of truth
- Spec: docs/specs/portfolio/{NN}-*.md §{section}
- Task: docs/tasks/portfolio/backlog.md → {TASK_ID}
- Dependencies: {ids or none}

## Scope
{bullets from task Scope}

## Excluded
{bullets from task Excluded}

## Relevant files
{from task Files + spec dependency map}

## Implementation steps
1. {ordered concrete steps}
2. ...

## Constraints
- Next.js 15 App Router, static content in data/
- HTTPS-only external project links
- Respect prefers-reduced-motion
- {task-specific}

## Acceptance criteria
- [ ] {copied from task}

## Verification
- Commands: {from task Verification}
- Evidence: {test output, screenshots}

## Risks / open questions
- {list or none}
```

## Plan Mode Prompt (Example)

```text
Create an MD Plan for PORT-01-E2E-01 only. Read docs/specs/portfolio/01-homepage-experience.md
and the task in docs/tasks/portfolio/backlog.md. Use the template in docs/tasks/portfolio/plans/README.md.
Do not implement code.
```

## Build Handoff Prompt (Example)

```text
Implement the attached MD Plan for PORT-01-E2E-01 only. Do not expand scope.
Return changed files, tests run, evidence, and risks.
```
