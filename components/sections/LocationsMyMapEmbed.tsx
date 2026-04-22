import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

type LocationsMyMapEmbedProps = {
  className?: string;
  /**
   * h2 on the dedicated /locations page; h3 when nested under other h2s (e.g. future hubs).
   * @default 3
   */
  titleLevel?: 2 | 3;
  id?: string;
  /**
   * `message`: on /locations, show copy when the multi-pin map is not configured yet.
   * `hidden`: return null if no embed URL (contact teaser / compact layouts).
   */
  emptyState?: "message" | "hidden";
};

/**
 * Optional multi-pin map from Google My Maps (free). Set `NEXT_PUBLIC_LOCATIONS_MAP_EMBED_URL`
 * to the iframe `src` from My Maps → Share → Embed on my website.
 */
export function LocationsMyMapEmbed({
  className = "",
  titleLevel = 3,
  id = "locations-mymap",
  emptyState = "hidden",
}: LocationsMyMapEmbedProps) {
  const src = publicEnv.locationsMapEmbedUrl;
  const TitleTag = titleLevel === 2 ? "h2" : "h3";
  const headingId = `${id}-heading`;

  if (!src) {
    if (emptyState === "hidden") return null;
    return (
      <section
        id={id}
        className={className}
        aria-labelledby={headingId}
      >
        <TitleTag
          id={headingId}
          className="font-display text-xl font-semibold text-emerald-950 sm:text-2xl"
        >
          Key locations
        </TitleTag>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          We work from the office below and meet clients across {siteContact.serviceAreaDescription}.
          Call or text to confirm the best place to connect for your appointment. You can also use
          the office map in the next section for door-to-door directions to{" "}
          {siteContact.address.streetAddress}.
        </p>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={className}
      aria-labelledby={headingId}
    >
      <TitleTag
        id={headingId}
        className="font-display text-xl font-semibold text-emerald-950 sm:text-2xl"
      >
        Key locations
      </TitleTag>
      <p className="mt-2 max-w-2xl text-sm text-stone-600">
        Custom map with the office and other places you may visit with {siteContact.agentName} or{" "}
        {siteContact.secondaryContactName}. Created in Google My Maps at no cost—confirm hours and
        access for each stop before you go.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-sm">
        <iframe
          title={`${siteContact.businessName} — key locations map`}
          src={src}
          className="min-h-[320px] w-full border-0 sm:min-h-[400px] lg:min-h-[480px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
