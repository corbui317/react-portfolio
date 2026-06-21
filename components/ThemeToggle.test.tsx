import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

const setTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme,
    resolvedTheme: 'light',
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    setTheme.mockClear();
  });

  it('has accessible name for switching to dark mode', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', { name: 'Switch to dark mode' });
    expect(button).toBeInTheDocument();
  });

  it('calls setTheme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', { name: 'Switch to dark mode' });
    await user.click(button);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
