'use client';

import { ReactNode } from 'react';
import { useFadeIn } from '@/hooks/useFadeIn';

interface FadeInSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function FadeInSection({ id, children, className = '' }: FadeInSectionProps) {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={`fade-in section-padding ${className}`.trim()}
    >
      {children}
    </section>
  );
}
