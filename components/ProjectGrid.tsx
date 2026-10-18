import { FadeInSection } from '@/components/FadeInSection';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { projects } from '@/data/projects';

export function ProjectGrid() {
  return (
    <FadeInSection id="projects">
      <div className="section-container">
        <SectionHeading
          index="05"
          label="Projects"
          title="Featured Projects"
          subtitle="Selected work spanning self-hosted platforms, business sites, and personal builds."
        />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.title} className="h-full" data-reveal>
              <ProjectCard project={project} index={index + 1} />
            </li>
          ))}
        </ul>
      </div>
    </FadeInSection>
  );
}
