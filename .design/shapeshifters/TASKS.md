# TASKS — SHAPESHIFTERS

_Phase 5 artifact. Mirrors PRD §11. One commit per phase (git history)._

## Phase A — Foundation ✅
- [x] A1 create-next-app (TS, App Router, Tailwind v4, ESLint, `src/`)
- [x] A2 Self-hosted fonts via `next/font/local` (Syne / Hanken Grotesk / Space Mono)
- [x] A3 `globals.css` `@theme` tokens + reduced-motion block
- [x] A4 `lib/content.ts` — all copy/data; hard facts kept as visible `<<FILL>>`
- [x] A5 Layout shell: metadata, header (+mobile overlay), footer, grain overlay

## Phase B — Static page ✅
- [x] B1 Hero with static poster in the canvas slot
- [x] B2 Stats bar with skeleton states (no CLS)
- [x] B3 Art gallery (16 real pieces, `next/image`, sizes, blur, lazy)
- [x] B4 Utility · B5 Roadmap · B6 Team
- [x] B7 FAQ accordion (keyboard + ARIA)
- [x] B8 Final mint CTA with copyable contract
- [x] B9 Mobile nav overlay
- [x] B10 Checkpoint: responsive 390/768/1280; build green; no horizontal scroll

## Phase C — Motion ✅
- [x] C1 Page-load orchestration (signature moment, ~1s)
- [x] C2 Scroll reveals (SSR-safe, once) + noscript fallback
- [x] C3 Hover/focus micro-interactions + pointer-tilt on the totem
- [x] C4 Reduced-motion verified

## Phase D — 3D ✅
- [x] D2 `HeroScene` (procedural shapeshifting mesh) + dynamic `ssr:false` + poster
- [x] D3 Suspense loader with `useProgress`
- [x] D4 WebGL detection + fallback path
- [x] D5 Scroll/pointer parallax on the camera (never captures scroll)
- [x] D6 NFT viewer with damped `OrbitControls`, zoom/pan disabled
- [x] D7 Mobile DPR cap, `frameloop` pausing off-view, dispose on unmount
- [x] D8 Checkpoint: all five §7.6 checks pass
- [ ] D1 Draco loader + GLB — deferred to the model swap point (no GLB yet)

## Phase E — Web3 ✅
- [x] E2 Wallet connect UI styled to the design system
- [x] E3 `useMintState` hook (mocked — contract TBA) + shared MintProvider
- [x] E4 Every state from §8 built and visually verified (`/mint-states`)
- [x] E6 Error handling with human-readable messages
- [ ] E1/E5 Real wagmi/viem provider + testnet mint — at the swap point (chain TBA)

## Phase F — Ship ✅
- [x] F1 OG image (`/og.png`), metadata, JSON-LD, sitemap, robots, manifest, favicon
- [x] F4 `README.md`: setup, env, swap points, font licences
- [x] .design artifacts written
- [ ] F2 Lighthouse/axe pass on deploy · F3 emil-design-eng polish · F5 `/design-review`
      — run manually against a deploy preview before launch

## Outstanding before launch (owner)
Fill `content.ts` facts (supply/price/date/chain/contract/socials/team), wire the
real wallet stack + contract, add a hero GLB if desired, then Lighthouse + axe +
`/design-review`.
