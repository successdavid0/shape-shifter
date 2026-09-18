import type { MetadataRoute } from "next";
import { collection } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${collection.name} — ${collection.tagline}`,
    short_name: collection.name,
    description: collection.pitch,
    start_url: "/",
    display: "standalone",
    background_color: "#06030f",
    theme_color: "#06030f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
