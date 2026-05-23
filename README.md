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
npm run build
npm start
```

## Project Structure

```
react-portfolio/
├── app/
│   ├── layout.tsx       # Root layout with metadata, fonts, ThemeProvider
│   ├── page.tsx         # Home page composing all sections
│   └── globals.css      # Tailwind imports + custom properties
├── components/
│   ├── Header.tsx       # Sticky nav with theme toggle
│   ├── Hero.tsx         # Typewriter effect + intro
│   ├── About.tsx        # About section
│   ├── ProjectGrid.tsx  # Grid of project cards with previews
│   ├── ProjectCard.tsx  # Individual project card
│   ├── Contact.tsx      # Contact section
│   ├── Footer.tsx       # Footer with social links
│   └── ThemeProvider.tsx # Dark/light mode context
├── public/              # Static assets
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
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
   - No GitHub Actions workflow needed - Vercel handles everything

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
