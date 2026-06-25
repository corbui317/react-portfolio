# Remediation: Public Brand Assets

## Objective

Ensure every metadata icon and Open Graph image referenced in code exists under `public/` so social previews, favicons, and project cards do not 404.

## Problem

`app/layout.tsx` and `data/projects.ts` reference `/logo512.png`, `/logo192.png`, and `/favicon.ico`, but `public/` currently contains only `logo_favicon.svg`.

## Affected Files

| File | Role |
| --- | --- |
| `public/` | Brand asset storage |
| `app/layout.tsx` | OG/Twitter metadata and icon declarations |
| `data/projects.ts` | Personal Portfolio `preview` path |
| `docs/specs/portfolio/03-seo-accessibility-performance.md` | OG image requirement |

## Behavior Requirements

### Asset inventory

After remediation, `public/` must include:

| File | Purpose | Minimum spec |
| --- | --- | --- |
| `logo_favicon.svg` | Primary vector favicon | Already present |
| `favicon.ico` | Legacy favicon fallback | 32×32 or multi-size ICO |
| `logo192.png` | Apple touch icon | 192×192 PNG |
| `logo512.png` | OG/Twitter image and optional project preview | 512×512 PNG |

### Metadata alignment

- `app/layout.tsx` icon and OG image paths must resolve to existing files.
- `data/projects.ts` Personal Portfolio `preview` must resolve to an existing file (either `/logo512.png` after asset add, or `/logo_favicon.svg` if consolidating).

### Preferred approach

**Option A (recommended):** Export PNG/ICO variants from the existing brand mark and add all three missing files to `public/`.

**Option B:** Remove references to missing files and point metadata + preview at `logo_favicon.svg` only. Accept that OG/Twitter may not render optimally on platforms that prefer raster images.

Choose one option; do not leave dangling references.

## Acceptance Criteria

- [x] Every path in `app/layout.tsx` `icons`, `openGraph.images`, and `twitter.images` resolves to a file in `public/`
- [x] Personal Portfolio `preview` in `data/projects.ts` resolves to an existing `public/` asset
- [x] `npm run build` succeeds
- [x] Manual or E2E check: `GET /logo512.png` returns 200 when Option A is used

## Edge Cases

- SVG-only OG images are not universally supported; prefer 512×512 PNG for social cards.
- ICO can be generated from PNG if designer source is unavailable.

## Dependency Map

**Depends on:** none

**Blocks:** PORT-05-WEB-02 (preview resolution tests assume stable asset paths)

**Tests:**

- `e2e/seo.spec.ts` (optional: assert OG image URL returns 200)

## Verification

- `npm run build`
- `curl -I` or Playwright `request.get` for each referenced asset path
- Visual check of favicon in browser tab
