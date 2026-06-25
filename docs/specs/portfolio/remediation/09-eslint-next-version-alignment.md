# Remediation: ESLint and Next Version Alignment

## Objective

Align `eslint-config-next` with the installed Next.js major version to avoid lint rule drift and unsupported configuration combinations.

## Problem

`package.json` specifies `next@^15.1.0` (lockfile: 15.5.18) and `eslint-config-next@^16.2.6`. ESLint config imports `eslint-config-next/core-web-vitals` and `typescript` from v16 while the app runs Next 15.

## Affected Files

| File | Role |
| --- | --- |
| `package.json` | Dependency versions |
| `package-lock.json` | Lock resolution |
| `eslint.config.mjs` | ESLint flat config |

## Behavior Requirements

### Version policy

- `eslint-config-next` major must equal `next` major until an intentional Next upgrade is scheduled.
- Pin to `^15.x` matching current Next 15 line.

### Upgrade path (out of scope)

- Bumping Next to 16 is a separate future task with its own migration spec — not part of this remediation.

## Acceptance Criteria

- [ ] `eslint-config-next` resolves to 15.x in lockfile
- [ ] `npm run lint` passes with no config import errors
- [ ] `npm run build` passes
- [ ] No changes to lint rules beyond what the aligned package provides

## Edge Cases

- If lint surfaces new violations after alignment, fix only violations in touched files or auto-fixable issues — do not drive unrelated refactors.

## Dependency Map

**Depends on:** PORT-05-CHORE-01 recommended first (cleaner diff)

## Verification

- `npm install && npm run lint && npm run typecheck`
