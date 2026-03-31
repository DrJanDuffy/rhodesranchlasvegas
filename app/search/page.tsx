import type { Metadata } from "next";
import Link from "next/link";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { defaultMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Search Rhodes Ranch Las Vegas Area Homes for Sale | MLS Listings",
  description: `Browse MLS-powered listings with RealScout. For Rhodes Ranch Las Vegas homes (89148), contact ${siteContact.agentName} (${siteContact.agentTitle}) or ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/search" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Search Las Vegas Area Listings",
  },
};

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          Search Rhodes Ranch Las Vegas area homes for sale
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          Explore active listings via RealScout. Narrow results with your agent—or ask{" "}
          {siteContact.agentName} ({siteContact.agentTitle}) or {siteContact.secondaryContactName} (
          {siteContact.secondaryContactTitle}) for a Rhodes Ranch–focused search that matches budget,
          timing, and must-haves.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          <Link href="/contact" className="font-medium text-emerald-900 hover:underline">
            Request a private consult
          </Link>{" "}
          ·{" "}
          <Link href="/" className="font-medium text-emerald-900 hover:underline">
            Back to Rhodes Ranch overview
          </Link>
        </p>
      </header>

      <RealScoutLeadSection className="mt-10" />
    </main>
  );
}
