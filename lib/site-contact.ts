import { publicEnv, telHrefFromE164 } from "@/lib/env";

/**
 * Single source of truth for NAP, license, and brokerage (backed by public env + defaults).
 * Override via NEXT_PUBLIC_* in `.env.local` or Vercel; keep JSON-LD and visible copy aligned with GBP.
 */
export const siteContact = {
  siteUrl: publicEnv.siteUrl,
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
  /** Google My Maps embed URL for open houses (homepage). */
  openHousesMapEmbedUrl: publicEnv.openHousesMapEmbedUrl,
} as const;

export type SiteContact = typeof siteContact;
