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
  email: publicEnv.email,
  phoneDisplay: publicEnv.phoneDisplay,
  phoneE164: publicEnv.phoneE164,
  phoneTelHref: telHrefFromE164(publicEnv.phoneE164),
  address: {
    streetAddress: publicEnv.addressStreet,
    addressLocality: publicEnv.addressLocality,
    addressRegion: publicEnv.addressRegion,
    postalCode: publicEnv.postalCode,
    addressCountry: publicEnv.addressCountry,
  },
  geo: {
    latitude: publicEnv.geoLatitude,
    longitude: publicEnv.geoLongitude,
  },
  openingHoursSpecification: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: publicEnv.officeWeekdayOpens,
      closes: publicEnv.officeWeekdayCloses,
    },
  ],
  serviceAreaDescription: publicEnv.serviceAreaDescription,
  hoursSummaryLine: publicEnv.hoursSummaryLine,
} as const;

export type SiteContact = typeof siteContact;
