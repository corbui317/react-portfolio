# Feature: SEO, Accessibility, and Performance

## Objective

Search-engine discoverability, WCAG-aligned accessibility, and fast static delivery for the portfolio.

## Affected Files

| File | Role |
| --- | --- |
| `app/layout.tsx` | Metadata, viewport, JSON-LD, skip link |
| `app/sitemap.ts` | Sitemap generation |
| `app/robots.ts` | Robots rules |
| `data/navigation.ts` | `siteConfig` canonical URL |
| `next.config.js` | Security headers, image remote patterns |
| `app/globals.css` | Focus rings, reduced motion, theme tokens |

## SEO Requirements

### Metadata (`app/layout.tsx`)

- `metadataBase` from `siteConfig.url`
- Title template: `%s | {name}`
- Description, keywords, authors, creator
- Canonical `/`
- Open Graph: title, description, type, locale, url, siteName, images
- Twitter card: `summary_large_image`
- Icons: SVG favicon + ICO + apple touch icon
- `robots: { index: true, follow: true }`

### Structured Data

- JSON-LD `Person` schema with name, url, email, jobTitle, `sameAs` social profiles.

### Routes

- `app/sitemap.ts`: single entry for `siteConfig.url`, monthly, priority 1
- `app/robots.ts`: allow all, sitemap URL from `siteConfig.url`

## Accessibility Requirements

- `lang="en"` on `<html>`
- Skip link: "Skip to main content" → `#main`
- Landmark: `<main id="main">`
- Nav regions labeled (`Primary`, `Footer`, etc.)
- Focus visible via `.focus-ring` utility
- Interactive controls have accessible names
- Images have descriptive `alt` text
- Color not sole indicator of state (theme icons + labels)
- `prefers-reduced-motion` honored in Hero and fade-in sections

## Performance Requirements

- Static generation for home page (no server runtime required)
- `next/image` for project previews with responsive `sizes`
- Font: Inter via `next/font` with `display: swap` (default)
- Security headers do not block static assets in production

## Security Headers (`next.config.js`)

- CSP with restricted `img-src` (self, data, blob, s.wordpress.com)
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- HSTS in production only
- `frame-ancestors 'none'`

## Acceptance Criteria

- [ ] Build produces static `/` route
- [ ] `/sitemap.xml` and `/robots.txt` generated at build
- [ ] JSON-LD Person schema present in page HTML
- [ ] Skip link focusable and targets main content
- [ ] E2E: axe scan reports no critical violations on homepage
- [ ] Lighthouse Accessibility ≥ 95 (manual, mobile)

## Edge Cases

- Dev CSP allows `unsafe-eval` for Next.js HMR
- OG image uses local `/logo512.png` (must exist in `public/`)

## Dependency Map

**Tests:**

- `data/navigation.test.ts` (siteConfig contract)
- `e2e/homepage.spec.ts` (skip link, axe)

## Verification

- `npm run build` (static routes)
- Playwright + `@axe-core/playwright`
- Manual Lighthouse on preview deployment

## Targets (Advisory)

| Metric | Target |
| --- | --- |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | < 2.5s |
