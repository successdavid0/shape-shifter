# SHAPESHIFTERS — NFT Collection Landing Page

A single-page marketing site for the **SHAPESHIFTERS** 1/1 folk-horror totem
collection. Built to the project PRD: Next.js (App Router) · TypeScript ·
Tailwind v4 · React Three Fiber · Motion.

Aesthetic direction: **Retro-futurist arcade** — midnight-indigo ground,
electric-cyan / blood-orange / acid-green accents sampled from the artwork,
wide duotone display type, CRT scanlines, grain, and a shapeshifting 3D totem.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (must be green before shipping)
npm run start        # serve the production build
```

Node 20+ recommended (developed on Node 25). No database, no backend — fully
static.

## Environment

Copy `.env.example` → `.env.local` and fill. **`.env.local` is gitignored —
never commit real keys or a WalletConnect project id.**

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (metadata, sitemap, robots, OG) |
| `NEXT_PUBLIC_CHAIN_ID` | Target chain id (used at the web3 swap point) |
| `NEXT_PUBLIC_RPC_URL` | Read RPC endpoint |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect id (wallet UI) |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Mint contract address once deployed |
| `NEXT_PUBLIC_EXPLORER_BASE` | Block-explorer base URL for links |

## Filling in the collection

All copy and collection data live in **`src/lib/content.ts`**. Values still
set to the `FILL` sentinel (`<<FILL>>`) render on the page as a visible **TBA**
marker — nothing is invented. Fill these before launch:

`ticker · supply · chain · mintPrice · mintDateUtc · contractAddress ·
marketplaceUrl · socials.{x,discord,telegram} · explorerBase · team[]`

The 16 collection images live in `public/art/` (filenames retain their original
`SKINWALKER*` ids; the brand name is SHAPESHIFTERS). Rarity tiers are read from
the art: Common Trickster/Tribe · Rare Skin Stalker · Legendary Walker Seal.

## Swap points (documented in code)

The UI is complete; only data sources change. Search the code for `SWAP POINT`:

1. **Hero 3D model** — `components/three/HeroScene.tsx`: replace the procedural
   shapeshifting icosahedron with a compressed GLB via `useGLTF`. Add the Draco
   decoder to `public/draco/`, call `useGLTF.preload('/models/hero.glb')`, and
   keep the model **<100K tris / <5MB** (`gltf-transform optimize --compress
   draco --texture-compress webp`).
2. **NFT viewer model** — `components/three/NftViewer.tsx`: swap the textured
   card for a GLB-backed viewer if desired.
3. **Wallet + contract reads** — `lib/hooks/useMintState.ts` and
   `components/web3/MintProvider.tsx`: replace the mocked state machine with
   wagmi v2 + viem (EVM) or `@solana/wallet-adapter` (Solana). Mount
   `WagmiProvider`/`RainbowKitProvider` where `MintProvider` is. The component
   markup (`ConnectButton`, `MintPanel`, `MintView`) does not change — it already
   renders every state in PRD §8.
4. **Contract config / ABI** — `lib/contract.ts`.

## 3D validation (PRD §7.6)

- **Loading indicator** — `Suspense` + `useProgress` branded loader.
- **WebGL fallback** — `lib/webgl.ts` detects support; falls back to the static
  poster / still image (also used for `prefers-reduced-motion`).
- **Compressed models** — N/A while procedural; enforce at the GLB swap point.
- **Scroll not blocked** — hero scene has no controls; the viewer uses
  `OrbitControls` with `enableZoom`/`enablePan` disabled.
- **Mobile DPR** — capped at 1; `frameloop` pauses when scrolled out of view.

## QA routes (not indexed)

- `/mint-states` — every mint state rendered with demo fixtures.
- `/og-preview` — source layout for the static OG image (`public/og.png`).

## Accessibility & performance

Semantic landmarks, single `<h1>`, keyboard-reachable controls with visible
focus rings, ARIA accordion, `aria-hidden` canvases with adjacent text, real
`alt` text per piece. `overflow-x: clip` on the root prevents horizontal scroll.
Reduced-motion disables animation and drops 3D to a still frame. Content is
usable with JavaScript disabled (a `<noscript>` style reveals animated wrappers).

## Fonts & licences

Self-hosted (`next/font/local`, woff2, subset latin, `display: swap`) from
`public/fonts/`. All **SIL Open Font License (OFL)**:

- **Syne** — display (wide futurist) — https://fonts.google.com/specimen/Syne
- **Hanken Grotesk** — body — https://fonts.google.com/specimen/Hanken+Grotesk
- **Space Mono** — mono (addresses, counts, prices) — https://fonts.google.com/specimen/Space+Mono

## Design artifacts

Design-flow artifacts live in `.design/shapeshifters/` (brief, information
architecture, tokens, tasks). Run `/design-review` manually before launch.

## Legal

SHAPESHIFTERS is an art collectible. Nothing on the site is financial advice or
a promise of value or return. No ROI or floor-price language appears anywhere.
Art © the SHAPESHIFTERS artist; holders receive commercial rights to their token.
