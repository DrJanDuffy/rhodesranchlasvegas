import Link from "next/link";
import type { Metadata } from "next";
import { NapBlock } from "@/components/sections/NapBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { aeoFaq } from "@/lib/faq-aeo";
import { defaultMetadata, metaDescriptionTail } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Rhodes Ranch and Las Vegas Real Estate Q&A",
  description: `Straight answers about Rhodes Ranch (89148), ${siteContact.agentName}, ${siteContact.secondaryContactName}, home search, open houses, and southwest Las Vegas. ${metaDescriptionTail}`,
  alternates: { canonical: "/questions" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Rhodes Ranch and Las Vegas | Real estate Q&A",
    description: `Straight answers for buyers and sellers in ${siteContact.serviceAreaDescription}. Contact details on this page.`,
  },
};

export default function QuestionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={faqPageJsonLd(aeoFaq)} />
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Q&amp;A · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch and Las Vegas real estate Q&amp;A
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Short, direct answers to common questions about our team, Rhodes Ranch, home search, open
          houses, and southwest Las Vegas—so you can decide what to read next or{" "}
          <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            contact the office
          </Link>{" "}
          with specifics. Office phone and address are listed below.
        </p>
      </header>

      <div className="mt-14">
        <FaqSection
          id="questions-faq-heading"
          heading="Questions and answers"
          items={aeoFaq}
        />
      </div>

      <section className="mt-14 rounded-2xl border border-emerald-900/10 bg-emerald-50/40 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-emerald-950">
          Related guides
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-stone-700">
          <li>
            <Link href="/buyers" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              Home buyer guide (Rhodes Ranch)
            </Link>
          </li>
          <li>
            <Link
              href="/buyers/process"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Las Vegas home buying process
            </Link>
          </li>
          <li>
            <Link
              href="/rhodes-ranch-lifestyle"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch lifestyle &amp; amenities
            </Link>
          </li>
          <li>
            <Link href="/open-houses" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              Open houses by day &amp; weekend map
            </Link>
          </li>
          <li>
            <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              Search Rhodes Ranch area homes
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
