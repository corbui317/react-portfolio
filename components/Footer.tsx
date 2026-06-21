import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';
import { navItems, siteConfig, socialLinks } from '@/data/navigation';

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
} as const;

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--card-border)] px-4 py-12">
      <div className="section-container">
        <nav className="mb-8 flex flex-wrap justify-center gap-6" aria-label="Footer">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mb-8 flex justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.label];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="focus-ring rounded-md p-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <p className="text-center text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} {siteConfig.name} — Built with Next.js
        </p>
      </div>
    </footer>
  );
}
