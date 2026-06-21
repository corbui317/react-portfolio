import { FadeInSection } from '@/components/FadeInSection';
import { SectionHeading } from '@/components/SectionHeading';

const highlights = [
  {
    title: 'Systems & automation',
    body: 'Docker, Linux, Node.js, and cloud workflows that stay maintainable as projects grow.',
  },
  {
    title: 'Frontend craft',
    body: 'React and Next.js experiences that are responsive, accessible, and fast on Vercel.',
  },
  {
    title: 'Beyond the screen',
    body: 'Movies, cooking, piano, guitar, trumpet, and homelab tinkering keep curiosity alive.',
  },
];

export function About() {
  return (
    <FadeInSection id="about">
      <div className="section-container-narrow">
        <SectionHeading
          title="About Me"
          subtitle="Systems-minded developer focused on clarity, reliability, and clean user experiences."
        />
        <div className="surface-card space-y-8 p-8 sm:p-10">
          <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            I&apos;m a systems engineer and web developer who enjoys simplifying complexity.
            I build products that feel polished on the surface while staying dependable
            underneath.
          </p>
          <ul className="grid gap-5 sm:grid-cols-3 sm:gap-4">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-[var(--card-border)] bg-[var(--surface-muted)] p-4"
              >
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeInSection>
  );
}
