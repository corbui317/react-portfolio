# Plan: PORT-05-WEB-02 — Fix ProjectCard root-relative preview resolution

## Objective
Honor safe root-relative `preview` paths from `data/projects.ts` before falling back to mshots.

## Source of truth
- Spec: docs/specs/portfolio/remediation/02-project-card-preview-resolution.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-WEB-02
- Dependencies: PORT-05-WEB-01

## Scope
- Extend `getPreviewUrl()` / URL helpers in `components/ProjectCard.tsx`
- Reject unsafe paths (`..`, `//`, protocols in relative paths)
- Update `02-project-content-and-cards.md` preview chain documentation

## Excluded
- Changing HTTPS-only rules for clickable project links
- Removing WordPress mshot fallback

## Relevant files
- `components/ProjectCard.tsx`
- `data/projects.ts`
- `docs/specs/portfolio/02-project-content-and-cards.md`

## Implementation steps
1. Add `isSafeRootRelativePath(path: string): boolean` helper with regex validation.
2. Update `getPreviewUrl()` order: safe relative → HTTPS → mshot → favicon.
3. Manually verify Personal Portfolio card uses `/logo512.png` (not mshot).
4. Land unit tests via PORT-05-TEST-01 or add minimal test in same PR.

## Constraints
- HTTPS-only external link behavior unchanged
- No user-controlled preview strings (data file only)

## Acceptance criteria
- [ ] `/logo512.png` preview renders locally
- [ ] HTTPS preview and mshot fallback still work
- [ ] Unsafe relative paths rejected

## Verification
- Commands: `npm run test -- components/ProjectCard.test.tsx`
- Evidence: rendered image src contains `/logo512.png` for Personal Portfolio

## Risks / open questions
- None if PORT-05-WEB-01 complete
