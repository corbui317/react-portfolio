'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { siteConfig, socialLinks } from '@/data/navigation';

const phrases = ['Creative developer.', 'Systems engineer.', 'Automation builder.'];
const staticTagline = 'Building reliable systems and polished web experiences.';

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setMotionEnabled(!mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          pauseTimeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
        }
      } else if (charIndex > 0) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? 45 : 90);

    return () => {
      clearTimeout(timeout);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [charIndex, isDeleting, motionEnabled, phraseIndex]);

  const githubLink = socialLinks.find((link) => link.label === 'GitHub');
  const linkedInLink = socialLinks.find((link) => link.label === 'LinkedIn');

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[min(78vh,720px)] items-center overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_color-mix(in_srgb,var(--accent)_12%,transparent),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="section-container-narrow text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:text-sm">
          Developer & Systems Engineer
        </p>
        <h1
          id="hero-heading"
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {siteConfig.name}
        </h1>
        <p
          className="mt-4 min-h-[2rem] text-lg font-medium text-[var(--accent)] sm:text-xl"
          aria-live={motionEnabled ? 'polite' : undefined}
        >
          {motionEnabled ? (
            <span className="typewriter-cursor">{displayText}</span>
          ) : (
            staticTagline
          )}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a href="#projects" className="btn-primary w-full sm:w-auto">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary w-full sm:w-auto">
            Contact Me
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {githubLink ? (
            <a
              href={githubLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          ) : null}
          {linkedInLink ? (
            <a
              href={linkedInLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          ) : null}
        </div>

        <a
          href="#about"
          className="focus-ring mt-14 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          Learn more
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
