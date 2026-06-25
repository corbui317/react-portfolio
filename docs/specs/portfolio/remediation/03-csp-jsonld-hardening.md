# Remediation: CSP and JSON-LD Hardening

## Objective

Reduce XSS attack surface in production by tightening Content-Security-Policy where feasible and hardening JSON-LD script injection.

## Problem

`next.config.js` sets `script-src 'self' 'unsafe-inline'` in production. `app/layout.tsx` injects JSON-LD via `dangerouslySetInnerHTML` without escaping `<` characters.

Current risk is low because `personSchema` values are static constants, but the pattern does not scale safely if `siteConfig` ever becomes dynamic or CMS-driven.

## Affected Files

| File | Role |
| --- | --- |
| `next.config.js` | CSP header construction |
| `app/layout.tsx` | JSON-LD injection |
| `components/ThemeProvider.tsx` | Inline script usage (if any) — verify before tightening CSP |

## Behavior Requirements

### JSON-LD escaping (required)

- Serialize schema with `JSON.stringify(personSchema).replace(/</g, '\\u003c')` before `dangerouslySetInnerHTML`.
- Add a small helper (inline or `lib/serializeJsonLd.ts`) to avoid duplication if multiple schemas are added later.

### CSP tightening (phased)

**Phase 1 (this remediation):**

- Keep `unsafe-inline` for `script-src` if Next.js or theme hydration requires it.
- Document in spec comment why `unsafe-inline` remains.
- Ensure `object-src 'none'`, `base-uri 'self'`, and `frame-ancestors 'none'` stay in place.

**Phase 2 (optional, only if Phase 1 verification passes):**

- Evaluate Next.js nonce-based CSP via middleware or `next.config.js` experimental support.
- Remove `unsafe-inline` from production `script-src` if no inline scripts break build/runtime.

Do not ship Phase 2 in the same PR unless nonce wiring is fully verified in production build.

## Acceptance Criteria

- [ ] JSON-LD output escapes `<` in serialized JSON
- [ ] Homepage still renders valid Person schema (existing `e2e/seo.spec.ts` passes)
- [ ] Production build and `npm run test:e2e:ci` pass
- [ ] CSP changes documented in code comment or ADR note if `unsafe-inline` retained

## Edge Cases

- Dev server needs `unsafe-eval` for HMR — keep dev/prod CSP split.
- Theme flash prevention scripts must not break if CSP is tightened.

## Dependency Map

**Tests:**

- `e2e/seo.spec.ts` (JSON-LD parse still valid)

## Verification

- `npm run build && npm run test:e2e:ci`
- Inspect response headers on production build (`curl -I`) for CSP value
- Confirm `application/ld+json` script parses in browser devtools
