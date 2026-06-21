import { Mail } from 'lucide-react';
import { FadeInSection } from '@/components/FadeInSection';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/data/navigation';

export function Contact() {
  return (
    <FadeInSection id="contact">
      <div className="section-container-narrow">
        <SectionHeading
          title="Contact"
          subtitle="Open to collaboration, freelance work, and interesting engineering challenges."
        />
        <div className="surface-card p-8 text-center sm:p-10">
          <p className="mx-auto max-w-lg text-base leading-relaxed text-[var(--muted)]">
            Want to collaborate, discuss a project, or just say hi? I&apos;d love to hear
            from you.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn-primary mt-8 w-full sm:w-auto"
            aria-label={`Email ${siteConfig.name} at ${siteConfig.email}`}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Typically responds within 1–2 business days.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}
