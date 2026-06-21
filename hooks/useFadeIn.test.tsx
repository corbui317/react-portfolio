import { render } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useFadeIn } from './useFadeIn';

function TestComponent() {
  const ref = useFadeIn<HTMLDivElement>();
  return <div ref={ref} data-testid="fade-target" />;
}

describe('useFadeIn', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- mock constructor signature
      constructor(_callback: IntersectionObserverCallback) {}
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.unstubAllGlobals();
  });

  it('returns a ref attached to the element', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('fade-target')).toBeInTheDocument();
  });

  it('adds visible class immediately when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('fade-target')).toHaveClass('visible');
  });
});
