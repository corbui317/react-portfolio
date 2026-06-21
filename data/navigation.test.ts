import { describe, expect, it } from 'vitest';
import { navItems, siteConfig, socialLinks } from './navigation';

describe('navigation data contract', () => {
  it('navItems use hash anchors', () => {
    for (const item of navItems) {
      expect(item.href.startsWith('#')).toBe(true);
      expect(item.label.length).toBeGreaterThan(0);
    }
  });

  it('siteConfig has HTTPS canonical url', () => {
    expect(siteConfig.url.startsWith('https://')).toBe(true);
    expect(siteConfig.name.length).toBeGreaterThan(0);
    expect(siteConfig.email).toContain('@');
  });

  it('socialLinks use HTTPS urls', () => {
    for (const link of socialLinks) {
      expect(link.href.startsWith('https://')).toBe(true);
    }
  });
});
