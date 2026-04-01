import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

const baseUrl = new URL(siteContact.siteUrl);

export const defaultMetadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${siteContact.businessName} | ${siteContact.agentName} | REALTOR®`,
    template: `%s | ${siteContact.businessName}`,
  },
  description: (() => {
    const lead = publicEnv.gbpBusinessDescription
      .split(/(?<=[.!?])\s+/)
      .slice(0, 2)
      .join(" ")
      .trim();
    const tail = `${siteContact.agentName} (${siteContact.agentTitle}). Office: ${siteContact.fullAddressLine}. ${siteContact.legalBrokerage}.`;
    const combined = `${lead} ${tail}`;
    const max = 320;
    return combined.length <= max ? combined : `${combined.slice(0, max - 1).trim()}…`;
  })(),
  robots: { index: true, follow: true },
  ...(publicEnv.googleSiteVerification
    ? { verification: { google: publicEnv.googleSiteVerification } }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteContact.siteUrl,
    siteName: siteContact.businessName,
  },
};
