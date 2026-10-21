/**
 * Full-width glitch wordmark. SVG textLength stretches the word to exactly the
 * container width — always one clean line — with red/cyan channel-split layers
 * behind a bone-white face. The split layers drift on a loop for the VHS tear.
 * Monochrome: colour appears only as the chromatic fringe.
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
      {/* chromatic channel split — drifts for the tear */}
      <g style={{ mixBlendMode: "screen" }}>
        <text {...common} fill="var(--glitch-cyan)" opacity="0.9">
          {text}
          <animate
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="-5 0; 0 0; -3 2; 0 0; -6 -1; 0 0"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </text>
        <text {...common} fill="var(--glitch-red)" opacity="0.9">
          {text}
          <animate
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="5 0; 0 0; 4 -2; 0 0; 6 1; 0 0"
            dur="2.7s"
            repeatCount="indefinite"
          />
        </text>
      </g>
      {/* bone-white main face */}
      <text {...common} fill="var(--color-ink)">
        {text}
      </text>
    </svg>
  );
}
