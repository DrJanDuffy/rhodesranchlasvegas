import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

function buildMapEmbedSrc(): string {
  if (publicEnv.mapEmbedUrl) {
    return publicEnv.mapEmbedUrl;
  }
  const query =
    publicEnv.mapQuery ??
    [
      siteContact.address.streetAddress,
      siteContact.address.addressLocality,
      siteContact.address.addressRegion,
      siteContact.address.postalCode,
    ].join(", ");
  const addressQuery = encodeURIComponent(query);
  return `https://maps.google.com/maps?q=${addressQuery}&hl=en&z=14&output=embed`;
}

/** Google Maps embed for the office; override with NEXT_PUBLIC_MAP_EMBED_URL or NEXT_PUBLIC_MAP_QUERY. */
export function MapEmbed({ title = "Office location map" }: { title?: string }) {
  const mapSrc = buildMapEmbedSrc();

  return (
    <section
      aria-label={title}
      className="overflow-hidden rounded-2xl border border-emerald-900/15 shadow-sm"
    >
      <iframe
        title={title}
        src={mapSrc}
        className="h-72 w-full border-0 sm:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
