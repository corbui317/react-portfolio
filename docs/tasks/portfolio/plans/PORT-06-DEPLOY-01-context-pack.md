# Plan: PORT-06-DEPLOY-01 — Vercel deployment stabilization

## Objective

Align Vercel install/build settings with CI, remove deploy blockers, and document the operational runbook so future deployments are reliable.

## Source of truth

- Spec: docs/specs/portfolio/04-vercel-deployment-stabilization.md
- Task: docs/tasks/portfolio/backlog.md → PORT-06-DEPLOY-01
- Dependencies: PORT-05-CHORE-01, PORT-05-CI-01 (recommended first)

## Scope

- Change `vercel.json` install command to `npm ci`
- Add `engines.node` and `packageManager` to `package.json`
- Harden `.github/workflows/ci.yml` (permissions, concurrency, Playwright artifacts)
- Update `README.md` deployment section with settings and rollback commands
- Verify Vercel production deploy reaches READY

## Excluded

- Next.js 16 upgrade
- Custom `vercel deploy --prebuilt` CI pipeline
- Sentry / log drain integrations
- Lighthouse CI

## Relevant files

- `vercel.json`
- `package.json`, `package-lock.json`
- `.github/workflows/ci.yml`
- `README.md`
- `tsconfig.json` (optional exclude guardrail)
- All `* 2.*` duplicate files (via PORT-05-CHORE-01)

## Implementation steps

1. Confirm latest Vercel build failure phase (install, build, lint, runtime).
2. Complete PORT-05-CHORE-01: remove duplicate `* 2.*` files.
3. Complete PORT-05-CI-01: align `eslint-config-next` to 15.x.
4. Update `vercel.json`: `installCommand: "npm ci"`.
5. Add `engines.node` and `packageManager` to `package.json`.
6. Harden `ci.yml`: permissions, concurrency, Playwright artifact upload on failure.
7. Update `README.md` with Vercel settings and runbook commands.
8. Run full local verification suite.
9. Merge to `main` and confirm Vercel production deploy succeeds.
10. Run post-deploy smoke check on production URL.

## Constraints

- Keep Vercel Git integration as primary deploy path
- Node 22 across CI and Vercel
- Minimal diffs — no unrelated refactors
- Do not commit `.vercel/` or secrets

## Acceptance criteria

- [ ] `vercel.json` uses `npm ci`
- [ ] Node/package manager policy in `package.json`
- [ ] No `* 2.*` duplicates remain
- [ ] `eslint-config-next` major matches `next` major
- [ ] CI hardened with concurrency and failure artifacts
- [ ] README documents deploy runbook
- [ ] Vercel production deployment READY

## Verification

- Commands:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e:ci
```

- Evidence: Vercel deployment URL, build log snippet, `git status` clean after merge

## Risks / open questions

- Vercel project dashboard Node version must be set to 22.x manually if not inferred from `engines`
- Actual Vercel error log may reveal an issue outside this spec scope (e.g. missing asset)
