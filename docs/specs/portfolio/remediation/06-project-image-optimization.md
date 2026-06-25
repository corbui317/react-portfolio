# Remediation: Project Image Optimization

## Objective

Use Next.js image optimization for WordPress mshot previews instead of bypassing the optimizer for all remote images.

## Problem

`ProjectCard` sets `unoptimized={isRemoteImage}` for any `http(s)` preview URL. `next.config.js` already whitelists `s.wordpress.com` in `images.remotePatterns`, so mshots skip resizing, format negotiation, and caching benefits.

## Affected Files

| File | Role |
| --- | --- |
| `components/ProjectCard.tsx` | `Image` `unoptimized` prop |
| `next.config.js` | `images.remotePatterns` |

## Behavior Requirements

### Optimization rules

- Local paths (`/logo_favicon.svg`, `/logo512.png`): use default optimized behavior (SVG may pass through — acceptable).
- Remote URLs on allowed hosts (`s.wordpress.com`): `unoptimized={false}` (omit prop or set false).
- Remote URLs on **non-allowed** hosts: keep `unoptimized={true}` or reject in preview resolution (prefer rejection in resolution layer).

### CSP compatibility

- Optimized images still load from Next image route or allowed remote host; no CSP change required.

## Acceptance Criteria

- [ ] Mshot preview URLs use Next `Image` without `unoptimized`
- [ ] Build does not error on optimized remote images
- [ ] Local fallback images still render
- [ ] No regression in project card layout or LCP on homepage

## Edge Cases

- If a preview URL points to a non-whitelisted host, card must not break — fall back to favicon or mshot only from whitelisted generator.

## Dependency Map

**Depends on:** PORT-05-WEB-02 (stable preview URLs)

**Tests:**

- Extend `ProjectCard.test.tsx` to assert `unoptimized` is absent/false for mshot src

## Verification

- `npm run build`
- Inspect rendered `<img>` or `/_next/image` URLs in devtools for mshot cards
