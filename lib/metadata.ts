import type { Metadata } from "next";
import { siteContact } from "@/lib/site-contact";

const baseUrl = new URL(siteContact.siteUrl);

export const defaultMetadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${siteContact.agentName} | Rhodes Ranch Las Vegas Homes | REALTOR®`,
    template: `%s | ${siteContact.agentName} ${siteContact.legalBrokerage}`,
  },
  description: `${siteContact.agentName}, ${siteContact.agentTitle}, focuses on Rhodes Ranch Las Vegas homes (89148): guard-gated golf community, Ted Robinson course, and southwest Las Vegas. Office: ${siteContact.fullAddressLine}. ${siteContact.legalBrokerage}.`,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteContact.siteUrl,
    siteName: `${siteContact.agentName} | Rhodes Ranch Las Vegas Homes`,
  },
};
