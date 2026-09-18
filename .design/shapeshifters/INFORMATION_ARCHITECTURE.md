# INFORMATION ARCHITECTURE — SHAPESHIFTERS

_Phase 3 artifact. Single route `/`; each section is one component in
`src/components/sections/`._

| # | Section | Component | Purpose / notes |
|---|---|---|---|
| — | Header | `layout/Header` | Fixed, minimal: logo + 3 anchors + ConnectButton; full-screen overlay on mobile; never covers the hero CTA |
| 1 | Hero | `sections/Hero` | Wordmark, pitch, mint-status pill, stats, primary CTA, 3D totem slot. Mint CTA above the fold on mobile |
| 2 | Stats bar | `sections/Stats` | Supply · Price · Chain · Minted; tabular nums; skeleton for live minted; no CLS |
| — | Marquee | `ui/Marquee` | Rarity/utility ticker band |
| 3 | The Art | `sections/Gallery` | 16 pieces, asymmetric broken grid (2 featured 2×2), `next/image` lazy + blur, rarity badges. Carries the most weight |
| 4 | Viewer | `sections/Viewer` | One NFT in 3D, rotatable (damped OrbitControls, zoom/pan off), static-image fallback |
| 5 | Utility | `sections/Utility` | Concrete holder benefits, plain language |
| 6 | Roadmap | `sections/Roadmap` | Phased, honest, no dates that can't be hit |
| 7 | Team | `sections/Team` | Pseudonymous handles + roles (TBA until provided) |
| 8 | FAQ | `sections/Faq` | Accordion, 8 Qs incl. chain/wallet/gas/sold-out; ARIA + keyboard |
| 9 | Mint CTA | `sections/MintCta` | Full-bleed final push; copyable contract; all mint states |
| 10 | Footer | `layout/Footer` | Socials, contract, marketplace, licence, © year |

**QA routes (noindex):** `/mint-states` (all mint states), `/og-preview` (OG source).

**Nav:** fixed header, logo + The Art / Utility / FAQ + persistent Connect Wallet;
collapses to a full-screen overlay on mobile (Esc closes, scroll locked).

**Order rationale:** degens get price/supply/date/CTA in the hero + stats
immediately; collectors get the art at scale next; skeptics reach team, FAQ and
the visible contract before any connect prompt.
