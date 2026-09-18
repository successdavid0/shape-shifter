import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wide " +
  "transition-[transform,box-shadow,background-color,color] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-surface hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 clip-corner",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-accent hover:text-accent hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3 py-2 rounded-sm",
  md: "text-sm px-5 py-3 rounded-sm",
  lg: "text-base px-7 py-4 rounded-sm",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, className = "", children, ...props }, ref) => {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
    if (href) {
      const external = href.startsWith("http");
      return (
        <Link
          href={href}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
