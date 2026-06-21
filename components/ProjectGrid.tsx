import { FadeInSection } from '@/components/FadeInSection';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { projects } from '@/data/projects';

export function ProjectGrid() {
  return (
    <FadeInSection id="projects">
      <div className="section-container">
        <SectionHeading
          title="Featured Projects"
          subtitle="Selected work spanning self-hosted platforms, business sites, and personal builds."
        />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </FadeInSection>
  );
}
