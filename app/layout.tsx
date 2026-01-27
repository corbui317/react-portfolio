import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Corey Bui | Developer & Systems Engineer',
  description:
    'I build modern web experiences and automation tools that bridge backend infrastructure with engaging frontends.',
  keywords: ['developer', 'systems engineer', 'React', 'Node.js', 'AWS', 'Docker'],
  authors: [{ name: 'Corey Bui' }],
  openGraph: {
    title: 'Corey Bui | Developer & Systems Engineer',
    description:
      'I build modern web experiences and automation tools that bridge backend infrastructure with engaging frontends.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corey Bui | Developer & Systems Engineer',
    description:
      'I build modern web experiences and automation tools that bridge backend infrastructure with engaging frontends.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
