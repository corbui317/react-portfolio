import { FadeInSection } from '@/components/FadeInSection';
import { SectionHeading } from '@/components/SectionHeading';
import { skillGroups } from '@/data/skills';

export function Skills() {
  return (
    <FadeInSection id="skills">
      <div className="section-container">
        <SectionHeading
          title="Skills & Focus"
          subtitle="A practical mix of frontend craft, systems engineering, and cloud operations."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="surface-card p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="tag-pill">{skill}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
