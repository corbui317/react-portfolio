import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  url: string;
  preview?: string;
  description?: string;
}

export function ProjectCard({ title, url, preview, description }: ProjectCardProps) {
  const previewUrl = preview || `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      {/* Preview Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
        <Image
          src={previewUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <ExternalLink className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
        </div>
        {description && (
          <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
    </a>
  );
}
