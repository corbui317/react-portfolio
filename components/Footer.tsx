import { Instagram, Facebook, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cbui17/',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/cbui17',
    icon: Facebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/corey-bui/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/cbui17',
    icon: Github,
  },
];

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="py-12 px-4 mt-20 border-t border-[var(--card-border)]">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Corey Bui — Built with Next.js
        </p>
      </div>
    </footer>
  );
}
