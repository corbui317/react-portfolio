# E2E and Development Testing Guide

Comprehensive verification guide for the Corey Bui portfolio. This document defines how to run tests, what each layer covers, how to add new E2E tests, and how to collect evidence before marking work done.

**Related docs:**

- [Spec index](../docs/specs/portfolio/README.md)
- [Agent workflows](../docs/agents/portfolio-agent-workflows.md)
- [Implementation backlog](../docs/tasks/portfolio/backlog.md)
- [CI workflow](../.github/workflows/ci.yml)

---

## Purpose

Portfolio work follows **spec-driven design**: specs define behavior, tasks scope implementation, and **verification provides evidence** that acceptance criteria are met.

Claims without evidence are not valid completion. Every `PORT-*` task or PR should record:

- Commands run and their outcome
- Screenshots or traces for visual/UI changes
- Accessibility scan results when UI changes
- Documented blockers when full verification is not possible

Default quality posture: **NEEDS WORK** until evidence supports the claim.

---

## Test Layers

| Layer | Tool | Scope | When to run |
| --- | --- | --- | --- |
| Typecheck | `tsc --noEmit` | TypeScript correctness | Every change |
| Lint | ESLint | Code style and Next.js rules | Every change |
| Unit / component | Vitest + RTL | Data contracts, hooks, isolated components | Logic or component changes |
| Build | `next build` | Static generation, metadata routes | Before E2E in CI; after structural changes |
| E2E | Playwright + axe | Full-page flows, navigation, a11y | UX, layout, or integration changes |
| CI | GitHub Actions | All of the above in sequence | Every push/PR to `main` |
| Manual | Lighthouse, responsive review | Performance, SEO, visual polish | Major releases, visual redesigns |

### What belongs where

- **Vitest** — fast, isolated tests for `data/*` contracts, `ProjectCard` URL safety, `Header` ARIA, `ThemeToggle` callbacks, `useFadeIn` reduced-motion path.
- **Playwright** — browser-realistic tests for section presence, keyboard navigation, mobile menu, theme toggle, external links, and axe accessibility scans.
- **Manual** — Lighthouse scores, responsive screenshots at multiple breakpoints, and subjective design review. Not automated in CI today.

---

## Command Reference

```bash
# Install dependencies (first time or after package changes)
npm ci

# Development server (manual testing)
npm run dev

# Static analysis
npm run typecheck
npm run lint

# Unit and component tests
npm run test              # single run
npm run test:watch        # watch mode during development

# Production build (required before CI-style E2E)
npm run build
npm start                 # optional: verify production build locally

# End-to-end tests
npm run test:e2e          # local: uses dev server via playwright.config.ts
npm run test:e2e:ci       # CI-style: Chromium only, uses production server after build

# Full local verification (matches CI)
npm run typecheck && npm run lint && npm run test && npm run build && npm run test:e2e:ci
```

### Playwright configuration

- Config: [`playwright.config.ts`](../playwright.config.ts)
- Test directory: [`e2e/`](../e2e/)
- Local: `webServer` runs `npm run dev` on `http://127.0.0.1:3000`
- CI: `webServer` runs `npm run start` after `npm run build`
- Browser: Chromium only in CI (`test:e2e:ci`)
- Retries: 2 in CI, 0 locally
- Traces: `on-first-retry` (inspect failed runs in Playwright trace viewer)

### Vitest configuration

- Config: [`vitest.config.ts`](../vitest.config.ts)
- Setup: [`vitest.setup.tsx`](../vitest.setup.tsx)
- Includes: `**/*.{test,spec}.{ts,tsx}` excluding `e2e/**`

---

## Current Test Inventory

### Unit and component tests

| File | Covers |
| --- | --- |
| `data/navigation.test.ts` | Nav hash hrefs, HTTPS `siteConfig.url`, email present |
| `data/projects.test.ts` | Non-empty projects, required fields, HTTPS URLs |
| `components/Header.test.tsx` | Nav labels, mobile menu `aria-expanded` toggle |
| `components/ThemeToggle.test.tsx` | Accessible name, `setTheme` on click |
| `components/ProjectCard.test.tsx` | HTTPS link vs non-link article, tags |
| `hooks/useFadeIn.test.tsx` | Ref return, reduced-motion visible class |

### E2E tests (`e2e/homepage.spec.ts`)

