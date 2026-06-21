# Portfolio Roadmap

## Objective

Define scope, priorities, and quality bar for the Corey Bui portfolio (`coreybui.com`) as a spec-driven static site.

## Current State

- Single-page Next.js 15 App Router site at `/`.
- Sections: Header, Hero, About, Skills, Projects, Contact, Footer.
- Content in `data/navigation.ts`, `data/projects.ts`, `data/skills.ts`.
- Dark/light theme via `next-themes`.
- Deployed on Vercel with security headers in `next.config.js`.

## Priorities

| Priority | Spec | Focus |
| --- | --- | --- |
| P0 | 01-homepage-experience | Navigation, sections, theme, motion |
| P0 | 02-project-content-and-cards | Project data contract, card links, previews |
| P0 | 03-seo-accessibility-performance | Metadata, SEO routes, a11y, performance |

## Non-Goals (Current Phase)

- Blog or multi-page routing beyond home + metadata routes
- Contact form backend (mailto only)
- CMS / admin panel
- Authentication or protected content
- Analytics integration (future spec)
- Replacing WordPress mshots with self-hosted previews (future task)

## Quality Bar

Every release must pass:

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e:ci`

Manual checks before major releases:

- Lighthouse Performance ≥ 90, Accessibility ≥ 95 (mobile)
- Responsive review at 375px, 768px, 1280px

## Sequencing

1. Establish SDD docs, tests, and CI (PORT-00-* tasks)
2. Lock current behavior with specs and regression tests
3. Future improvements only via new `PORT-*` tasks linked to specs

## Acceptance Criteria

- [ ] All P0 specs exist and match current implementation
- [ ] Backlog contains SDD setup tasks with evidence
- [ ] CI runs on push/PR to main

## Verification

- Manual review of spec accuracy against live site
- CI green on default branch
