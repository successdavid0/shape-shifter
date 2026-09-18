/**
 * SHAPESHIFTERS — single source of truth for all copy + collection data.
 * PRD A4: no hardcoded strings in components.
 *
 * FILL sentinel — hard, verifiable facts the owner must supply (supply,
 * price, date, contract, socials, marketplace, team identities). These
 * render as a visible "TBA / <<FILL>>" marker until provided. Per PRD §0
 * and guardrail #4 we never invent these.
 */
export const FILL = "<<FILL>>" as const;
export const isFill = (v: string): boolean => v === FILL;

export type Rarity = "Common" | "Rare" | "Legendary";

export interface ArtPiece {
  id: string;
  src: string;
  rarityLabel: string; // the tier as printed on the art
  rarity: Rarity;
  title: string;
  alt: string;
}

export const collection = {
  name: "SHAPESHIFTERS",
  ticker: FILL, // e.g. "SHIFT"
  // Thematic pitch derived from the artwork (editable):
  pitch: "Shapeshifter spirits caught mid-transformation — 1/1 folk-horror totems.",
  tagline: "The tribe that wears other skins.",
  supply: FILL, // e.g. "6,666"
  chain: FILL, // Ethereum | Base | Solana | Abstract | other
  mintPrice: FILL, // public
  mintPriceAllowlist: FILL, // allowlist, if different
  mintDateUtc: FILL, // ISO-8601 UTC, e.g. 2026-10-31T18:00:00Z
  contractAddress: FILL, // or "TBA"
  marketplaceUrl: FILL,
  socials: {
    x: FILL,
    discord: FILL,
    telegram: FILL,
  },
  explorerBase: FILL, // e.g. https://basescan.org/address/
} as const;

export const nav = [
  { label: "The Art", href: "#art" },
  { label: "Utility", href: "#utility" },
  { label: "FAQ", href: "#faq" },
] as const;

/** All 16 provided pieces, catalogued from the art itself. */
export const art: ArtPiece[] = [
  {
    id: "79",
    src: "/art/SKINWALKER79.png",
    rarityLabel: "LEGENDARY · WALKER SEAL",
    rarity: "Legendary",
    title: "Walker Seal #79",
    alt: "A split-face shaman mask, one half living blue skin and one half bare skull, wearing a bone-tooth necklace and a turquoise-and-orange tribal robe against an electric-blue field.",
  },
  {
    id: "667",
    src: "/art/SKINWALKER667.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #667",
    alt: "A golden antlered animal skull glowing with an 'ARA' sigil on its brow, set against a dark ritual backdrop of maze patterns.",
  },
  {
    id: "261",
    src: "/art/SKINWALKER261.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #261",
    alt: "A horned golden skull-demon with a wide fanged grin, framed by magenta and acid-green zigzag beadwork on black.",
  },
  {
    id: "386",
    src: "/art/SKINWALKER386.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #386",
    alt: "A green werewolf with spiralling red hypnotic eyes and a broad fanged grin, wearing a blue tribal collar under a starfield.",
  },
  {
    id: "720",
    src: "/art/SKINWALKER720.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #720",
    alt: "A blue-maned werewolf with glowing yellow eyes in a teal-and-orange patterned robe against a deep blue field.",
  },
  {
    id: "136",
    src: "/art/SKINWALKER136.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #136",
    alt: "A golden-eyed hyena-skull shaman in a green tribal robe, standing before a burning desert sunset.",
  },
  {
    id: "206",
    src: "/art/SKINWALKER206.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #206",
    alt: "A stitched scarecrow-skull creature with white button eyes and a fanged grin, in a green maze-pattern poncho at dusk.",
  },
  {
    id: "674",
    src: "/art/SKINWALKER674.png",
    rarityLabel: "RARE · SKIN STALKER",
    rarity: "Rare",
    title: "Skin Stalker #674",
    alt: "An orange bat-eared gremlin beast baring its fangs, wearing a flame-patterned collar under a swirling starfield.",
  },
  {
    id: "192",
    src: "/art/SKINWALKER192.png",
    rarityLabel: "COMMON · TRIBE",
    rarity: "Common",
    title: "Tribe #192",
    alt: "A horned brown demon-bull beast with glowing orange eyes in a green patterned robe against a desert horizon.",
  },
  {
    id: "314",
    src: "/art/SKINWALKER314.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #314",
    alt: "A jackal skull with a third eye wearing an orange starburst robe embroidered with a crescent moon, under a starry sky.",
  },
  {
    id: "91",
    src: "/art/SKINWALKER91.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #91",
    alt: "A dark bat-eared wolf with a fanged grin in a cyan-and-magenta zigzag poncho, surrounded by occult symbols on a blue starfield.",
  },
  {
    id: "95",
    src: "/art/SKINWALKER95.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #95",
    alt: "A dark fanged wolf-spirit in a teal-and-magenta patterned poncho against a swirling blue night sky.",
  },
  {
    id: "161",
    src: "/art/SKINWALKER161.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #161",
    alt: "A teal-headed snarling wolf with an orange fanged jaw and a red-and-blue tribal collar in a dark forest.",
  },
  {
    id: "175",
    src: "/art/SKINWALKER175.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #175",
    alt: "A grey owl-wolf mask with red eyes beneath a moon, wearing a green zigzag collar marked with a skull, under a night sky.",
  },
  {
    id: "176",
    src: "/art/SKINWALKER176.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #176",
    alt: "A snarling dark wolf with a teal mane in a bright geometric sweater on a green field.",
  },
  {
    id: "662",
    src: "/art/SKINWALKER662.png",
    rarityLabel: "COMMON · TRICKSTER",
    rarity: "Common",
    title: "Trickster #662",
    alt: "A brown antlered hyena-wolf with yellow eyes and a single fang, in a green-and-gold maze poncho on a teal field.",
  },
];

