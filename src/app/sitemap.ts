import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Single-page site — only the root is a real route.
const routes = [""] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
