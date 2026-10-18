import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-ibm-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        rim: 'var(--rim)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-fg': 'var(--accent-fg)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
      },
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)',
      },
      letterSpacing: {
        display: '-0.025em',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        drawer: 'var(--ease-drawer)',
      },
      boxShadow: {
        card: 'var(--shadow-md)',
        'card-lg': 'var(--shadow-lg)',
      },
      spacing: {
        header: 'var(--header-offset)',
      },
    },
  },
  plugins: [],
};

export default config;
