import { test, expect } from '@playwright/test';
import { siteConfig } from '../data/navigation';

const brandAssets = [
  '/logo_favicon.svg',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
] as const;

test.describe('Brand assets', () => {
  for (const assetPath of brandAssets) {
    test(`${assetPath} is served with 200`, async ({ request }) => {
      const response = await request.get(assetPath);
      expect(response.ok()).toBeTruthy();
    });
  }
});

test.describe('SEO routes', () => {
  test('robots.txt allows crawling and references sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain('User-Agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toContain(`Sitemap: ${siteConfig.url}/sitemap.xml`);
  });

  test('sitemap.xml includes canonical homepage entry', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain(`<loc>${siteConfig.url}</loc>`);
    expect(body).toContain('<changefreq>monthly</changefreq>');
    expect(body).toContain('<priority>1</priority>');
  });

  test('homepage includes Person JSON-LD schema', async ({ page }) => {
    await page.goto('/');

    const script = page.locator('script[type="application/ld+json"]');
    await expect(script).toHaveCount(1);

    const schema = JSON.parse((await script.textContent()) ?? '{}');
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.url).toBe(siteConfig.url);
    expect(schema.email).toBe(siteConfig.email);
    expect(schema.jobTitle).toBe('Developer & Systems Engineer');
    expect(schema.sameAs).toEqual([
      'https://github.com/cbui17',
      'https://www.linkedin.com/in/corey-bui/',
      'https://www.instagram.com/cbui17/',
      'https://www.facebook.com/cbui17',
    ]);
  });
});
