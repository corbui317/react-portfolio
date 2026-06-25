# Remediation: ProjectCard Preview Resolution

## Objective

Align `ProjectCard` preview resolution with the data contract so root-relative `preview` values in `data/projects.ts` are honored instead of silently falling back to WordPress mshots.

## Problem

`getPreviewUrl()` in `components/ProjectCard.tsx` only accepts absolute HTTPS URLs via `getSafeHttpsUrl()`. The Personal Portfolio entry sets `preview: '/logo512.png'`, which is rejected and replaced by an mshot of `https://coreybui.com`.

## Affected Files

| File | Role |
| --- | --- |
| `components/ProjectCard.tsx` | Preview URL resolution |
| `data/projects.ts` | Project preview values |
| `docs/specs/portfolio/02-project-content-and-cards.md` | Preview fallback chain spec |

## Behavior Requirements

### Preview resolution order (updated)

1. If `preview` is a safe root-relative path (starts with `/`, no `..`, no protocol), use it as-is.
2. Else if `preview` is a valid HTTPS URL, use it.
3. Else if project `url` is valid HTTPS, generate WordPress mshot.
4. Else use `/logo_favicon.svg`.

### Root-relative path safety

- Accept only paths matching `^/[a-zA-Z0-9/_.-]+$` (no query strings, no external hosts).
- Reject `//evil.com` and paths containing `..`.

### Data contract

- Keep HTTPS-only rule for clickable project `url` links unchanged.
- Document in `02-project-content-and-cards.md` that local previews are supported when under `public/`.

## Acceptance Criteria

- [ ] `preview: '/logo512.png'` renders that local asset (after PORT-05-WEB-01) instead of mshot
- [ ] `preview: 'https://...'` still works
- [ ] Missing `preview` still generates mshot from HTTPS project URL
- [ ] Invalid preview values still fall back safely
- [ ] Unit tests cover the full chain (see PORT-05-TEST-01)

## Edge Cases

- `preview: 'http://insecure.example.com'` → rejected, fall through to mshot or favicon
- `preview: '//cdn.example.com/x.png'` → rejected
- Project with no URL and no preview → `/logo_favicon.svg`

## Dependency Map

**Depends on:** PORT-05-WEB-01 (asset exists if using `/logo512.png`)

**Tests:**

- `components/ProjectCard.test.tsx` (extended in PORT-05-TEST-01)

## Verification

- `npm run test -- components/ProjectCard.test.tsx`
- Manual: Personal Portfolio card shows local preview, not mshot URL in image `src`
