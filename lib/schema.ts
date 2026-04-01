import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

const base = siteContact.siteUrl.replace(/\/$/, "");

/** WebSite graph node — pairs with RealEstateAgent for Search Console / rich result clarity. */
export function websiteJsonLd(): Record<string, unknown> {
  const base = siteContact.siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: siteContact.businessName,
    url: base,
    inLanguage: "en-US",
    publisher: { "@id": `${base}/#agent` },
  };
}

export function realEstateAgentJsonLd(): Record<string, unknown> {
  const openingHoursSpecification = siteContact.openingHoursSpecification.map(
    (row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    }),
  );

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${base}/#agent`,
    name: siteContact.agentName,
    brand: {
      "@type": "Brand",
      name: siteContact.businessName,
    },
    jobTitle: siteContact.agentTitle,
    description: `${publicEnv.gbpBusinessDescription} ${siteContact.agentName} is the ${siteContact.agentTitle} (Nevada license ${siteContact.license}) with ${siteContact.legalBrokerage}. ${siteContact.fullAddressLine}.`,
    url: base,
    telephone: siteContact.phoneE164,
    email: siteContact.email,
    identifier: {
      "@type": "PropertyValue",
      name: "Nevada real estate license",
      value: siteContact.license,
    },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address.streetAddress,
      addressLocality: siteContact.address.addressLocality,
      addressRegion: siteContact.address.addressRegion,
      postalCode: siteContact.address.postalCode,
      addressCountry: siteContact.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteContact.geo.latitude,
      longitude: siteContact.geo.longitude,
    },
    areaServed: {
      "@type": "Place",
      name: siteContact.serviceAreaDescription,
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteContact.legalBrokerage,
    },
    openingHoursSpecification,
    potentialAction: {
      "@type": "ScheduleAction",
      name: "Schedule a private conversation",
      target: {
        "@type": "EntryPoint",
        urlTemplate: publicEnv.calendlyEventUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
    knowsAbout: [
      "Rhodes Ranch Las Vegas homes",
      "Rhodes Ranch Las Vegas",
      "Rhodes Ranch Golf Club",
      "89148 real estate",
      `${siteContact.address.streetAddress} ${siteContact.address.addressLocality}`,
      "Southwest Las Vegas homes",
      "Las Vegas open houses",
      "Rhodes Ranch open houses",
    ],
  };
}

export type FaqItem = { question: string; answer: string };

export function faqPageJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
