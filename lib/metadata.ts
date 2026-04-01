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
  description: `${siteContact.agentName}, ${siteContact.agentTitle}, focuses on Rhodes Ranch Las Vegas homes (89148): guard-gated golf community, Ted Robinson course, and southwest Las Vegas. Office: ${siteContact.fullAddressLine}. ${siteContact.legalBrokerage}.`,
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
