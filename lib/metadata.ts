import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

const baseUrl = new URL(siteContact.siteUrl);

/** Address + brokerage for meta descriptions (avoids repeating stiff “Office:” in every snippet). */
export const metaDescriptionTail = `${siteContact.fullAddressLine}. ${siteContact.legalBrokerage}.`;

/** Single-line address with period (when brokerage is already mentioned in the same sentence). */
export const metaAddressOnly = `${siteContact.fullAddressLine}.`;

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
    const tail = `${siteContact.agentName} (${siteContact.agentTitle}). ${metaDescriptionTail}`;
    const combined = `${lead} ${tail}`;
    const max = 320;
    return combined.length <= max ? combined : `${combined.slice(0, max - 1).trim()}…`;
  })(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(publicEnv.googleSiteVerification
    ? { verification: { google: publicEnv.googleSiteVerification } }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteContact.siteUrl,
    siteName: siteContact.businessName,
  },
  twitter: {
    card: "summary",
    title: `${siteContact.businessName} | ${siteContact.agentName}`,
    description: `Rhodes Ranch and Las Vegas 89148 real estate with ${siteContact.agentName}. ${metaAddressOnly}`,
  },
};
