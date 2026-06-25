# Plan: PORT-05-SEC-01 — Harden CSP and JSON-LD injection

## Objective
Escape JSON-LD safely and document CSP posture; optionally explore nonce CSP in a follow-up.

## Source of truth
- Spec: docs/specs/portfolio/remediation/03-csp-jsonld-hardening.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-SEC-01
- Dependencies: none

## Scope
- Escape `<` in JSON-LD serialization in `app/layout.tsx`
- Audit inline scripts (layout, ThemeProvider)
- Document why `unsafe-inline` remains in production CSP (Phase 1)

## Excluded
- Full nonce-based CSP unless verified without breakage (Phase 2)

## Relevant files
- `app/layout.tsx`
- `next.config.js`
- `components/ThemeProvider.tsx`

## Implementation steps
1. Read ThemeProvider for inline script usage.
2. Add `serializeJsonLd(schema)` helper with `replace(/</g, '\\u003c')`.
3. Replace raw `JSON.stringify` in layout script tag.
4. Add brief comment in `next.config.js` on `unsafe-inline` rationale.
5. Run full CI verification sequence.

## Constraints
- Do not break dev HMR CSP (`unsafe-eval` in dev only)
- Keep existing security headers intact

## Acceptance criteria
- [ ] JSON-LD escapes `<`
- [ ] `e2e/seo.spec.ts` passes
- [ ] `npm run build && npm run test:e2e:ci` pass

## Verification
- Commands: `npm run build && npm run test:e2e:ci`
- Evidence: parsed Person schema in `e2e/seo.spec.ts` output

## Risks / open questions
- Removing `unsafe-inline` may require Next middleware nonces — defer to Phase 2
