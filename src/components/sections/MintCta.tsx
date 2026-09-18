import { collection, isFill, legal } from "@/lib/content";
import { Fill } from "@/components/ui/Fill";
import { CopyButton } from "@/components/ui/CopyButton";
import { MintPanel } from "@/components/web3/MintPanel";

export function MintCta() {
  const hasContract = !isFill(collection.contractAddress);
  return (
    <section
      id="mint"
      className="mesh-bg scroll-mt-[var(--header-h)] scanlines relative overflow-hidden px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-display">
          <span className="chroma">Wear the skin</span>
        </h2>
        <p className="max-w-md text-lg text-ink-muted">
          The tribe is waiting. Connect, verify the contract, and mint your Walker.
        </p>

        {/* Mint interface — mocked state until the contract is wired (Phase E) */}
        <MintPanel />

        {/* Contract, always visible before any connect prompt */}
        <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-lg border border-line bg-surface/60 p-4">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Contract address
          </span>
          <div className="flex w-full items-center justify-center gap-3">
            <code className="break-all font-mono text-xs text-ink sm:text-sm">
              {hasContract ? collection.contractAddress : <Fill value={collection.contractAddress} />}
            </code>
            {hasContract && <CopyButton value={collection.contractAddress} />}
          </div>
          <p className="mt-1 text-[0.7rem] text-ink-muted/80">
            Always verify the address on a block explorer before connecting.
          </p>
        </div>

        <p className="max-w-lg text-xs leading-relaxed text-ink-muted/70">
          {legal.disclaimer}
        </p>
      </div>
    </section>
  );
}
