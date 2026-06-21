interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-10 sm:mb-12 max-w-2xl ${alignment}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
