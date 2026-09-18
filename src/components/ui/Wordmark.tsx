/**
 * Full-width wordmark. Uses SVG textLength to stretch the word to exactly the
 * container width — always one clean line at every breakpoint — with layered
 * offsets for the retro duotone chroma. Height scales with the viewBox.
 */
export function Wordmark({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const W = 1200;
  const H = 230;
  const common = {
    x: 0,
    y: 178,
    fontSize: 210,
    textLength: W,
    lengthAdjust: "spacingAndGlyphs" as const,
    fontWeight: 800,
    style: { fontFamily: "var(--font-display)", textTransform: "uppercase" as const },
  };
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      className={`block h-auto w-full max-w-full ${className}`}
      style={{ height: "auto" }}
      role="img"
      aria-label={text}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* duotone shadows */}
      <text {...common} fill="var(--color-accent-warm)" opacity="0.85" transform="translate(4,0)">
        {text}
      </text>
      <text {...common} fill="var(--color-accent)" opacity="0.85" transform="translate(-4,0)">
        {text}
      </text>
      {/* main face */}
      <text {...common} fill="var(--color-ink)">
        {text}
      </text>
    </svg>
  );
}
