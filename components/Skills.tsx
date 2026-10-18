import { FadeInSection } from '@/components/FadeInSection';
import { SectionHeading } from '@/components/SectionHeading';
import { skillGroups } from '@/data/skills';

export function Skills() {
  return (
    <FadeInSection id="skills">
      <div className="section-container">
        <SectionHeading
          index="03"
          label="Skills"
          title="Technical Expertise"
          subtitle="Backend and data-platform depth, with the frontend and ops range to ship end to end."
        />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <article key={group.title} className="border-t border-rim pt-6" data-reveal>
              <p className="eyebrow">
                <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
              </p>
              <h3 className="mt-2 font-serif text-step-2">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
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
