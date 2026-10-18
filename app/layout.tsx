import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteConfig } from '@/data/navigation';
import { serializeJsonLd } from '@/lib/serializeJsonLd';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-mono',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f6f1' },
    { media: '(prefers-color-scheme: dark)', color: '#100e0c' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'developer',
    'systems engineer',
    'React',
    'Next.js',
    'Node.js',
    'AWS',
    'Docker',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/logo512.png',
        width: 512,
        height: 512,
        alt: `${siteConfig.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/logo512.png'],
  },
  icons: {
    icon: [
      { url: '/logo_favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/logo192.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: siteConfig.role,
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Wayne State University' },
  address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX' },
  sameAs: [
    'https://github.com/corbui317',
    'https://www.linkedin.com/in/corey-bui/',
    'https://www.instagram.com/cbui17/',
    'https://www.facebook.com/cbui17',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSerif.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
