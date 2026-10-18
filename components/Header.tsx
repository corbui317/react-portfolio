'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useActiveSection } from '@/hooks/useActiveSection';
import { navItems, siteConfig } from '@/data/navigation';

const mobileMenuId = 'mobile-primary-nav';
const sectionIds = navItems.map((item) => item.href.slice(1));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  const scrollToTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-rim bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md"
    >
      <div className="section-container flex items-center justify-between py-4">
        <button
          type="button"
          onClick={scrollToTop}
          className="focus-ring pressable rounded-md font-serif text-xl tracking-display"
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={activeId === item.href.slice(1) ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring pressable rounded-full p-2 text-ink-2 transition-colors hover:text-ink"
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
          className="mobile-panel border-t border-rim bg-bg lg:hidden"
          data-open="true"
          aria-label="Primary mobile"
        >
          <div className="section-container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="focus-ring rounded-md px-2 py-3 font-serif text-2xl text-ink-2 transition-colors hover:text-ink"
                aria-current={activeId === item.href.slice(1) ? 'true' : undefined}
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
