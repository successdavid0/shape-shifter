# DESIGN BRIEF — SHAPESHIFTERS

_Manual design-flow (design-flow sub-skills not installed; PRD §4 is the source
of truth). Phase 2 artifact._

## Product
Single-page marketing site for **SHAPESHIFTERS**, a 1/1 folk-horror totem NFT
collection (16 pieces provided). Job: make the collection feel real, well-built
and worth minting, then move visitors to mint / marketplace / socials.

## Aesthetic direction — chosen & committed
**Retro-futurist arcade.** Chosen because the artwork is saturated, occult,
culture-not-finance — heavy outlines, electric palettes, tribal/shamanic
creature masks. The site leans into that: aggressive, cultural, alive.

- **Palette (sampled from the art):** midnight-indigo ground (`#06030f`),
  electric cyan (`#23e5ff`, the loud one), blood orange (`#ff5a1f`), acid green
  (`#8bff3c`), magenta duotone partner (`#ff36c4`). Dominant dark ground + sharp
  accents — never an even rainbow.
- **Type:** Syne (wide futurist display) · Hanken Grotesk (refined grotesk body)
  · Space Mono (addresses/counts/prices). Self-hosted woff2. No banned fonts
  (no Inter/Roboto/Arial/system/Space Grotesk).
- **Depth/atmosphere:** gradient mesh, film grain overlay, CRT scanlines,
  duotone chromatic aberration on the wordmark. Never a flat fill.

## Signature moment
An orchestrated page-load (~1s, staggered reveals, `--ease-out-expo`) resolving
into the full-width duotone **SHAPESHIFTERS** wordmark with a chroma flicker.

## The unexpected interaction
Pointer-tilt on the hero totem (3D parallax follows the cursor), plus the
live **shapeshifting** 3D mesh that morphs continuously.

## Hard bans honoured (PRD §4.2)
No Inter/Roboto/Arial/system/Space Grotesk; no purple-on-white SaaS gradient;
no even rainbow; no centered-everything / three-identical-cards / generic hero;
no flat textureless backgrounds.

## Non-goals
No accounts/DB/CMS, no marketplace/rarity-explorer/staking, no contract writing,
no key custody, no ROI/price-prediction/guaranteed-return copy.
