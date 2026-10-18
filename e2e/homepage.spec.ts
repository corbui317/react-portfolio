import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { navItems, siteConfig, socialLinks } from '../data/navigation';
import { projects } from '../data/projects';

const staticHeroTagline = 'Building reliable systems and polished web experiences.';

test.describe('Homepage', () => {
  test('renders all main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Corey Bui', level: 1 })).toBeVisible();
    for (const name of [
      'About Me',
      'Career Timeline',
      'Technical Expertise',
      'Education & Credentials',
      'Featured Projects',
      'Personal Infrastructure',
      'Contact',
    ]) {
      const heading = page.getByRole('heading', { name, level: 2 });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });

  test('nav highlights the section in view', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const desktopNav = page.getByRole('navigation', { name: 'Primary' });
    await desktopNav.getByRole('link', { name: 'Education' }).click();

    await expect(desktopNav.getByRole('link', { name: 'Education' })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  test('experience highlights expand and collapse', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#experience').getByRole('button', { name: /Show all/ }).first();
    await toggle.scrollIntoViewIfNeeded();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(
      page.locator('#experience').getByRole('button', { name: 'Show less' })
    ).toHaveAttribute('aria-expanded', 'true');
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

  test('hero CTA View Projects scrolls to projects section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'View Projects' }).click();
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('hero CTA Contact Me scrolls to contact section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Contact Me' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('desktop nav links reach all sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const desktopNav = page.getByRole('navigation', { name: 'Primary' });

    for (const item of navItems) {
      await desktopNav.getByRole('link', { name: item.label }).click();
      await expect(page.locator(item.href)).toBeInViewport();
    }
  });

  test('mobile nav closes after link click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: 'Open menu' });
    await menuButton.click();

    const mobileNav = page.getByRole('navigation', { name: 'Primary mobile' });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole('link', { name: 'Projects' }).click();

    await expect(mobileNav).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  test('reduced motion shows hero tagline and sections without movement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.getByText(staticHeroTagline)).toBeVisible();
    await expect(page.locator('#about')).toHaveClass(/visible/);

    const revealTransform = await page
      .locator('#about [data-reveal]')
      .first()
      .evaluate((element) => getComputedStyle(element).transform);
    expect(revealTransform).toBe('none');
  });

  test('contact mailto uses siteConfig email', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.getByRole('link', {
      name: new RegExp(`Email .* at ${siteConfig.email}`, 'i'),
    });
    await expect(emailLink).toHaveAttribute('href', `mailto:${siteConfig.email}`);
  });

  test('resume download links resolve', async ({ page, request }) => {
    await page.goto('/');

    const resumeLinks = page.locator(`a[href="${siteConfig.resumePath}"]`);
    await expect(resumeLinks).toHaveCount(2);
    await expect(resumeLinks.first()).toHaveAttribute('download', '');

    const response = await request.get(siteConfig.resumePath);
    expect(response.status()).toBe(200);
  });

  test('footer social links have noopener noreferrer', async ({ page }) => {
    await page.goto('/');

    const footer = page.getByRole('contentinfo');

    for (const link of socialLinks) {
      const socialLink = footer.getByRole('link', { name: link.label });
      await expect(socialLink).toHaveAttribute('target', '_blank');
      await expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('all projects render in grid', async ({ page }) => {
    await page.goto('/');

    const projectsSection = page.locator('#projects');

    for (const project of projects) {
      await expect(
        projectsSection.getByRole('heading', { name: project.title, level: 3 })
      ).toBeVisible();
    }
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

    const projectLink = page.getByRole('link', { name: /Personal Portfolio — opens in a new tab/i });
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
