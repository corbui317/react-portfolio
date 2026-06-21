# Feature: Homepage Experience

## Objective

Single-page portfolio with sticky navigation, animated hero, content sections, and theme toggle. Mobile-first, accessible, and motion-respecting.

## Affected Files

| File | Role |
| --- | --- |
| `app/page.tsx` | Composes all sections |
| `components/Header.tsx` | Sticky nav, mobile menu, theme toggle |
| `components/Hero.tsx` | Intro, typewriter, CTAs, social links |
| `components/About.tsx` | About section with highlight cards |
| `components/Skills.tsx` | Skill groups from data |
| `components/ProjectGrid.tsx` | Project grid wrapper |
| `components/Contact.tsx` | Mailto CTA |
| `components/Footer.tsx` | Nav repeat, social icons, copyright |
| `components/FadeInSection.tsx` | Scroll fade-in wrapper |
| `components/ThemeToggle.tsx` | Dark/light toggle |
| `components/ThemeProvider.tsx` | next-themes provider |
| `hooks/useFadeIn.ts` | Intersection Observer fade-in |
| `data/navigation.ts` | Nav items, site config, social links |
| `data/skills.ts` | Skill groups |

## Behavior Requirements

### Page Structure

- `app/page.tsx` renders: Header → main#main → Hero, About, Skills, ProjectGrid, Contact → Footer.
- Each content section uses `FadeInSection` with stable `id` anchors: `#about`, `#skills`, `#projects`, `#contact`.
- Header has `id="top"` for Home nav target.

### Header & Navigation

- Sticky header with backdrop blur and site name button scrolling to top.
- Desktop (`md+`): horizontal nav with all `navItems`, theme toggle inline.
- Mobile: theme toggle + hamburger; menu expands with `aria-expanded`, `aria-controls`, labeled nav.
- Nav links use hash anchors from `data/navigation.ts`.

### Hero

- Displays `siteConfig.name`, role label, description.
- Typewriter cycles phrases when `prefers-reduced-motion: no-preference`.
- Static tagline when reduced motion preferred.
- `aria-live="polite"` on animated tagline only when motion enabled.
- CTAs: "View Projects" → `#projects`, "Contact Me" → `#contact`.
- GitHub and LinkedIn links from `socialLinks` open in new tab with `rel="noopener noreferrer"`.

### About & Skills

- About: three highlight cards in responsive grid.
- Skills: three groups from `skillGroups` with tag pills.

### Contact

- Mailto link to `siteConfig.email` with descriptive `aria-label`.
- Response-time copy visible.

### Footer

- Repeats nav links and social icons.
- Copyright with current year and site name.

### Theme

- `ThemeProvider`: `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- `ThemeToggle`: toggles light/dark; avoids hydration mismatch via `useSyncExternalStore`.
- `aria-label` reflects target mode ("Switch to light/dark mode").

### Motion

- `useFadeIn`: adds `visible` class immediately when `prefers-reduced-motion: reduce`.
- Otherwise uses IntersectionObserver at threshold 0.12, unobserves after visible.

## Acceptance Criteria

- [ ] Skip link targets `#main` (in layout)
- [ ] All five nav sections reachable via hash links
- [ ] Mobile menu opens/closes with correct ARIA attributes
- [ ] Theme toggle changes resolved theme without hydration errors
- [ ] Hero shows static tagline under reduced motion
- [ ] Contact mailto uses `siteConfig.email`
- [ ] Footer social links open externally with `noopener noreferrer`
- [ ] E2E: landing page loads all sections; skip link works; mobile nav works; theme toggles

## Edge Cases

- JavaScript disabled: content still visible (fade-in sections may lack animation)
- Very narrow viewport: CTAs stack full-width
- Menu open + nav click: menu closes
- Theme toggle before hydration: safe default icon

## Dependency Map

**Tests:**

- `components/Header.test.tsx`
- `components/ThemeToggle.test.tsx`
- `hooks/useFadeIn.test.ts`
- `e2e/homepage.spec.ts`

## Verification

- Unit/component tests (Vitest + RTL)
- E2E (Playwright): section presence, skip link, mobile nav, theme toggle
- Manual: responsive check at 375px / 768px / 1280px
