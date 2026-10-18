interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  index?: string;
  label?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  index,
  label,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-12 max-w-2xl sm:mb-16 ${alignment}`} data-reveal>
      {index && label ? (
        <p className="eyebrow mb-4">
          <span className="text-accent">{index}</span> / {label}
        </p>
      ) : null}
      <h2 className="font-serif text-step-4 leading-[1.05] tracking-display">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-step-0 leading-relaxed text-ink-2">{subtitle}</p>
      ) : null}
    </div>
  );
}
