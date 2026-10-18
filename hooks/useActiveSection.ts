'use client';

import { useEffect, useState } from 'react';

// Tracks which section sits in the band 40–45% down the viewport
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observers: IntersectionObserver[] = [];

    key.split('|').forEach((id) => {
      const section = document.getElementById(id);
      if (!section) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [key]);

  return activeId;
}
