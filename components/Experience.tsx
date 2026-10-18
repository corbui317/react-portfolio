import { FadeInSection } from '@/components/FadeInSection';
import { RoleHighlights } from '@/components/RoleHighlights';
import { SectionHeading } from '@/components/SectionHeading';
import { roles } from '@/data/experience';

export function Experience() {
  return (
    <FadeInSection id="experience">
      <div className="section-container">
        <SectionHeading
          index="02"
          label="Experience"
          title="Career Timeline"
          subtitle="From radar simulation to data-platform services at Meta scale."
        />
        <ol className="relative border-l border-rim">
          {roles.map((role) => (
            <li
              key={`${role.company}-${role.title}`}
              className="relative pb-14 pl-8 last:pb-0 sm:pl-12"
              data-reveal
            >
              <span
                className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border-2 border-bg bg-accent"
                aria-hidden="true"
              />
              <div className="grid gap-x-12 gap-y-4 lg:grid-cols-[14rem_1fr]">
                <div>
                  <p className="font-mono text-sm text-accent">
                    {role.start} – {role.end}
                  </p>
                  <p className="eyebrow mt-2">{role.location}</p>
                </div>
                <div>
                  <h3 className="font-serif text-step-2 leading-tight">{role.title}</h3>
                  <p className="mt-1 text-ink-2">{role.company}</p>
                  <p className="mt-4 leading-relaxed text-ink-2">{role.summary}</p>
                  <RoleHighlights id={role.start.replace(/\s/g, '-')} highlights={role.highlights} />
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${role.title} technologies`}>
                    {role.tech.map((tech) => (
                      <li key={tech}>
                        <span className="tag-pill">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </FadeInSection>
  );
}
