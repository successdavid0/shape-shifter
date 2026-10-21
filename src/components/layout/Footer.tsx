import Link from "next/link";
import { collection, legal, isFill } from "@/lib/content";
import { Fill } from "@/components/ui/Fill";

const socialLinks = [
  { key: "x", label: "X / Twitter", href: collection.socials.x },
  { key: "discord", label: "Discord", href: collection.socials.discord },
  { key: "telegram", label: "Telegram", href: collection.socials.telegram },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-surface-2/60">
      <div className="mx-auto max-w-[80rem] px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-extrabold uppercase tracking-tight">
              <span className="chroma">{collection.name}</span>
            </p>
            <p className="mt-3 text-sm text-ink-muted">{collection.tagline}</p>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-ink-muted/80">
              {legal.disclaimer}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Social
              </h3>
              <ul className="mt-4 space-y-2">
                {socialLinks.map((s) =>
                  isFill(s.href) ? (
                    <li key={s.key} className="text-sm">
                      <span className="text-ink-muted">{s.label}</span>{" "}
                      <Fill value={s.href} />
                    </li>
                  ) : (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink transition-colors hover:text-ink-muted"
                      >
                        {s.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                On-chain
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex flex-col gap-1">
                  <span className="text-ink-muted">Contract</span>
                  <Fill value={collection.contractAddress} className="break-all font-mono text-xs" />
                </li>
                <li>
                  {isFill(collection.marketplaceUrl) ? (
                    <span>
                      <span className="text-ink-muted">Marketplace</span>{" "}
                      <Fill value={collection.marketplaceUrl} />
                    </span>
                  ) : (
                    <a
                      href={collection.marketplaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink transition-colors hover:text-ink-muted"
                    >
                      Marketplace
                    </a>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Explore
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/tribe" className="text-ink transition-colors hover:text-ink-muted">
                    The Tribe
                  </Link>
                </li>
                <li>
                  <Link href="/whitelist" className="text-ink transition-colors hover:text-ink-muted">
                    Whitelist
                  </Link>
                </li>
                <li>
                  <Link href="/lore" className="text-ink transition-colors hover:text-ink-muted">
                    Lore
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-ink transition-colors hover:text-ink-muted">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {collection.name}. {legal.rights}
          </p>
          <p className="font-mono">
            Fonts: Syne · Hanken Grotesk · Space Mono (OFL)
          </p>
        </div>
      </div>
    </footer>
  );
}
