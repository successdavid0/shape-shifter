"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, collection } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-[var(--dur-base)] ${
        scrolled
          ? "border-b border-line bg-surface/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          className="font-display text-lg font-extrabold uppercase tracking-tight text-ink"
          aria-label={`${collection.name} — home`}
        >
          <span className="chroma">{collection.name}</span>
          <span className="ml-1 text-accent">°</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#whitelist" size="sm">Reserve spot</Button>
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
        className={`fixed inset-0 z-40 mesh-bg md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-[var(--dur-base)]`}
        hidden={!open}
      >
        <div className="flex h-full flex-col items-start justify-center gap-6 px-8 pt-[var(--header-h)]">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink hover:text-accent"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-6 w-full max-w-xs" onClick={() => setOpen(false)}>
            <Button href="#whitelist" size="lg" className="w-full">Reserve spot</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
