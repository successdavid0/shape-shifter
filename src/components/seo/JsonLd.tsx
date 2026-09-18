import { collection, isFill } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/** Organization + WebSite structured data (PRD §10). */
export function JsonLd() {
  const sameAs = [collection.socials.x, collection.socials.discord, collection.socials.telegram].filter(
    (u) => !isFill(u)
  );

  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: collection.name,
      url: SITE_URL,
      description: collection.pitch,
      logo: `${SITE_URL}/icon.svg`,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: collection.name,
      url: SITE_URL,
      description: collection.pitch,
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: "en",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // structured data is static, built from typed content
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
