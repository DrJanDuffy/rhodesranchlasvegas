import { publicEnv, telHrefFromE164 } from "@/lib/env";

/**
 * Single source of truth for NAP, license, and brokerage (backed by public env + defaults).
 * Override via NEXT_PUBLIC_* in `.env.local` or Vercel; keep JSON-LD and visible copy aligned with GBP.
 */
export const siteContact = {
  siteUrl: publicEnv.siteUrl,
  /** Short brand for titles and manifest (GBP legal name is `businessName`). */
  siteBrandShort: publicEnv.siteBrandShort,
  agentName: publicEnv.agentName,
  businessName: publicEnv.businessName,
  legalBrokerage: publicEnv.legalBrokerage,
  license: publicEnv.license,
  agentTitle: publicEnv.agentTitle,
  email: publicEnv.email,
  secondaryEmail: publicEnv.secondaryContactEmail,
  secondaryContactName: publicEnv.secondaryContactName,
  secondaryContactTitle: publicEnv.secondaryContactTitle,
  phoneDisplay: publicEnv.phoneDisplay,
  phoneE164: publicEnv.phoneE164,
  phoneTelHref: telHrefFromE164(publicEnv.phoneE164),
  phoneSmsHref: publicEnv.phoneSmsHref,
  /** Google Business Profile “About your business” (same source as visible About + JSON-LD description seed). */
  gbpBusinessDescription: publicEnv.gbpBusinessDescription,
  address: {
    streetAddress: publicEnv.addressStreet,
    addressLocality: publicEnv.addressLocality,
    addressRegion: publicEnv.addressRegion,
    postalCode: publicEnv.postalCode,
    addressCountry: publicEnv.addressCountry,
  },
  /** Single-line NAP street + city + state + ZIP (align with Google Business Profile for GSC). */
  fullAddressLine: `${publicEnv.addressStreet}, ${publicEnv.addressLocality}, ${publicEnv.addressRegion} ${publicEnv.postalCode}`,
  geo: {
    latitude: publicEnv.geoLatitude,
    longitude: publicEnv.geoLongitude,
  },
  openingHoursSpecification: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: publicEnv.officeWeekdayOpens,
      closes: publicEnv.officeWeekdayCloses,
    },
  ],
  serviceAreaDescription: publicEnv.serviceAreaDescription,
  hoursSummaryLine: publicEnv.hoursSummaryLine,
  /** Mirrors GBP “From the business” highlights (empty string = hide in UI). */
  gbpHighlightAttributesLine: publicEnv.gbpHighlightAttributesLine,
  /** Google My Maps embed URL for open houses (homepage). */
  openHousesMapEmbedUrl: publicEnv.openHousesMapEmbedUrl,
} as const;

/**
 * Google Maps / reviews destination: optional GBP place or g.page link from env; otherwise NAP-based Maps search.
 * Keeps footer, contact, and GBP “website” field aligned when you paste the official profile URL in Vercel.
 */
export function googleMapsProfileHref(): string {
  const explicit = publicEnv.googleBusinessProfileMapsUrl;
  if (explicit) return explicit;
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      `${publicEnv.agentName} ${publicEnv.legalBrokerage} ${publicEnv.addressStreet} ${publicEnv.addressLocality} ${publicEnv.addressRegion}`,
    )
  );
}

/** Google Search share URL (see `publicEnv.googleSearchShareUrl`); opens the saved “Rhodes Ranch Las Vegas” SERP. */
export function googleSearchShareHref(): string {
  return publicEnv.googleSearchShareUrl;
}

export type SiteContact = typeof siteContact;
