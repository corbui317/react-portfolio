'use client';

import { useEffect, useRef } from 'react';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="fade-in py-20 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          <div className="space-y-4 text-[var(--muted)] leading-relaxed">
            <p>
              I&apos;m a systems engineer and web developer with a passion for
              simplifying complexity. My toolkit includes Docker, Linux, React,
              Node.js, and cloud technologies like AWS.
            </p>
            <p>
              Outside of tech, I love watching movies, cooking, playing music
              (piano, guitar, trumpet), and tinkering with servers just for fun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