| Test | Spec source |
| --- | --- |
| Renders all main sections | [01-homepage-experience](../docs/specs/portfolio/01-homepage-experience.md) |
| Skip link focuses main content | [01-homepage](../docs/specs/portfolio/01-homepage-experience.md), [03-seo-a11y](../docs/specs/portfolio/03-seo-accessibility-performance.md) |
| Mobile nav opens and shows links | [01-homepage](../docs/specs/portfolio/01-homepage-experience.md) |
| Theme toggle switches mode | [01-homepage](../docs/specs/portfolio/01-homepage-experience.md) |
| Project section has HTTPS external link | [02-project-content](../docs/specs/portfolio/02-project-content-and-cards.md) |
| No critical axe violations | [03-seo-a11y](../docs/specs/portfolio/03-seo-accessibility-performance.md) |

---

## E2E Coverage Checklist

Use this when planning new Playwright tests or reviewing PRs.

### Covered (current)

- [x] All five content section headings visible on load
- [x] Skip link keyboard focus and `#main` target
- [x] Mobile menu opens at 375px width
- [x] Theme toggle changes `html` class
- [x] At least one HTTPS project link with new-tab semantics
- [x] Axe scan: no critical/serious violations (color-contrast rule disabled)

### Gaps (next E2E candidates)

Map each gap to a spec acceptance criterion before implementing.

| Gap | Spec | Suggested test |
| --- | --- | --- |
| Hero CTA "View Projects" scrolls to `#projects` | 01-homepage | Click CTA; assert `#projects` in viewport or URL hash |
| Hero CTA "Contact Me" scrolls to `#contact` | 01-homepage | Same pattern for `#contact` |
| Desktop nav hash links reach sections | 01-homepage | Click each nav item; assert section visible |
| Mobile nav closes after link click | 01-homepage edge case | Open menu, click link, assert menu hidden |
| Reduced-motion static tagline | 01-homepage | `page.emulateMedia({ reducedMotion: 'reduce' })`; assert no typewriter animation |
| Contact mailto uses `siteConfig.email` | 01-homepage | Assert `href` starts with `mailto:` and contains configured email |
| Footer social links `noopener noreferrer` | 01-homepage | Assert `rel` and `target` on footer external links |
| All projects render in grid | 02-projects | Count cards matches `projects.length` |
| Non-HTTPS URL renders non-link card | 02-projects | Requires test fixture or mock data branch |
| `/robots.txt` generated | 03-seo-a11y | `page.goto('/robots.txt')`; assert sitemap reference |
| `/sitemap.xml` generated | 03-seo-a11y | `page.goto('/sitemap.xml')`; assert canonical URL |
| JSON-LD Person schema in HTML | 03-seo-a11y | Assert `application/ld+json` script with `@type: Person` |
| Responsive layout at tablet/desktop | 01-homepage manual | Viewport 768px and 1280px; section layout smoke |

Priority order for new suites:

1. Navigation and anchor behavior (high user impact)
2. Contact mailto and footer link attributes (security/a11y)
3. SEO routes (`robots.txt`, `sitemap.xml`, JSON-LD)
4. Reduced-motion hero behavior
5. Full responsive matrix (consider Playwright projects for multiple viewports)

---

## Adding New E2E Tests

### Workflow

1. Read the linked spec acceptance criteria in `docs/specs/portfolio/`.
2. Pick or create a `PORT-*` task in `docs/tasks/portfolio/backlog.md`.
3. Add tests under `e2e/` — one spec file per feature area (e.g. `homepage.spec.ts`, `seo-routes.spec.ts`).
4. Prefer role-based selectors (`getByRole`, `getByLabel`) over CSS classes.
5. Run `npm run test:e2e` locally; run full CI sequence before marking done.
6. Record evidence in the task or PR (see Evidence Collector below).

### Conventions

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature area', () => {
  test('behavior from spec §section', async ({ page }) => {
    await page.goto('/');
    // Arrange → Act → Assert
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
  });
});
```

- Use `test.describe` to group related scenarios.
- Name tests after spec behavior, not implementation details.
- For accessibility scans, use `@axe-core/playwright` and filter by impact level consistently with existing tests.
- Do not assert pixel-perfect layout; assert presence, focus, ARIA, and link attributes.

### Accessibility testing with axe

Existing pattern in `e2e/homepage.spec.ts`:

```typescript
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page })
  .disableRules(['color-contrast']) // document any disabled rules
  .analyze();

