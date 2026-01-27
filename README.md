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

This project is optimized for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide React](https://lucide.dev/)
