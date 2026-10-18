import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { navItems } from '@/data/navigation';
import { Header } from './Header';

vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <button type="button">Theme toggle</button>,
}));

describe('Header', () => {
  it('renders all primary nav links', () => {
    render(<Header />);

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    for (const item of navItems) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
  });

  it('toggles mobile menu aria-expanded', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Primary mobile' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
