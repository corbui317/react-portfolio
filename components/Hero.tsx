import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import { siteConfig, socialLinks } from '@/data/navigation';
import { heroStats } from '@/data/stats';

const tagline = 'Building reliable systems and polished web experiences.';

export function Hero() {
  const githubLink = socialLinks.find((link) => link.label === 'GitHub');
  const linkedInLink = socialLinks.find((link) => link.label === 'LinkedIn');

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--accent-glow),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="section-container">
        <p className="eyebrow hero-enter" style={{ '--i': 0 } as React.CSSProperties}>
          {siteConfig.role} <span className="text-accent">·</span> {siteConfig.location}
        </p>
        <h1
          id="hero-heading"
          className="hero-enter mt-6 font-serif text-step-5 leading-[0.92] tracking-display"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          {siteConfig.name}
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </h1>
        <div
          className="hero-enter mt-8 max-w-2xl"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          <p className="font-serif text-step-2 leading-snug text-ink">{tagline}</p>
          <p className="mt-4 text-step-0 leading-relaxed text-ink-2">{siteConfig.description}</p>
        </div>

        <div
          className="hero-enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Me
          </a>
          <a href={siteConfig.resumePath} download className="btn-secondary">
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
          <div className="flex items-center gap-1 sm:ml-3">
            {githubLink ? (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="focus-ring pressable rounded-full p-2.5 text-ink-2 transition-colors hover:text-ink"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : null}
            {linkedInLink ? (
              <a
                href={linkedInLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="focus-ring pressable rounded-full p-2.5 text-ink-2 transition-colors hover:text-ink"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <dl
          className="hero-enter mt-16 grid grid-cols-3 gap-4 border-t border-rim pt-8 sm:max-w-xl"
          style={{ '--i': 4 } as React.CSSProperties}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="eyebrow order-2 mt-2">{stat.label}</dt>
              <dd className="order-1 font-serif text-step-3 leading-none">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href="#about"
          className="focus-ring eyebrow mt-16 inline-flex items-center gap-2 rounded-sm transition-colors hover:text-ink"
        >
          Scroll
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
