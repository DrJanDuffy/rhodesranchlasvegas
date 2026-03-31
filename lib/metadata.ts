import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

const baseUrl = new URL(siteContact.siteUrl);

export const defaultMetadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: `${siteContact.agentName} | ${publicEnv.siteBrandShort} | Las Vegas REALTOR®`,
    template: `%s | ${siteContact.agentName} ${siteContact.legalBrokerage}`,
  },
  description: `Rhodes Ranch real estate in southwest Las Vegas (89148): gated golf community, Ted Robinson course, and resort-style living. Work with ${siteContact.agentName}, ${siteContact.legalBrokerage}.`,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteContact.siteUrl,
    siteName: `${siteContact.agentName} | ${publicEnv.siteBrandShort}`,
  },
};
