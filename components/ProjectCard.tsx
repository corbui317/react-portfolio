import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const SAFE_ROOT_RELATIVE_PATH = /^\/[a-zA-Z0-9/_.-]+$/;

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

function isSafeRootRelativePath(value?: string): value is string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('..')) {
    return false;
  }

  return SAFE_ROOT_RELATIVE_PATH.test(value);
}

function getPreviewUrl(preview: string | undefined, safeProjectUrl: string | undefined) {
  if (isSafeRootRelativePath(preview)) {
    return preview;
  }

  const safePreviewUrl = getSafeHttpsUrl(preview);

  if (safePreviewUrl) {
    return safePreviewUrl;
  }

  if (safeProjectUrl) {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(safeProjectUrl)}?w=800&h=600`;
  }

  return '/logo_favicon.svg';
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, url, preview, description, outcome, tags, featured } = project;
  const safeProjectUrl = getSafeHttpsUrl(url);
  const previewUrl = getPreviewUrl(preview, safeProjectUrl);
  const isRemoteImage = previewUrl.startsWith('http');

  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-rim bg-surface">
        <Image
          src={previewUrl}
          alt={`${title} project preview`}
          fill
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={isRemoteImage}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-xs text-ink-3">
          {index ? <span className="text-accent">{String(index).padStart(2, '0')}</span> : null}
          {featured ? (
            <span className="rounded-full border border-accent px-2 py-0.5 uppercase tracking-[0.14em] text-accent">
              Featured
            </span>
          ) : null}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="font-serif text-step-2 leading-tight">{title}</h3>
          {safeProjectUrl ? (
            <ArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-ink-3 transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <p className="mt-3 leading-relaxed text-ink-2">{description}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-3">{outcome}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`${title} technologies`}>
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
    'group relative flex h-full flex-col overflow-hidden rounded-xl border border-rim bg-elevated transition-[border-color,transform] duration-200 ease-out hover:border-ink-3 active:scale-[0.99]';

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
