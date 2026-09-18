# DESIGN TOKENS — SHAPESHIFTERS

_Phase 4 artifact. Canonical source: `src/app/globals.css` `@theme` (Tailwind v4,
CSS-first). No hardcoded hex/space/duration in component files — all via tokens._

## Colour
| Token | Value | Role |
|---|---|---|
| `--color-surface` | `#06030f` | base night ground |
| `--color-surface-2` | `#100826` | raised panels |
| `--color-surface-3` | `#1a1140` | cards / inputs |
| `--color-ink` | `#f6f1ff` | primary text |
| `--color-ink-muted` | `#aba1c6` | secondary text (≥4.5:1 on surface) |
| `--color-accent` | `#23e5ff` | the loud one — electric cyan |
| `--color-accent-soft` | cyan @ 20% | glows / borders |
| `--color-accent-warm` | `#ff5a1f` | blood orange |
| `--color-accent-acid` | `#8bff3c` | acid green |
| `--color-accent-magenta` | `#ff36c4` | duotone shadow partner |
| `--color-line` / `--color-line-strong` | ink @ 14% / 26% | hairlines |
| `--color-success/warn/danger` | `#8bff3c` / `#ffc53d` / `#ff4d6d` | status |

## Type
- `--font-display: Syne` · `--font-body: Hanken Grotesk` · `--font-mono: Space Mono`
- Fluid scale (clamp, ~1.25): `--text-xs … --text-3xl`, `--text-display`
  `clamp(2.75rem, 1.5rem + 7vw, 6.75rem)`.

## Space / radius / depth
- `--spacing-section: clamp(4rem, 3rem + 6vw, 9rem)`; Tailwind 4px base retained.
- `--radius-sm 4px`, `--radius-lg 18px`, `--radius-xl 28px`.
- `--shadow-lift`, `--shadow-glow: 0 0 40px var(--color-accent-soft)`.

## Motion
- `--ease-out-expo cubic-bezier(0.16,1,0.3,1)`, `--ease-spring cubic-bezier(0.34,1.56,0.64,1)`.
- `--dur-fast 150ms · --dur-base 300ms · --dur-slow 600ms · --dur-reveal 900ms`.

## Utilities (atmosphere)
`.grain` (fixed film grain), `.scanlines` (CRT), `.chroma` (duotone text),
`.mesh-bg` (gradient mesh), `.glow-accent`, `.clip-corner`/`.clip-corner-2`
(arcade bevels), `.animate-marquee/float/flicker`, `.tnum` (tabular nums).

## Accessibility / reduced motion
`prefers-reduced-motion` block zeroes animation/transition durations globally;
motion components also short-circuit via `useReducedMotion`. Focus rings are
styled (`:focus-visible` → 2px accent outline), never removed. Canonical theme
is dark (`color-scheme: dark`), executed fully (no half second theme).

## Contrast check (chosen palette)
- ink `#f6f1ff` on surface `#06030f` ≈ 18:1 ✓
- ink-muted `#aba1c6` on surface ≈ 8.5:1 ✓ (≥4.5)
- accent `#23e5ff` on surface ≈ 10:1 ✓ (large text/pills)
