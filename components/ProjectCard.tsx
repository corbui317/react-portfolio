import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  url: string;
  preview?: string;
  description?: string;
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

export function ProjectCard({ title, url, preview, description }: ProjectCardProps) {
  const safeProjectUrl = getSafeHttpsUrl(url);
  const previewUrl = getPreviewUrl(preview, safeProjectUrl);

  const content = (
    <>
      <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
        <Image
          src={previewUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={previewUrl.startsWith('http')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ExternalLink className="h-4 w-4 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
        </div>
        {description ? <p className="mt-2 text-sm text-[var(--muted)]">{description}</p> : null}
      </div>
    </>
  );

  if (!safeProjectUrl) {
    return (
      <div className="group relative block overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg">
        {content}
      </div>
    );
  }

  return (
    <a
      href={safeProjectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {content}
    </a>
  );
}
