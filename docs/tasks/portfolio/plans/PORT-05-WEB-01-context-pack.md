# Plan: PORT-05-WEB-01 — Add missing public brand assets

## Objective
Add or reference valid brand assets so metadata icons, OG images, and project previews do not 404.

## Source of truth
- Spec: docs/specs/portfolio/remediation/01-public-brand-assets.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-WEB-01
- Dependencies: none

## Scope
- Add `favicon.ico`, `logo192.png`, and `logo512.png` to `public/`, OR update all references to use existing `logo_favicon.svg`
- Align `app/layout.tsx` and `data/projects.ts` with chosen asset set

## Excluded
- Redesigning brand identity
- Self-hosted per-project screenshots

## Relevant files
- `public/`
- `app/layout.tsx`
- `data/projects.ts`

## Implementation steps
1. Diff canonical brand SVG; export 512×512 PNG, 192×192 PNG, and 32×32 ICO (Option A).
2. Place files in `public/` with exact names referenced in layout metadata.
3. Confirm `data/projects.ts` Personal Portfolio `preview` points to an existing file.
4. Run `npm run build`.
5. Verify each asset URL returns 200 via `curl -I` or Playwright `request.get`.

## Constraints
- Prefer Option A (raster assets) for OG/Twitter compatibility
- Do not reference files that are not committed to `public/`

## Acceptance criteria
- [x] All icon/OG paths in `app/layout.tsx` resolve to existing files
- [x] Personal Portfolio preview resolves to existing `public/` asset
- [x] `npm run build` succeeds

## Verification
- Commands: `npm run build`
- Evidence: HTTP 200 for `/logo512.png`, `/logo192.png`, `/favicon.ico` (if Option A)

## Risks / open questions
- If source PNG/ICO unavailable, use Option B and accept suboptimal social previews
