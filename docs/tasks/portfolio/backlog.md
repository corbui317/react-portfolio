# Portfolio Implementation Backlog

Dependency-ordered tasks derived from [docs/specs/portfolio/](../../specs/portfolio/). Use task IDs in commits and PR descriptions (e.g. `PORT-01-E2E-01`).

**Workflow:** [docs/agents/portfolio-agent-workflows.md](../../agents/portfolio-agent-workflows.md)

**Constraints (all tasks):**

- Next.js 15 App Router; content in `data/`
- HTTPS-only external project links
- Respect `prefers-reduced-motion`
- No scope expansion without spec update

---

## Task Template

```markdown
### PORT-XX-AREA-NN — Title
- **Spec:** docs/specs/portfolio/...
- **Dependencies:** ...
- **Files:** ...
- **Scope:** ...
- **Excluded:** ...
- **Acceptance criteria:**
  - [ ] ...
- **Verification:** unit | E2E | manual | CI
```

**Areas:** `DOCS`, `TEST`, `E2E`, `WEB`, `CI`

---

## Phase 0 — SDD Foundation

| ID | Status | Title |
|----|--------|-------|
| PORT-00-DOCS-01 | done | ADR-001 spec-driven design decision |
| PORT-00-DOCS-02 | done | Spec index and P0 feature specs |
| PORT-00-DOCS-03 | done | Agent workflows and plan template |
| PORT-00-DOCS-04 | done | Implementation backlog (this file) |

---

## Phase 1 — Testing Infrastructure

### PORT-00-TEST-01 — Add Vitest and RTL

- **Spec:** [00-portfolio-roadmap.md](../../specs/portfolio/00-portfolio-roadmap.md)
- **Dependencies:** PORT-00-DOCS-02
- **Files:** `package.json`, `vitest.config.ts`, `vitest.setup.ts`
- **Scope:** Vitest, jsdom, @testing-library/react, @testing-library/jest-dom, test scripts
- **Excluded:** E2E setup
- **Acceptance criteria:**
  - [ ] `npm run test` executes Vitest
  - [ ] `npm run test:watch` available
- **Verification:** unit

### PORT-00-TEST-02 — Add Playwright E2E

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `package.json`, `playwright.config.ts`, `e2e/`
- **Scope:** Playwright, @axe-core/playwright, e2e scripts including CI variant
- **Excluded:** Multi-browser matrix beyond Chromium in CI
- **Acceptance criteria:**
  - [ ] `npm run test:e2e` runs Playwright locally
  - [ ] `npm run test:e2e:ci` runs Chromium only
- **Verification:** E2E

### PORT-00-CI-01 — GitHub Actions CI workflow

- **Spec:** [00-portfolio-roadmap.md](../../specs/portfolio/00-portfolio-roadmap.md)
- **Dependencies:** PORT-00-TEST-01, PORT-00-TEST-02
- **Files:** `.github/workflows/ci.yml`
- **Scope:** typecheck, lint, unit tests, build, Chromium E2E
- **Excluded:** Vercel deploy (handled separately)
- **Acceptance criteria:**
  - [ ] CI runs on push/PR to main
  - [ ] All verification steps pass
- **Verification:** CI

---

## Phase 2 — Regression Tests (Current Behavior)

