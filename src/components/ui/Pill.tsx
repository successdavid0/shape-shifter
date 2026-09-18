type Tone = "live" | "soon" | "neutral" | "accent";

const tones: Record<Tone, string> = {
  live: "text-success border-success/40 bg-success/10",
  soon: "text-warn border-warn/40 bg-warn/10",
  neutral: "text-ink-muted border-line bg-surface-2",
  accent: "text-accent border-accent/40 bg-accent/10",
};

export function Pill({
  children,
  tone = "neutral",
  pulse = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-widest ${tones[tone]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
