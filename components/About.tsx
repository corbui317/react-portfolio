import { FadeInSection } from '@/components/FadeInSection';
import { SectionHeading } from '@/components/SectionHeading';
import { aboutStats } from '@/data/stats';

export function About() {
  return (
    <FadeInSection id="about">
      <div className="section-container">
        <SectionHeading
          index="01"
          label="About"
          title="About Me"
          subtitle="Systems-minded engineer focused on clarity, reliability, and clean user experiences."
        />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-5 text-step-0 leading-relaxed text-ink-2" data-reveal>
            <p>
              I&apos;m a software engineer with 4+ years building distributed data-platform
              services and cloud applications in Java, Python, and JavaScript. Today I lead Java
              development for data-platform services on Meta&apos;s global infrastructure,
              including a Presto connector that lets teams query Kafka topics in plain SQL.
            </p>
            <p>
              Before that I automated provisioning and access for 10k+ users, built FAA-compliant
              aerospace services, and worked on radar simulation tools for the U.S. Air Force.
              Outside work I run a self-hosted homelab and enjoy movies, cooking, piano, guitar,
              and trumpet.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-rim bg-rim">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-elevated p-6" data-reveal>
                <dt className="eyebrow order-2 mt-3">{stat.label}</dt>
                <dd className="order-1 font-serif text-step-4 leading-none">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </FadeInSection>
  );
}
