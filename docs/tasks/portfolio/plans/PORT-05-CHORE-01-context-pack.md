# Plan: PORT-05-CHORE-01 — Remove duplicate source files

## Objective
Delete accidental `* 2.*` duplicates and prevent them from re-entering the TypeScript graph.

## Source of truth
- Spec: docs/specs/portfolio/remediation/04-repository-hygiene.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-CHORE-01
- Dependencies: none

## Scope
- Delete all 11 duplicate files under app, components, data, hooks, and eslint config
- Optional `tsconfig.json` exclude guardrail

## Excluded
- ESLint version alignment (PORT-05-CI-01)

## Relevant files
- `app/robots 2.ts`, `app/sitemap 2.ts`
- `data/navigation 2.ts`, `data/projects 2.ts`, `data/skills 2.ts`
- `components/* 2.tsx`, `hooks/useFadeIn 2.ts`
- `eslint.config 2.mjs`
- `tsconfig.json` (optional)

## Implementation steps
1. `diff` each `* 2.*` file against canonical; merge any unique content.
2. Delete all duplicate files.
3. `rg " 2\.(ts|tsx)"` to confirm no imports reference duplicates.
4. Add tsconfig exclude patterns if desired.
5. Run typecheck, lint, test.

## Constraints
- Never delete canonical files
- No functional code changes beyond deletions

## Acceptance criteria
- [ ] Zero `* 2.*` source files in repo
- [ ] `npm run typecheck && npm run lint && npm run test` pass

## Verification
- Commands: `npm run typecheck && npm run lint && npm run test`
- Evidence: `git status` shows deletions only (plus optional tsconfig)

## Risks / open questions
- Verify duplicates are true copies before delete
