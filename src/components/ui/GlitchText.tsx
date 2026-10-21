import { createElement, type ElementType } from "react";

/**
 * Glitch heading. Renders the word with two absolutely-positioned
 * data-text layers (red + cyan) that tear on a loop — the monochrome
 * chromatic-aberration signature. Pure CSS; the layers animate via
 * `.glitch-layer` in globals.css and are hidden from a11y/selection.
 */
export function GlitchText({
  children,
  as = "span",
  className = "",
  layerClassName = "",
}: {
  children: string;
  as?: ElementType;
  className?: string;
  layerClassName?: string;
}) {
  return createElement(
    as,
    { className },
    <span
      key="glitch"
      data-text={children}
      className={`glitch-layer ${layerClassName}`}
    >
      {children}
    </span>
  );
}