### PORT-01-TEST-01 — Navigation and site config tests

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md), [03-seo-accessibility-performance.md](../../specs/portfolio/03-seo-accessibility-performance.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `data/navigation.test.ts`
- **Scope:** navItems anchors, siteConfig HTTPS url, email present
- **Excluded:** Component rendering
- **Acceptance criteria:**
  - [ ] All nav items have hash hrefs
  - [ ] siteConfig.url is HTTPS
- **Verification:** unit

### PORT-01-TEST-02 — Header component tests

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `components/Header.test.tsx`
- **Scope:** Nav labels, mobile menu toggle ARIA
- **Excluded:** E2E scroll behavior
- **Acceptance criteria:**
  - [ ] Renders all nav links
  - [ ] Menu button toggles aria-expanded
- **Verification:** unit

### PORT-01-TEST-03 — ThemeToggle component tests

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `components/ThemeToggle.test.tsx`
- **Scope:** Toggle aria-label, theme switch callback
- **Excluded:** Visual theme CSS assertions
- **Acceptance criteria:**
  - [ ] Button has accessible name
  - [ ] Click invokes setTheme
- **Verification:** unit

### PORT-01-TEST-04 — useFadeIn hook tests

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `hooks/useFadeIn.test.ts`
- **Scope:** Reduced motion adds visible class immediately
- **Excluded:** Full IntersectionObserver integration (mocked)
- **Acceptance criteria:**
  - [ ] Returns a ref object
  - [ ] Reduced motion path adds visible class
- **Verification:** unit

### PORT-02-TEST-01 — Projects data contract tests

- **Spec:** [02-project-content-and-cards.md](../../specs/portfolio/02-project-content-and-cards.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `data/projects.test.ts`
- **Scope:** Array non-empty, required fields, HTTPS urls
- **Excluded:** Card rendering
- **Acceptance criteria:**
  - [ ] Every project has title, description, outcome, tags
  - [ ] URLs are HTTPS
- **Verification:** unit

### PORT-02-TEST-02 — ProjectCard component tests

- **Spec:** [02-project-content-and-cards.md](../../specs/portfolio/02-project-content-and-cards.md)
- **Dependencies:** PORT-00-TEST-01
- **Files:** `components/ProjectCard.test.tsx`
- **Scope:** HTTPS link rendering, non-HTTPS article fallback, tags
- **Excluded:** next/image remote loading
- **Acceptance criteria:**
  - [ ] HTTPS url renders anchor with target _blank
  - [ ] Invalid url renders article without link
- **Verification:** unit

### PORT-01-E2E-01 — Homepage E2E suite

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md), [03-seo-accessibility-performance.md](../../specs/portfolio/03-seo-accessibility-performance.md)
- **Dependencies:** PORT-00-TEST-02
- **Files:** `e2e/homepage.spec.ts`
- **Scope:** Sections visible, skip link, mobile nav, theme toggle, project link, axe scan
- **Excluded:** Cross-browser beyond Chromium CI
- **Acceptance criteria:**
  - [ ] All main sections present
  - [ ] Skip link focuses main
  - [ ] Mobile nav opens
  - [ ] Theme toggle works
  - [ ] No critical axe violations
- **Verification:** E2E

---

## Phase 3 — Documentation

### PORT-00-DOCS-05 — Update README with SDD workflow

- **Spec:** [00-portfolio-roadmap.md](../../specs/portfolio/00-portfolio-roadmap.md)
- **Dependencies:** PORT-00-DOCS-04, PORT-00-CI-01
- **Files:** `README.md`
- **Scope:** Spec-driven workflow section, verification commands, project structure update
- **Excluded:** Deployment rewrite
- **Acceptance criteria:**
  - [ ] README documents docs/ structure and task lifecycle
  - [ ] Verification commands listed
- **Verification:** manual

### PORT-00-DOCS-06 — E2E and development testing guide

- **Spec:** [01-homepage-experience.md](../../specs/portfolio/01-homepage-experience.md), [02-project-content-and-cards.md](../../specs/portfolio/02-project-content-and-cards.md), [03-seo-accessibility-performance.md](../../specs/portfolio/03-seo-accessibility-performance.md)
- **Dependencies:** PORT-00-DOCS-05, PORT-01-E2E-01
- **Files:** `e2e/e2e-and-development-testing.md`, `README.md`, `docs/tasks/portfolio/backlog.md`
- **Scope:** Comprehensive testing guide, E2E coverage checklist, Evidence Collector protocol, README pointer
- **Excluded:** New Playwright tests, CI changes, Lighthouse automation
- **Acceptance criteria:**
  - [ ] Guide documents all verification layers and commands
  - [ ] Current E2E coverage and gaps mapped to specs
  - [ ] Evidence report template included
  - [ ] README links to the guide
- **Verification:** manual

---

## Sprint Grouping

**Sprint 1 (complete):** PORT-00-DOCS-*, PORT-00-TEST-*, PORT-00-CI-01, PORT-01-TEST-*, PORT-02-TEST-*, PORT-01-E2E-01, PORT-00-DOCS-05, PORT-00-DOCS-06

**Sprint 2 (code review remediation):** PORT-05-* — see [remediation specs](../../specs/portfolio/remediation/README.md)

**Future (not scheduled):**

- PORT-03-WEB-01 — Self-hosted project screenshots
- PORT-03-PERF-01 — Lighthouse performance budget in CI
- PORT-04-WEB-01 — Contact form with server action

---

## Phase 4 — Code Review Remediation (2026-06-24)

Specs: [docs/specs/portfolio/remediation/](../../specs/portfolio/remediation/)  
Plans: [docs/tasks/portfolio/plans/PORT-05-*-context-pack.md](./plans/)

### PORT-05-WEB-01 — Add missing public brand assets

- **Spec:** [01-public-brand-assets.md](../../specs/portfolio/remediation/01-public-brand-assets.md)
- **Plan:** [PORT-05-WEB-01-context-pack.md](./plans/PORT-05-WEB-01-context-pack.md)
- **Dependencies:** none
- **Files:** `public/`, `app/layout.tsx`, `data/projects.ts`
- **Scope:** Add `favicon.ico`, `logo192.png`, `logo512.png` or consolidate references to existing assets
- **Excluded:** Brand redesign
- **Acceptance criteria:**
  - [x] All metadata icon/OG paths resolve to existing `public/` files
  - [x] Personal Portfolio preview path is valid
- **Verification:** build, asset HTTP 200 checks

### PORT-05-WEB-02 — Fix ProjectCard root-relative preview resolution

- **Spec:** [02-project-card-preview-resolution.md](../../specs/portfolio/remediation/02-project-card-preview-resolution.md)
- **Plan:** [PORT-05-WEB-02-context-pack.md](./plans/PORT-05-WEB-02-context-pack.md)
- **Dependencies:** PORT-05-WEB-01
- **Files:** `components/ProjectCard.tsx`, `data/projects.ts`, `docs/specs/portfolio/02-project-content-and-cards.md`
- **Scope:** Safe root-relative preview paths before mshot fallback
- **Excluded:** HTTPS link rule changes
- **Acceptance criteria:**
  - [ ] `/logo512.png` preview renders locally
  - [ ] HTTPS preview and mshot fallback unchanged
- **Verification:** unit + manual card inspection

### PORT-05-SEC-01 — Harden CSP and JSON-LD injection

- **Spec:** [03-csp-jsonld-hardening.md](../../specs/portfolio/remediation/03-csp-jsonld-hardening.md)
- **Plan:** [PORT-05-SEC-01-context-pack.md](./plans/PORT-05-SEC-01-context-pack.md)
- **Dependencies:** none
- **Files:** `app/layout.tsx`, `next.config.js`
- **Scope:** Escape `<` in JSON-LD; document CSP `unsafe-inline` rationale (Phase 1)
- **Excluded:** Nonce CSP unless verified (Phase 2)
- **Acceptance criteria:**
  - [ ] JSON-LD escapes `<`
  - [ ] `e2e/seo.spec.ts` passes
- **Verification:** build, E2E CI

### PORT-05-CHORE-01 — Remove duplicate source files

- **Spec:** [04-repository-hygiene.md](../../specs/portfolio/remediation/04-repository-hygiene.md)
- **Plan:** [PORT-05-CHORE-01-context-pack.md](./plans/PORT-05-CHORE-01-context-pack.md)
- **Dependencies:** none
- **Files:** all `* 2.*` duplicates, optional `tsconfig.json`
- **Scope:** Delete 11 duplicate files; optional tsconfig exclude guardrail
- **Excluded:** ESLint version alignment (PORT-05-CI-01)
- **Acceptance criteria:**
  - [ ] No `* 2.*` source files remain
  - [ ] typecheck, lint, test pass
- **Verification:** CI commands

### PORT-05-A11Y-01 — Fix Hero typewriter screen reader behavior

- **Spec:** [05-hero-screen-reader-behavior.md](../../specs/portfolio/remediation/05-hero-screen-reader-behavior.md)
- **Plan:** [PORT-05-A11Y-01-context-pack.md](./plans/PORT-05-A11Y-01-context-pack.md)
- **Dependencies:** none
- **Files:** `components/Hero.tsx`
- **Scope:** `aria-hidden` on typewriter; sr-only static tagline; remove `aria-live` spam
- **Excluded:** CSS-only typewriter rewrite
- **Acceptance criteria:**
  - [ ] AT gets stable text; animated text hidden from AT
  - [ ] Reduced-motion E2E passes
- **Verification:** E2E homepage, axe

### PORT-05-PERF-01 — Enable Next image optimization for mshots

- **Spec:** [06-project-image-optimization.md](../../specs/portfolio/remediation/06-project-image-optimization.md)
- **Plan:** [PORT-05-PERF-01-context-pack.md](./plans/PORT-05-PERF-01-context-pack.md)
- **Dependencies:** PORT-05-WEB-02 (recommended)
- **Files:** `components/ProjectCard.tsx`
- **Scope:** Remove blanket `unoptimized` for whitelisted mshot hosts
- **Excluded:** New remote image domains
- **Acceptance criteria:**
  - [ ] Mshot cards use Next image optimizer
  - [ ] Build succeeds
- **Verification:** build, devtools inspection

### PORT-05-WEB-03 — FadeIn IntersectionObserver fallback

- **Spec:** [07-fadein-intersection-observer-fallback.md](../../specs/portfolio/remediation/07-fadein-intersection-observer-fallback.md)
- **Plan:** [PORT-05-WEB-03-context-pack.md](./plans/PORT-05-WEB-03-context-pack.md)
- **Dependencies:** none
- **Files:** `hooks/useFadeIn.ts`, `hooks/useFadeIn.test.tsx`
- **Scope:** Add `visible` when IO API missing
- **Excluded:** CSS fade-in rewrite
- **Acceptance criteria:**
  - [ ] IO-missing fallback tested and working
- **Verification:** unit

### PORT-05-TEST-01 — ProjectCard preview fallback unit tests

- **Spec:** [08-project-card-preview-tests.md](../../specs/portfolio/remediation/08-project-card-preview-tests.md)
- **Plan:** [PORT-05-TEST-01-context-pack.md](./plans/PORT-05-TEST-01-context-pack.md)
- **Dependencies:** PORT-05-WEB-02
- **Files:** `components/ProjectCard.test.tsx`
- **Scope:** Five preview resolution test cases
- **Excluded:** E2E image tests
- **Acceptance criteria:**
  - [ ] Full preview chain covered by unit tests
- **Verification:** unit

### PORT-05-CI-01 — Align eslint-config-next with Next 15

- **Spec:** [09-eslint-next-version-alignment.md](../../specs/portfolio/remediation/09-eslint-next-version-alignment.md)
- **Plan:** [PORT-05-CI-01-context-pack.md](./plans/PORT-05-CI-01-context-pack.md)
- **Dependencies:** PORT-05-CHORE-01 (recommended)
- **Files:** `package.json`, `package-lock.json`
- **Scope:** Pin `eslint-config-next` to 15.x
- **Excluded:** Next 16 upgrade
- **Acceptance criteria:**
  - [ ] eslint-config-next major matches next major
  - [ ] lint passes
- **Verification:** lint, typecheck

### PORT-05-DOCS-01 — Sync testing guide and backlog evidence

- **Spec:** [10-documentation-evidence-sync.md](../../specs/portfolio/remediation/10-documentation-evidence-sync.md)
- **Plan:** [PORT-05-DOCS-01-context-pack.md](./plans/PORT-05-DOCS-01-context-pack.md)
- **Dependencies:** other PORT-05-* (run last)
- **Files:** `e2e/e2e-and-development-testing.md`, `docs/tasks/portfolio/backlog.md`, `docs/specs/portfolio/README.md`
- **Scope:** Update test inventory, gap list, Sprint 1 checkboxes, remediation link
- **Excluded:** New E2E tests
- **Acceptance criteria:**
  - [ ] Docs match current `e2e/` suite
  - [ ] Sprint 1 evidence recorded
- **Verification:** manual review
