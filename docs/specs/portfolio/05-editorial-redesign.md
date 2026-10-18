# Editorial Redesign and Resume Sections

## Objective

Restyle the homepage after the editorial layout of [rr-resume-site.vercel.app](https://rr-resume-site.vercel.app/), apply Emil Kowalski's design-engineering motion rules, and add resume-grade sections (Experience, Education, Stats, Homelab) sourced from Corey's October 2026 resume.

## Design System

| Token group | Values |
| --- | --- |
| Palette (light) | `--bg #f9f6f1`, `--bg-surface #f3f0e9`, `--bg-elevated #fdfcf8`, `--rim #d4d0c8`, `--ink #1c1712`, `--ink-2 #47413c`, `--ink-3 #68625c`, `--accent #875814` |
| Palette (dark) | `--bg #100e0c`, `--bg-surface #191714`, `--bg-elevated #23201c`, `--rim #36322d`, `--ink #edebe7`, `--ink-2 #b3b1ab`, `--ink-3 #94928d`, `--accent #e1ae51` |
| Type | DM Serif Display (headings), DM Sans (body), IBM Plex Mono (labels, dates, tags) via `next/font` |
| Scale | Fluid `--step--1` … `--step-5` clamp values |
| Motion | `--ease-out cubic-bezier(.23,1,.32,1)`, `--ease-drawer cubic-bezier(.32,.72,0,1)`, `--dur-press .14s`, `--dur-hint .18s`, `--dur-panel .32s` |

Legacy variables (`--background`, `--foreground`, `--muted`, `--card-border`, …) alias the new tokens.

## Motion Rules

- Section reveal: `useFadeIn` fades the section and indexes `[data-reveal]` children; CSS staggers them 50ms apart (capped at 6), opacity + `translateY(12px)` only.
- Hero: one-time load-in via `@starting-style`; the typewriter loop was removed (constant replay, fails the frequency test).
- Press feedback: `scale(0.97)` on buttons and pressables; hover effects gated behind `(hover: hover) and (pointer: fine)` (`hoverOnlyWhenSupported`).
- Nav: `useActiveSection` (`rootMargin: -40% 0px -55% 0px`) sets `aria-current`; underline animates with `transform: scaleX`.
- Expand/collapse: `grid-template-rows: 0fr → 1fr`, hidden content is `inert` while closed.
- Homelab trace: `stroke-dashoffset` draws in 450ms, retracts in 200ms.
- Reduced motion: all translate/scale motion removed; opacity fades kept at 200ms.

## Sections

Resume download (`public/corey_bui_resume.docx`, linked from Hero and Contact via `siteConfig.resumePath`); contact email `corbui31796@gmail.com`.

Hero → 01 About → 02 Experience → 03 Skills → 04 Education → 05 Projects → 06 Homelab → Contact. Content lives in `data/` (`experience.ts`, `education.ts`, `homelab.ts`, `stats.ts`, `skills.ts`, `projects.ts`).

## Excluded

- Phone number on the page itself (it does appear inside the downloadable resume).
- Framer Motion or other animation dependencies.

## Acceptance Criteria

- [x] Tokens, fonts, and Tailwind mapping in place for light and dark themes
- [x] All seven nav items scroll to their sections and highlight when active
- [x] New sections render resume content from `data/`
- [x] Reduced motion removes movement
- [x] Unit tests, e2e (including axe), lint, typecheck, and build pass
