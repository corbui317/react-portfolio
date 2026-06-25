# Remediation: Hero Screen Reader Behavior

## Objective

Prevent screen readers from announcing partial typewriter text on every character update while preserving the visual typewriter effect for sighted users.

## Problem

`components/Hero.tsx` sets `aria-live="polite"` on the animated tagline paragraph. The typewriter updates `displayText` every 45–90ms, which can cause repetitive or confusing announcements.

## Affected Files

| File | Role |
| --- | --- |
| `components/Hero.tsx` | Typewriter animation and ARIA |
| `e2e/homepage.spec.ts` | Reduced-motion hero test |

## Behavior Requirements

### Assistive technology exposure

When motion is enabled:

- Animated typewriter text is `aria-hidden="true"`.
- A visually hidden (`sr-only`) element exposes the full current phrase or the static tagline `Building reliable systems and polished web experiences.` — prefer static tagline for stability.
- Remove `aria-live` from the animated element.

When reduced motion is preferred (existing behavior):

- Show `staticTagline` without typewriter.
- No `aria-live` region needed.

### Visual behavior unchanged

- Typewriter animation timing, phrases array, and `prefers-reduced-motion` gating remain as-is.
- `.typewriter-cursor` styling unchanged.

## Acceptance Criteria

- [ ] Animated hero text has `aria-hidden="true"` when typewriter runs
- [ ] Screen-reader-accessible static text is present (sr-only or visible static line)
- [ ] `aria-live` is not on the rapidly updating element
- [ ] Existing E2E reduced-motion test still passes
- [ ] No new critical axe violations on homepage

## Edge Cases

- Do not duplicate visible text for sighted users (sr-only only for the stable announcement).
- Ensure `h1` and description paragraph remain the primary accessible hero content.

## Dependency Map

**Tests:**

- `e2e/homepage.spec.ts` (`reduced motion shows static hero tagline`)
- Optional unit test: assert `aria-hidden` on typewriter span when motion enabled

## Verification

- `npm run test:e2e` — reduced-motion test
- Manual: VoiceOver/NVDA spot check (document in PR evidence)
