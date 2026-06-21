import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
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
