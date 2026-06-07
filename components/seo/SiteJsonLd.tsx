import { generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/config";

/** Site-wide JSON-LD: LocalBusiness + WebSite on every public page. */
export default function SiteJsonLd() {
  const schemas = [generateLocalBusinessSchema(), generateWebSiteSchema()];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
