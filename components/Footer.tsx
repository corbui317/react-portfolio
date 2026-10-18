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
    <footer className="mt-8 border-t border-rim py-12">
      <div className="section-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-1">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.label];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="focus-ring pressable rounded-full p-2 text-ink-3 transition-colors hover:text-ink"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
      <p className="section-container mt-8 font-mono text-xs text-ink-3">
        &copy; {new Date().getFullYear()} {siteConfig.name} — Built with Next.js
      </p>
    </footer>
  );
}
