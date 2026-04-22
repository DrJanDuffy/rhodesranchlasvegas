import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

const base = siteContact.siteUrl.replace(/\/$/, "");

const websiteDescription =
  publicEnv.gbpBusinessDescription.length > 500
    ? `${publicEnv.gbpBusinessDescription.slice(0, 497).trim()}…`
    : publicEnv.gbpBusinessDescription;

/** WebSite graph node — pairs with RealEstateAgent for Search Console + GBP entity consistency. */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: siteContact.businessName,
    url: base,
    description: websiteDescription,
    inLanguage: "en-US",
    publisher: { "@id": `${base}/#agent` },
    image: `${base}/og-default.png`,
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

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${base}/#agent`,
    name: siteContact.agentName,
    image: `${base}/og-default.png`,
    logo: {
      "@type": "ImageObject",
      url: `${base}/og-default.png`,
    },
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
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
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
      ...(siteContact.gbpHighlightAttributesLine
        ? [
            "Women-owned real estate business Las Vegas",
            "Veteran-owned business Las Vegas",
          ]
        : []),
    ],
  };

  if (publicEnv.schemaSameAs.length > 0) {
    node.sameAs = [...publicEnv.schemaSameAs];
  }

  return node;
}

export type BreadcrumbCrumb = { name: string; path: string };

/** WebPage node — links to WebSite + agent for GBP / entity clarity (use on key landing URLs). */
export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  const p = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const pageUrl = `${base}${p}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#agent` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${base}/og-default.png`,
    },
    inLanguage: "en-US",
  };
}

/** BreadcrumbList JSON-LD — match visible breadcrumbs; helps GSC rich results. */
export function breadcrumbListJsonLd(crumbs: BreadcrumbCrumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${base}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
    })),
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