const critical = results.violations.filter(
  (v) => v.impact === 'critical' || v.impact === 'serious'
);
expect(critical).toEqual([]);
```

When disabling rules, document why in the test comment and in PR evidence.

---

## Evidence Collector Protocol

Adapted from the Evidence Collector agent workflow. Use this when verifying UI changes, new features, or before marking `PORT-*` tasks done.

### Mandatory artifacts

| Change type | Required evidence |
| --- | --- |
| Any UI/visual change | Before and after screenshots |
| Responsive change | Screenshots at 375px, 768px, 1280px |
| Interactive element | Before/after or action sequence showing state change |
| E2E addition | Passing `npm run test:e2e` output |
| Full task completion | Full CI command sequence output |
| Accessibility claim | Axe results or Lighthouse a11y score with URL |
| Performance claim | Lighthouse report with URL and date |

### Screenshot capture

**Option A — Playwright (recommended for reproducibility)**

```bash
# Run E2E with headed browser for debugging
npx playwright test --headed

# Capture trace on failure (automatic on retry in CI)
npx playwright show-trace test-results/.../trace.zip
```

Add screenshot steps in tests when needed:

```typescript
await page.screenshot({ path: 'test-results/homepage-mobile.png', fullPage: true });
```

**Option B — Manual**

Capture from browser DevTools device toolbar at 375, 768, and 1280 widths. Store in PR description or `docs/tasks/portfolio/plans/` evidence section.

### Evidence report template

Copy into PR description, task notes, or plan verification section:

```markdown
## Verification Evidence — {TASK_ID}

**Date:** YYYY-MM-DD
**Verifier:** {name or agent}

### Commands run
- [ ] `npm run typecheck` — PASS / FAIL
- [ ] `npm run lint` — PASS / FAIL
- [ ] `npm run test` — PASS / FAIL ({N} tests)
- [ ] `npm run build` — PASS / FAIL
- [ ] `npm run test:e2e:ci` — PASS / FAIL ({N} tests)

### Specification compliance
| Criterion | Evidence | Result |
| --- | --- | --- |
| {from spec acceptance criteria} | {screenshot, test name, or output} | PASS / FAIL |

### Visual evidence
- Desktop (1280px): {path or "attached in PR"}
- Tablet (768px): {path}
- Mobile (375px): {path}

### Interactive testing
- Navigation: {PASS/FAIL — what was tested}
- Theme toggle: {PASS/FAIL}
- Mobile menu: {PASS/FAIL}
- Forms/contact: {PASS/FAIL or N/A}

### Accessibility
- Axe critical/serious: {0 violations / list}
- Disabled rules: {list or none}

### Issues found
1. {Issue} — Priority: {Critical/Medium/Low} — Evidence: {reference}

### Quality assessment
- **Production readiness:** NEEDS WORK / READY
- **Blockers:** {list or none}
```

### Automatic fail triggers

Do not mark work done when:

- Claims lack screenshots or test output
- "Zero issues" with no evidence reviewed
- E2E or unit tests were not run after code changes
- Spec acceptance criteria are unchecked without documented blockers

---

## CI Pipeline

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs on push and pull request to `main`:

1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm run test`
5. `npm run build`
6. `npx playwright install chromium --with-deps`
7. `npm run test:e2e:ci`

A green CI run is necessary but not sufficient for visual or performance claims — those still require manual evidence per the quality bar in [00-portfolio-roadmap](../docs/specs/portfolio/00-portfolio-roadmap.md).

---

## Done Criteria

A `PORT-*` task is **verified** when:

1. All acceptance criteria in the linked spec are met or explicitly deferred with a backlog item.
2. Appropriate test layer(s) were added or updated (unit for logic, E2E for user flows).
3. CI commands pass locally or in the PR pipeline.
4. Evidence report is attached (template above) for non-trivial changes.
5. Backlog task status is updated with evidence summary and date.

A PR is **merge-ready** when:

- CI is green
- Task ID referenced in commit message (e.g. `docs: PORT-00-DOCS-06 add testing guide`)
- Evidence section in PR description for UI or behavior changes

---

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| E2E timeout on `webServer` | Port 3000 in use | Stop other dev servers or change `PORT` in config |
| Theme test flaky | Hydration delay | Use `expect.poll` on `html` class (existing pattern) |
| Axe color-contrast failures | Theme tokens | Document disable or fix contrast in CSS |
| Vitest cannot resolve `@/` | Alias config | Check `vitest.config.ts` resolve.alias |
| CI E2E fails but local passes | Dev vs production server | Run `npm run build && npm run test:e2e:ci` locally |

---

## Future work (not in scope today)

- Multi-browser Playwright matrix (Firefox, WebKit)
- Lighthouse CI performance budget ([PORT-03-PERF-01](../docs/tasks/portfolio/backlog.md))
- Visual regression snapshots (Percy, Playwright screenshot comparison)
- Contact form E2E ([PORT-04-WEB-01](../docs/tasks/portfolio/backlog.md))
