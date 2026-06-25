# Remediation: FadeIn IntersectionObserver Fallback

## Objective

Ensure content inside `FadeInSection` is visible when `IntersectionObserver` is unavailable, so sections do not remain at `opacity: 0` indefinitely.

## Problem

`hooks/useFadeIn.ts` adds `.visible` via `IntersectionObserver` but has no fallback when the API is missing. `app/globals.css` sets `.fade-in { opacity: 0 }` until `.visible` is applied. Reduced motion is handled; IO absence is not.

## Affected Files

| File | Role |
| --- | --- |
| `hooks/useFadeIn.ts` | Observer setup and fallbacks |
| `hooks/useFadeIn.test.tsx` | Unit coverage |
| `app/globals.css` | `.fade-in` base styles (no change required if hook fixes visibility) |

## Behavior Requirements

### Fallback order

1. If `prefers-reduced-motion: reduce` → add `visible` immediately (existing).
2. Else if `typeof IntersectionObserver === 'undefined'` → add `visible` immediately.
3. Else observe and add `visible` on intersect (existing).

### No progressive enhancement regression

- When IO works, keep threshold `0.12` and unobserve after first intersect.

## Acceptance Criteria

- [ ] Hook adds `visible` when `IntersectionObserver` is undefined
- [ ] Reduced-motion path unchanged
- [ ] IntersectionObserver path unchanged when API exists
- [ ] Unit test covers IO-missing fallback

## Edge Cases

- JSDOM in Vitest may stub IO — test must explicitly delete or undefined the global for fallback case.

## Dependency Map

**Tests:**

- `hooks/useFadeIn.test.tsx`

## Verification

- `npm run test -- hooks/useFadeIn.test.tsx`
- Manual: no invisible sections on homepage in supported browsers
