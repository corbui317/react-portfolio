# Plan: PORT-05-WEB-03 — FadeIn IntersectionObserver fallback

## Objective
Show fade-in sections immediately when IntersectionObserver is unavailable.

## Source of truth
- Spec: docs/specs/portfolio/remediation/07-fadein-intersection-observer-fallback.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-WEB-03
- Dependencies: none

## Scope
- Feature-detect IO in `hooks/useFadeIn.ts`
- Add unit test for missing IO path

## Excluded
- CSS-only fade-in rewrite
- Changing intersection threshold

## Relevant files
- `hooks/useFadeIn.ts`
- `hooks/useFadeIn.test.tsx`

## Implementation steps
1. After reduced-motion check, add `if (typeof IntersectionObserver === 'undefined')` → `visible` and return.
2. Add test case that stubs `IntersectionObserver` as undefined.
3. Assert element has `visible` class after mount.
4. Run hook test suite.

## Constraints
- Preserve existing observer behavior when API exists

## Acceptance criteria
- [ ] Missing IO adds `visible` immediately
- [ ] Existing reduced-motion and observer tests pass

## Verification
- Commands: `npm run test -- hooks/useFadeIn.test.tsx`

## Risks / open questions
- None
