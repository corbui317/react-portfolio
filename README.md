# Corey Bui - Portfolio

A modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15 App Router** - Server-side rendering and static generation
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Dark/Light Mode** - Theme switching with system preference support (next-themes)
- **Responsive Design** - Mobile-first approach
- **Optimized Images** - Using next/image for automatic optimization
- **Typewriter Effect** - Custom React hook for animated text
- **Scroll Animations** - Intersection Observer for fade-in effects

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm start
```

### Testing

```bash
npm run test              # Vitest unit/component tests
npm run test:watch        # Vitest watch mode
npm run test:e2e          # Playwright E2E (local, uses dev server)
npm run test:e2e:ci       # Playwright E2E (Chromium only, for CI)
```

Full verification workflow, E2E coverage checklist, and Evidence Collector standards: [e2e/e2e-and-development-testing.md](e2e/e2e-and-development-testing.md).

## Spec-Driven Development

This project uses **spec-driven design** adapted from [Homeify](https://github.com/royalraj95/homeify-app). Specs are the product contract; tasks and tests provide evidence before work is marked done.

### Workflow

1. **Spec** — define behavior in `docs/specs/portfolio/`
2. **Task** — pick a `PORT-*` item from `docs/tasks/portfolio/backlog.md`
3. **Plan** — for non-trivial work, create a context pack in `docs/tasks/portfolio/plans/`
4. **Implement** — one task scope at a time
5. **Verify** — run tests and record evidence in the backlog or PR

See [docs/agents/portfolio-agent-workflows.md](docs/agents/portfolio-agent-workflows.md) for the full lifecycle and [docs/adr/ADR-001-spec-driven-design.md](docs/adr/ADR-001-spec-driven-design.md) for the architectural decision.

### Starting a Task in Cursor

```text
Create an MD Plan for PORT-XX-AREA-NN only. Read the linked spec and backlog task.
Use the template in docs/tasks/portfolio/plans/README.md. Do not implement code.
```

After review, implement the plan and run verification before marking the task done.

## Project Structure

```
react-portfolio/
├── app/
│   ├── layout.tsx       # Root layout with metadata, fonts, ThemeProvider
│   ├── page.tsx         # Home page composing all sections
│   ├── sitemap.ts       # Sitemap generation
│   ├── robots.ts        # Robots rules
│   └── globals.css      # Tailwind imports + custom properties
├── components/
│   ├── Header.tsx       # Sticky nav with theme toggle
│   ├── Hero.tsx         # Typewriter effect + intro
│   ├── About.tsx        # About section
│   ├── Skills.tsx       # Skills & focus groups
│   ├── ProjectGrid.tsx  # Grid of project cards with previews
│   ├── ProjectCard.tsx  # Individual project card
│   ├── Contact.tsx      # Contact section
│   ├── Footer.tsx       # Footer with social links
│   ├── FadeInSection.tsx
│   ├── SectionHeading.tsx
│   ├── ThemeToggle.tsx
│   └── ThemeProvider.tsx # Dark/light mode context
├── data/
│   ├── navigation.ts    # Site config, nav, social links
│   ├── projects.ts      # Project content
│   └── skills.ts        # Skill groups
├── docs/
│   ├── adr/             # Architecture decision records
│   ├── agents/          # Agent workflow guides
│   ├── specs/portfolio/ # Feature specifications (product contract)
│   └── tasks/portfolio/ # Implementation backlog and plans
├── e2e/                 # Playwright end-to-end tests + testing guide
├── hooks/
│   └── useFadeIn.ts     # Scroll fade-in observer
├── public/              # Static assets
├── .github/workflows/   # CI pipeline
├── next.config.js
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

## Deployment

This project is configured for deployment on Vercel with automatic deployments from GitHub.

### Vercel Deployment (Recommended)

1. **Connect to Vercel**:
   - Go to https://vercel.com and sign in with GitHub
   - Click "Add New" → "Project"
   - Import the `react-portfolio` repository
   - **Important**: Leave the root directory as `.` (default) - the app is at the repository root
   - Vercel will auto-detect Next.js and configure the build settings

2. **Configure Custom Domain** (Optional):
   - In your Vercel project dashboard, go to "Settings" → "Domains"
   - Add your custom domain (e.g., `coreybui.com`)
   - Update your DNS records with the nameservers or CNAME records provided by Vercel
   - Vercel will automatically provision and manage SSL certificates

3. **Automatic Deployments**:
   - Every push to the `main` branch will trigger a production deployment
   - Pull requests will get preview deployments with unique URLs
   - GitHub Actions CI runs typecheck, lint, unit tests, build, and E2E on push/PR to `main`

### CI Verification

The [`.github/workflows/ci.yml`](.github/workflows/ci.yml) workflow runs:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e:ci
```

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Benefits of Vercel Hosting

- Zero-config deployments
- Automatic HTTPS/SSL certificates
- Global edge network CDN
- Preview deployments for pull requests
- Built-in analytics
- No server maintenance required

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide React](https://lucide.dev/)

## Security Notes

- This portfolio is a public site and does not currently implement authentication, sessions, protected routes, API routes, or server actions.
- Keep authentication state server-enforced if protected features are added later. Use a vetted provider and HttpOnly, Secure, SameSite cookies; do not store access or refresh tokens in `localStorage` or `sessionStorage`.
- Protect private pages and data on the server through middleware, route handlers, or server actions. Client-side UI hiding is not an authorization boundary.
- Project links and preview URLs should remain HTTPS-only. If project data becomes CMS- or API-driven, validate URLs before rendering them.
- Project previews currently use WordPress mshots. To remove that third-party dependency, replace previews with self-hosted screenshots under `public/`, then remove `s.wordpress.com` from `next.config.js`.
