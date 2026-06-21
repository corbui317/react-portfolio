import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('renders all main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Corey Bui', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Skills & Focus' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
  });

  test('skip link focuses main content', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();

    await skipLink.click();
    await expect(page.locator('#main')).toBeVisible();
  });

  test('mobile nav opens and shows links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: 'Open menu' });
    await menuButton.click();

    const mobileNav = page.getByRole('navigation', { name: 'Primary mobile' });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'Projects' })).toBeVisible();
  });

  test('theme toggle switches mode', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const initialClass = (await html.getAttribute('class')) ?? '';

    const themeButton = page.getByRole('button', { name: /Switch to (light|dark) mode/i });
    await themeButton.click();

    await expect
      .poll(async () => (await html.getAttribute('class')) ?? '')
      .not.toBe(initialClass);
  });

  test('project section has HTTPS external link', async ({ page }) => {
    await page.goto('/');

    const projectLink = page.getByRole('link', { name: /HomeVault — opens in a new tab/i });
    await expect(projectLink).toBeVisible();
    await expect(projectLink).toHaveAttribute('href', /^https:\/\//);
  });

  test('has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();

    const critical = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious'
    );
    expect(critical).toEqual([]);
  });
});
