import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useActiveSection } from './useActiveSection';

const ids = ['about', 'skills'] as const;

function TestComponent() {
  const activeId = useActiveSection(ids);
  return (
    <>
      <section id="about" />
      <section id="skills" />
      <output data-testid="active">{activeId ?? 'none'}</output>
    </>
  );
}

describe('useActiveSection', () => {
  const callbacks = new Map<Element, IntersectionObserverCallback>();
  const options: IntersectionObserverInit[] = [];

  beforeEach(() => {
    class MockIntersectionObserver {
      constructor(
        private callback: IntersectionObserverCallback,
        init?: IntersectionObserverInit
      ) {
        if (init) options.push(init);
      }
      observe = (element: Element) => {
        callbacks.set(element, this.callback);
      };
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    callbacks.clear();
    options.length = 0;
    vi.unstubAllGlobals();
  });

  function intersect(id: string) {
    const element = document.getElementById(id)!;
    const callback = callbacks.get(element)!;
    act(() => {
      callback(
        [{ isIntersecting: true, target: element } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
  }

  it('starts with no active section', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('active')).toHaveTextContent('none');
  });

  it('observes each section with the reading-band root margin', () => {
    render(<TestComponent />);
    expect(callbacks.size).toBe(2);
    expect(options.every((init) => init.rootMargin === '-40% 0px -55% 0px')).toBe(true);
  });

  it('reports the section that enters the band', () => {
    const { getByTestId } = render(<TestComponent />);
    intersect('skills');
    expect(getByTestId('active')).toHaveTextContent('skills');
    intersect('about');
    expect(getByTestId('active')).toHaveTextContent('about');
  });
});
