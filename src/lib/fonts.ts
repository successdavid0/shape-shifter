import localFont from "next/font/local";

// Self-hosted, woff2, subset latin, display: swap — per PRD §4.3.
// Licences documented in README.md.
//   Syne (OFL) — wide, distinctive futurist display
//   Hanken Grotesk (OFL) — refined grotesk body
//   Space Mono (OFL) — addresses, counts, prices

export const display = localFont({
  variable: "--ff-display",
  display: "swap",
  src: [
    { path: "../../public/fonts/Syne-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Syne-800.woff2", weight: "800", style: "normal" },
  ],
});

export const body = localFont({
  variable: "--ff-body",
  display: "swap",
  src: [
    { path: "../../public/fonts/HankenGrotesk-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/HankenGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/HankenGrotesk-600.woff2", weight: "600", style: "normal" },
  ],
});

export const mono = localFont({
  variable: "--ff-mono",
  display: "swap",
  src: [
    { path: "../../public/fonts/SpaceMono-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/SpaceMono-700.woff2", weight: "700", style: "normal" },
  ],
});
