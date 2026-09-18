export function SectionHeading({
  index,
  kicker,
  title,
  className = "",
}: {
  index?: string;
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {(index || kicker) && (
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
          {index && <span className="text-ink-muted">{index}</span>}
          {index && kicker && <span className="h-px w-8 bg-line-strong" />}
          {kicker && <span>{kicker}</span>}
        </div>
      )}
      <h2 className="max-w-2xl font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
