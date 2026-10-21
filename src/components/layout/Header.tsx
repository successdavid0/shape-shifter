"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, collection } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile overlay whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + escape-to-close when the mobile overlay is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-[var(--dur-base)] ${
        scrolled
          ? "border-b border-line bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="glitch-hover group font-display text-lg font-extrabold uppercase tracking-tight text-ink"
          aria-label={`${collection.name} — home`}
        >
          <span
            data-text={collection.name}
            aria-hidden="true"
            className="glitch-layer"
          >
            {collection.name}
          </span>
          <span className="sr-only">{collection.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative font-mono text-xs uppercase tracking-widest transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-ink-muted"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-3 top-1/2 -translate-y-1/2 text-ink transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  /
                </span>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/whitelist" size="sm">Reserve spot</Button>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-[var(--dur-base)] ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-[var(--dur-base)] ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Full-screen mobile overlay */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 mesh-bg vhs-bg scanlines md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-[var(--dur-base)]`}
        hidden={!open}
      >
        <div className="flex h-full flex-col items-start justify-center gap-6 px-8 pt-[var(--header-h)]">
          {nav.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`font-display text-3xl font-extrabold uppercase tracking-tight hover:text-ink ${
                  active ? "text-ink chroma" : "text-ink-muted"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <div className="mt-6 w-full max-w-xs" onClick={() => setOpen(false)}>
            <Button href="/whitelist" size="lg" className="w-full">Reserve spot</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
