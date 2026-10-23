import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, body, mono } from "@/lib/fonts";
import { collection } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MintProvider } from "@/components/web3/MintProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

const title = `${collection.name} — ${collection.tagline}`;
const description = collection.pitch;
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${collection.name} — ${collection.tagline}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${collection.name}`,
  },
  description,
  applicationName: collection.name,
  keywords: [
    "NFT",
    "collection",
    "mint",
    "whitelist",
    "allowlist",
    collection.name,
    collection.edition,
    "digital art",
    "PFP",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title,
    description,
    siteName: collection.name,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <head>
        {/* Without JS, motion's initial hidden state would stay applied —
            force reveal wrappers visible so content is fully usable. */}
        <noscript>
          <style>{`.js-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="grain flex min-h-dvh flex-col">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-surface"
        >
          Skip to content
        </a>
        <MintProvider>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </MintProvider>
      </body>
    </html>
  );
}
