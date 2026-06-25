# Remediation: ProjectCard Preview Fallback Tests

## Objective

Close the spec gap in `02-project-content-and-cards.md` by unit-testing the full preview resolution chain and URL safety edge cases.

## Problem

`components/ProjectCard.test.tsx` covers HTTPS link vs non-link article rendering only. It does not assert preview URL selection for explicit HTTPS preview, root-relative preview, mshot generation, or favicon fallback.

## Affected Files

| File | Role |
| --- | --- |
| `components/ProjectCard.test.tsx` | Unit tests |
| `components/ProjectCard.tsx` | Implementation under test |
| `docs/specs/portfolio/02-project-content-and-cards.md` | Acceptance criteria reference |

## Behavior Requirements

### Required test cases

| Case | Input | Expected image `src` (substring match) |
| --- | --- | --- |
| Explicit HTTPS preview | `preview: 'https://cdn.example.com/x.png'` | `cdn.example.com` |
| Root-relative preview | `preview: '/logo512.png'` | `/logo512.png` |
| Mshot from project URL | no preview, `url: 'https://example.com'` | `s.wordpress.com/mshots` |
| Favicon fallback | no preview, invalid `url` | `logo_favicon.svg` |
| HTTP preview rejected | `preview: 'http://insecure.example.com/x.png'` | mshot or favicon, not `insecure` |

### Implementation notes

- Query `next/image` via `img` role alt text `{title} project preview`.
- Mock or allow `next/image` in Vitest (existing setup).
- Prefer testing exported helpers if extracted during PORT-05-WEB-02; otherwise assert on rendered `src`.

## Acceptance Criteria

- [ ] All five cases above have passing tests
- [ ] `docs/specs/portfolio/02-project-content-and-cards.md` acceptance item for preview chain can be checked after PORT-05-WEB-02 lands
- [ ] `npm run test` passes

## Edge Cases

- Next/Image may transform `src` to `/_next/image?url=...` — assert with `expect.stringContaining`.

## Dependency Map

**Depends on:** PORT-05-WEB-02 (root-relative resolution behavior)

**Can start in parallel** with stubbed expectations if TDD preferred.

## Verification

- `npm run test -- components/ProjectCard.test.tsx`
