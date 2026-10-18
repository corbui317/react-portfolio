import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { RoleHighlights } from './RoleHighlights';

const highlights = ['First', 'Second', 'Third', 'Fourth'];

describe('RoleHighlights', () => {
  it('shows a toggle only when there are hidden highlights', () => {
    render(<RoleHighlights id="short" highlights={['First', 'Second']} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('toggles aria-expanded and the panel state', async () => {
    const user = userEvent.setup();
    const { container } = render(<RoleHighlights id="long" highlights={highlights} />);

    const toggle = screen.getByRole('button', { name: 'Show all 4' });
    const panel = container.querySelector('#role-highlights-long');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'role-highlights-long');
    expect(panel).toHaveAttribute('data-open', 'false');

    await user.click(toggle);

    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(panel).toHaveAttribute('data-open', 'true');
  });
});
