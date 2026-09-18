import { isFill } from "@/lib/content";

/**
 * Renders a value, or — when it's still the FILL sentinel — a visible,
 * honest placeholder so unset facts are never silently invented.
 * PRD §0 / guardrail #4: placeholders stay visible until answered.
 */
export function Fill({
  value,
  as: Tag = "span",
  placeholder = "TBA",
  className = "",
}: {
  value: string;
  as?: React.ElementType;
  placeholder?: string;
  className?: string;
}) {
  if (isFill(value)) {
    return (
      <Tag
        className={`inline-flex items-center rounded-sm border border-dashed border-accent-warm/70 px-1.5 py-0.5 font-mono text-[0.85em] uppercase tracking-wider text-accent-warm ${className}`}
        title="To be confirmed by the team"
      >
        {placeholder}
      </Tag>
    );
  }
  return <Tag className={className}>{value}</Tag>;
}
