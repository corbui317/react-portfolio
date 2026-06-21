'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navItems, siteConfig } from '@/data/navigation';

const mobileMenuId = 'mobile-primary-nav';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-md"
    >
      <div className="section-container flex items-center justify-between py-4">
        <button
          type="button"
          onClick={scrollToTop}
          className="focus-ring rounded-md text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          {siteConfig.name}
        </button>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring rounded-lg p-2 transition-colors hover:bg-[var(--surface-muted)]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={mobileMenuId}
          className="border-t border-[var(--card-border)] bg-[var(--card-bg)] md:hidden"
          aria-label="Primary mobile"
        >
          <div className="section-container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="nav-link rounded-md px-2 py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