export interface Stat {
  key: string;
  label: string;
  value: string;
  mono: boolean;
  live?: boolean;
}

export const stats: Stat[] = [
  { key: "supply", label: "Supply", value: collection.supply, mono: true },
  { key: "price", label: "Mint Price", value: collection.mintPrice, mono: true },
  { key: "chain", label: "Chain", value: collection.chain, mono: false },
  { key: "minted", label: "Minted", value: FILL, mono: true, live: true },
];

/** Utility — thematic categories; owner confirms specifics marked FILL. */
export const utility = {
  intro:
    "Holding a SHAPESHIFTER isn't a receipt. It's a pact. Here's what carrying one gets you.",
  items: [
    {
      title: "Full commercial rights",
      body: "You own the art on your token outright — print it, animate it, build a brand on it. No permission slips.",
    },
    {
      title: "The Den",
      body: "A token-gated room for holders: alpha, art drops, and first look at everything before it goes public.",
    },
    {
      title: "Shapeshift claims",
      body: "Holders are first in line for future skins, companion drops, and physical totems. Details announced in the Den.",
    },
    {
      title: "Ritual allowlist",
      body: "Every SHAPESHIFTER is a guaranteed spot for what comes next. The tribe grows inward first.",
    },
  ],
} as const;

export const roadmap = [
  {
    phase: "I",
    title: "The Summoning",
    body: "Mint. The full collection walks. Holder verification and the Den open the same day.",
    status: "next" as const,
  },
  {
    phase: "II",
    title: "The Tribe Gathers",
    body: "Commercial-rights toolkit, high-res trait exports, and community rituals. Holder-voted direction.",
    status: "later" as const,
  },
  {
    phase: "III",
    title: "New Skins",
    body: "Companion drops and shapeshift claims for holders. Physical totems explored with the tribe.",
    status: "later" as const,
  },
  {
    phase: "IV",
    title: "Beyond the Veil",
    body: "The long game — kept honest, announced when it's real, never dated before it can ship.",
    status: "later" as const,
  },
] as const;

/** Team — pseudonymous handles + roles. Identities/handles are FILL. */
export const team = [
  { name: FILL, role: "Founder", handle: FILL },
  { name: FILL, role: "Artist", handle: FILL },
  { name: FILL, role: "Engineering", handle: FILL },
] as const;

export const faq = [
  {
    q: "What is SHAPESHIFTERS?",
    a: "A collection of folk-horror totem portraits — shapeshifter spirits caught mid-transformation. Each carries a rarity: Common Trickster/Tribe, Rare Skin Stalker, or the Legendary Walker Seal.",
  },
  {
    q: "What chain is it on, and what wallet do I need?",
    a: `SHAPESHIFTERS mints on ${collection.chain === FILL ? "a chain the team will confirm before mint" : collection.chain}. You'll need a standard self-custody wallet (e.g. MetaMask or Rainbow) with funds for the mint plus a little for network gas.`,
  },
  {
    q: "How much does it cost and when is mint?",
    a: `Mint price and the exact date go live on this page and our channels before mint. They are shown in the stats bar the moment they're set — nothing here is a promise of value.`,
  },
  {
    q: "What is gas?",
    a: "Gas is the network fee paid to process your transaction. It goes to the network, not to us, and varies with congestion. Keep a small buffer beyond the mint price.",
  },
  {
    q: "What happens if it sells out while I'm minting?",
    a: "If supply runs out mid-transaction, the mint reverts and you are only charged network gas, never the mint price. The site shows a clear sold-out state, after which the secondary marketplace is the way in.",
  },
  {
    q: "What do I actually get as a holder?",
    a: "Full commercial rights to your piece, access to the token-gated Den, priority on future skins and drops, and a guaranteed allowlist spot for what's next. Specifics are in the Utility section.",
  },
  {
    q: "Are returns or floor price guaranteed?",
    a: "No. Nothing here is financial advice and no return is promised. Collect SHAPESHIFTERS because you want the art and the tribe — never as an investment expecting profit.",
  },
  {
    q: "Where can I verify the contract?",
    a: "The full contract address is shown in the mint section and footer, with a block-explorer link, before you ever connect a wallet. Always verify you're on the official domain first.",
  },
] as const;

export const legal = {
  disclaimer:
    "SHAPESHIFTERS is an art collectible. Nothing on this page is financial advice or a promise of value, utility, or return. Digital collectibles carry risk; only spend what you can afford to lose.",
  rights: "Art © the SHAPESHIFTERS artist. Holders receive commercial rights to their owned token.",
} as const;
