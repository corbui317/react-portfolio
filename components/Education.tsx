import { FadeInSection } from '@/components/FadeInSection';
import { SectionHeading } from '@/components/SectionHeading';
import { credentials, degrees } from '@/data/education';

export function Education() {
  return (
    <FadeInSection id="education">
      <div className="section-container">
        <SectionHeading
          index="04"
          label="Education"
          title="Education & Credentials"
          subtitle="A computer science and engineering foundation, plus cloud and service-management certifications."
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-12" data-reveal>
            <h3 className="eyebrow">Degrees</h3>
            <ul className="mt-6 space-y-8">
              {degrees.map((degree) => (
                <li key={degree.school}>
                  <p className="font-serif text-step-2 leading-tight">{degree.school}</p>
                  <p className="mt-1 text-ink-2">{degree.degree}</p>
                  <p className="mt-2 font-mono text-sm text-ink-3">
                    {degree.year} · {degree.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-rim pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0" data-reveal>
            <h3 className="eyebrow">Certifications</h3>
            <ul className="mt-6 space-y-6">
              {credentials.map((credential) => (
                <li key={credential.name} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-step-1 leading-snug">{credential.name}</p>
                    <p className="mt-1 text-sm text-ink-2">{credential.issuer}</p>
                  </div>
                  {credential.period ? (
                    <p className="shrink-0 font-mono text-xs text-ink-3">{credential.period}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
