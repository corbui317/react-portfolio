'use client';

import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

export function Contact() {
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
      id="contact"
      className="fade-in py-20 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 sm:p-12 shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="text-[var(--muted)] mb-6">
            Want to collaborate or say hi?
          </p>
          <a
            href="mailto:corbui317@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Mail className="w-5 h-5" />
            corbui317@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
