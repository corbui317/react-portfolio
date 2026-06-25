# Plan: PORT-05-CI-01 — Align eslint-config-next with Next 15

## Objective
Pin `eslint-config-next` to major 15 to match the installed Next.js runtime.

## Source of truth
- Spec: docs/specs/portfolio/remediation/09-eslint-next-version-alignment.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-CI-01
- Dependencies: PORT-05-CHORE-01 (recommended)

## Scope
- Change `eslint-config-next` in `package.json` to `^15.x`
- Regenerate lockfile via `npm install`
- Fix any new lint violations minimally

## Excluded
- Upgrading Next.js to 16

## Relevant files
- `package.json`
- `package-lock.json`
- `eslint.config.mjs`

## Implementation steps
1. Set `eslint-config-next` to `^15.1.0` or latest 15.x.
2. Run `npm install`.
3. Run `npm run lint`; fix only new issues in touched scope or auto-fix.
4. Run `npm run typecheck && npm run test`.

## Constraints
- No broad eslint-disable additions

## Acceptance criteria
- [ ] Lockfile resolves eslint-config-next 15.x
- [ ] `npm run lint` passes

## Verification
- Commands: `npm install && npm run lint && npm run typecheck`

## Risks / open questions
- Aligned package may surface latent lint issues — fix narrowly
