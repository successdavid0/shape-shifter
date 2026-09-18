import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, body, mono } from "@/lib/fonts";
import { collection } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const title = `${collection.name} — ${collection.tagline}`;
const description = collection.pitch;

export const metadata: Metadata = {
  metadataBase: new URL("https://skinwalker.example"),
  title: {
    default: title,
    template: `%s — ${collection.name}`,
  },
  description,
  applicationName: collection.name,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: collection.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06030f",
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
      <body className="grain min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-surface"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
