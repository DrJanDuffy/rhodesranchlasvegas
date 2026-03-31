import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

const base = siteContact.siteUrl.replace(/\/$/, "");

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
    jobTitle: siteContact.agentTitle,
    description: `${siteContact.agentName} is a ${siteContact.agentTitle} helping clients buy and sell Rhodes Ranch Las Vegas homes (89148) with ${siteContact.legalBrokerage}. Office: ${siteContact.fullAddressLine}.`,
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
