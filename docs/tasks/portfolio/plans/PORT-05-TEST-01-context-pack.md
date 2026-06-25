# Plan: PORT-05-TEST-01 — ProjectCard preview fallback unit tests

## Objective
Unit-test the full ProjectCard preview resolution chain per spec 02.

## Source of truth
- Spec: docs/specs/portfolio/remediation/08-project-card-preview-tests.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-TEST-01
- Dependencies: PORT-05-WEB-02

## Scope
- Five test cases for preview URL selection
- Use `stringContaining` for Next/Image transformed src

## Excluded
- E2E image loading tests
- Visual regression

## Relevant files
- `components/ProjectCard.test.tsx`
- `components/ProjectCard.tsx`

## Implementation steps
1. Wait for or implement PORT-05-WEB-02 preview logic.
2. Add describe block `preview resolution`.
3. Implement five cases from remediation spec table.
4. Run vitest; fix assertions for `/_next/image` wrapper if needed.

## Constraints
- No production code changes unless extracting testable pure helpers

## Acceptance criteria
- [ ] Five preview cases pass
- [ ] `npm run test` green

## Verification
- Commands: `npm run test -- components/ProjectCard.test.tsx`

## Risks / open questions
- May need to export `getPreviewUrl` for pure unit tests if DOM assertions are brittle
