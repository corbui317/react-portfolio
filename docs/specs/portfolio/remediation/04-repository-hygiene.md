# Remediation: Repository Hygiene

## Objective

Remove accidental duplicate source files and align tooling versions so typecheck, lint, and review scope match the canonical codebase.

## Problem

Eleven `* 2.*` files exist alongside canonical sources and are included by `tsconfig.json` globs (`**/*.ts`, `**/*.tsx`). `eslint-config-next@16` is installed while `next@15` is the runtime framework.

## Affected Files

| File | Action |
| --- | --- |
| `app/robots 2.ts` | Delete |
| `app/sitemap 2.ts` | Delete |
| `data/navigation 2.ts` | Delete |
| `data/projects 2.ts` | Delete |
| `data/skills 2.ts` | Delete |
| `components/* 2.tsx` | Delete all duplicates |
| `hooks/useFadeIn 2.ts` | Delete |
| `eslint.config 2.mjs` | Delete |
| `package.json` | Align `eslint-config-next` major with `next` |
| `tsconfig.json` | Optional: add exclude pattern for `* 2.*` as guardrail |

## Behavior Requirements

### Duplicate file removal

- Delete every `* 2.*` file under `app/`, `components/`, `data/`, `hooks/`, and root config copies.
- Verify no imports reference duplicate filenames.
- Do not delete canonical files without the ` 2` suffix.

### ESLint alignment

- Pin `eslint-config-next` to the same major as `next` (15.x while on Next 15).
- Run `npm install` and confirm `npm run lint` passes.

### Guardrail (optional)

Add to `tsconfig.json` exclude:

```json
"**/* 2.ts",
"**/* 2.tsx"
```

## Acceptance Criteria

- [ ] No `* 2.*` source files remain in tracked app directories
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `eslint-config-next` major matches `next` major in `package.json`

## Edge Cases

- If any duplicate file contains unique content not in canonical file, merge into canonical before delete (diff first).

## Dependency Map

**Depends on:** none

**Blocks:** none (safe early cleanup)

## Verification

- `git status` shows only deletions of duplicate files
- `npm run typecheck && npm run lint && npm run test`
