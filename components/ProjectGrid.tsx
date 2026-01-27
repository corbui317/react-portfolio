'use client';

import { useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'HomeVault',
    url: 'https://home-vault.me',
    preview: 'https://s.wordpress.com/mshots/v1/https://home-vault.me?w=800&h=600',
    description: 'Self-hosted photo management solution',
  },
  {
    title: 'Personal Portfolio',
    url: 'https://coreybui.com',
    description: 'This website - built with Next.js',
  },
  {
    title: 'Soleil Nail Lounge',
    url: 'https://lenail.info',
    preview: 'https://s.wordpress.com/mshots/v1/https://lenail.info?w=800&h=600',
    description: 'Modern nail salon website',
  },
];

export function ProjectGrid() {
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
      id="projects"
      className="fade-in py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              url={project.url}
              preview={project.preview}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
