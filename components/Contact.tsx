import { ArrowUpRight, Download, Mail, MapPin } from 'lucide-react';
import { FadeInSection } from '@/components/FadeInSection';
import { siteConfig, socialLinks } from '@/data/navigation';

const profileLinks = socialLinks.filter(
  (link) => link.label === 'GitHub' || link.label === 'LinkedIn'
);

export function Contact() {
  return (
    <FadeInSection id="contact">
      <div className="section-container">
        <div className="border-t border-rim pt-16 sm:pt-20">
          <p className="eyebrow" data-reveal>
            <span className="text-accent">07</span> / Contact
          </p>
          <h2
            className="mt-4 max-w-3xl font-serif text-step-4 leading-[1.05] tracking-display"
            data-reveal
          >
            Contact
            <span className="block text-ink-3">Let&apos;s build something reliable.</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-ink-2" data-reveal>
            Open to collaboration, freelance work, and interesting engineering challenges.
            I typically respond within 1–2 business days.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal>
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-primary"
              aria-label={`Email ${siteConfig.name} at ${siteConfig.email}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <a href={siteConfig.resumePath} download className="btn-secondary">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-ink-3" data-reveal>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {siteConfig.location}
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}
