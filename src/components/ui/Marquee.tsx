export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  // Duplicated track for a seamless -50% loop.
  const track = [...items, ...items];
  return (
    <div
      className={`relative flex overflow-hidden border-y border-line bg-surface-2/50 py-3 ${className}`}
      aria-hidden="true"
    >
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
        {track.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-ink-muted"
          >
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
