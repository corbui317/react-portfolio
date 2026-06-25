# Plan: PORT-05-A11Y-01 — Fix Hero typewriter screen reader behavior

## Objective
Stop screen reader spam from character-by-character typewriter updates while keeping visual animation.

## Source of truth
- Spec: docs/specs/portfolio/remediation/05-hero-screen-reader-behavior.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-A11Y-01
- Dependencies: none

## Scope
- `aria-hidden` on animated typewriter text
- `sr-only` static tagline for assistive tech
- Remove `aria-live` from updating element

## Excluded
- Rewriting typewriter as CSS-only animation (optional future optimization)
- Changing phrase content or timing

## Relevant files
- `components/Hero.tsx`
- `e2e/homepage.spec.ts`

## Implementation steps
1. Wrap typewriter span with `aria-hidden="true"`.
2. Add `<span className="sr-only">{staticTagline}</span>` when motion enabled.
3. Remove `aria-live` from animated paragraph.
4. Confirm reduced-motion path still shows visible static tagline only.
5. Run E2E homepage + axe tests.

## Constraints
- Respect `prefers-reduced-motion` (existing)
- No duplicate visible text for sighted users

## Acceptance criteria
- [ ] Animated text hidden from AT
- [ ] Stable sr-only text available when typewriter runs
- [ ] Reduced-motion E2E test passes
- [ ] No new critical axe violations

## Verification
- Commands: `npm run test:e2e -- e2e/homepage.spec.ts`
- Evidence: axe test green; optional VoiceOver note in PR

## Risks / open questions
- sr-only utility must exist in Tailwind/globals (verify `.sr-only` available)
