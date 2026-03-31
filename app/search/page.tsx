import type { Metadata } from "next";
import Link from "next/link";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { defaultMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Search Rhodes Ranch Las Vegas Area Homes for Sale | Active Listings",
  description: `Browse up-to-date homes for sale on this site. For Rhodes Ranch Las Vegas homes (89148), contact ${siteContact.agentName} (${siteContact.agentTitle}) or ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). Office: ${siteContact.fullAddressLine}. ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/search" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Search Las Vegas Area Homes for Sale",
    description: `Find homes for sale near Rhodes Ranch and 89148. Office: ${siteContact.fullAddressLine}.`,
  },
};

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Home search · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Search Rhodes Ranch Las Vegas area homes for sale
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Explore active listings with the on-site home search. Narrow results with your agent—or ask{" "}
          {siteContact.agentName} ({siteContact.agentTitle}) or {siteContact.secondaryContactName} (
          {siteContact.secondaryContactTitle}) for a Rhodes Ranch–focused search that matches budget,
          timing, and must-haves.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          <Link href="/contact#schedule" className="font-medium text-emerald-900 hover:underline">
            Schedule a private consult
          </Link>{" "}
          ·{" "}
          <Link href="/" className="font-medium text-emerald-900 hover:underline">
            Back to Rhodes Ranch overview
          </Link>
        </p>
      </header>

      <RealScoutLeadSection
        className="mt-10"
        listingIntro="Refine by price, status, and property type, then reach out for a tour in Rhodes Ranch, Spring Valley, or the southwest valley."
      />
    </main>
  );
}
