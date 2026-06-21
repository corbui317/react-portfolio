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

---

## Sprint Grouping

**Sprint 1 (complete):** PORT-00-DOCS-*, PORT-00-TEST-*, PORT-00-CI-01, PORT-01-TEST-*, PORT-02-TEST-*, PORT-01-E2E-01, PORT-00-DOCS-05

**Future (not scheduled):**

- PORT-03-WEB-01 — Self-hosted project screenshots
- PORT-03-PERF-01 — Lighthouse performance budget in CI
- PORT-04-WEB-01 — Contact form with server action
