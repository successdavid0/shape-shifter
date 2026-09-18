"use client";

import { useState, useId } from "react";
import { faq } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion";

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const uid = useId();
  const btnId = `faq-btn-${uid}`;
  const panelId = `faq-panel-${uid}`;
  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
        >
          <span className="font-display text-lg font-bold uppercase tracking-tight">
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 font-mono text-accent transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] ${
              open ? "rotate-45" : ""
            }`}
          >
            ✦
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        className="pb-6 pr-8 text-ink-muted"
      >
        {a}
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-[var(--header-h)] border-t border-line bg-surface-2/40 px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto grid max-w-[80rem] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading index="06" kicker="Questions" title="Read before you mint" />
        <Reveal>
          {faq.map((f, i) => (
            <Item key={i} q={f.q} a={f.a} index={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
