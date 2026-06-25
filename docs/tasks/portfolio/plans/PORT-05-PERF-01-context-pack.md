# Plan: PORT-05-PERF-01 — Enable Next image optimization for mshots

## Objective
Stop forcing `unoptimized` on whitelisted WordPress mshot preview images.

## Source of truth
- Spec: docs/specs/portfolio/remediation/06-project-image-optimization.md
- Task: docs/tasks/portfolio/backlog.md → PORT-05-PERF-01
- Dependencies: PORT-05-WEB-02 (recommended)

## Scope
- Update `unoptimized` logic in `ProjectCard.tsx`
- Only bypass optimizer for non-whitelisted remote hosts

## Excluded
- Adding new remote image domains
- Self-hosted screenshot pipeline

## Relevant files
- `components/ProjectCard.tsx`
- `next.config.js`

## Implementation steps
1. Add `isAllowedRemoteImage(url: string)` checking `s.wordpress.com` hostname.
2. Set `unoptimized={isRemoteImage && !isAllowedRemoteImage(previewUrl)}`.
3. Run build and visually inspect project cards.
4. Add unit assertion on `unoptimized` prop if feasible in RTL.

## Constraints
- CSP `img-src` must remain compatible
- Do not break local SVG/PNG previews

## Acceptance criteria
- [ ] Mshot images use Next optimizer
- [ ] Build succeeds
- [ ] Cards render without layout shift

## Verification
- Commands: `npm run build`
- Evidence: devtools shows `/_next/image?url=...` for mshot cards

## Risks / open questions
- First load may hit WordPress mshot latency — acceptable tradeoff
