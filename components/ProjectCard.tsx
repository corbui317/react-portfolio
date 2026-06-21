import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

function getSafeHttpsUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

function getPreviewUrl(preview: string | undefined, safeProjectUrl: string | undefined) {
  const safePreviewUrl = getSafeHttpsUrl(preview);

  if (safePreviewUrl) {
    return safePreviewUrl;
  }

  if (safeProjectUrl) {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(safeProjectUrl)}?w=800&h=600`;
  }

  return '/logo_favicon.svg';
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, url, preview, description, outcome, tags } = project;
  const safeProjectUrl = getSafeHttpsUrl(url);
  const previewUrl = getPreviewUrl(preview, safeProjectUrl);
  const isRemoteImage = previewUrl.startsWith('http');

  const content = (
    <>
      <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
        <Image
          src={previewUrl}
          alt={`${title} project preview`}
          fill
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={isRemoteImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
          {safeProjectUrl ? (
            <ExternalLink
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">{outcome}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
          {tags.map((tag) => (
            <li key={tag}>
              <span className="tag-pill">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const cardClassName =
    'group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-card transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card-lg';

  if (!safeProjectUrl) {
    return <article className={cardClassName}>{content}</article>;
  }

  return (
    <a
      href={safeProjectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`focus-ring ${cardClassName}`}
      aria-label={`${title} — opens in a new tab`}
    >
      {content}
    </a>
  );
}
