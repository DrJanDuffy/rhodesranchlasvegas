import Link from "next/link";
import type { Metadata } from "next";
import { BuyerCtaStrip } from "@/components/buyers/BuyerCtaStrip";
import { defaultMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Las Vegas Home Buying Process | Rhodes Ranch Buyers",
  description: `Overview of the Las Vegas area home purchase flow for Rhodes Ranch buyers: search, offer, escrow, and closing—with ${siteContact.secondaryContactName}, ${siteContact.secondaryContactTitle}. Not legal or tax advice.`,
  alternates: { canonical: "/buyers/process" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Las Vegas Home Buying Process",
  },
};

export default function BuyersProcessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
          Buyers · Process overview
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          From search to keys: what Las Vegas buyers typically do
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          This page is an educational overview for Rhodes Ranch and Las Vegas area buyers. Timelines
          vary by lender, property type, and contract. For legal or tax questions, consult a qualified
          Nevada attorney or CPA.
        </p>
        <div className="mt-6">
          <BuyerCtaStrip />
        </div>
      </header>

      <div className="mt-12 max-w-3xl space-y-10 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-emerald-950">1. Budget and pre-approval</h2>
          <p className="mt-3 leading-relaxed">
            Meet with a mortgage loan officer for pre-approval. That sets your price range and helps
            you act quickly when the right Rhodes Ranch Las Vegas home lists.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-emerald-950">2. Search and shortlist</h2>
          <p className="mt-3 leading-relaxed">
            Use the{" "}
            <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              MLS search
            </Link>{" "}
            to track new inventory. Save favorites and note questions about HOA documents, golf
            membership, or community rules—we help you request disclosures through normal channels.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-emerald-950">3. Tours and due diligence</h2>
          <p className="mt-3 leading-relaxed">
            We schedule showings that comply with guard-gated access. For condition and systems, rely
            on licensed inspectors and seller disclosures—not guesswork.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-emerald-950">4. Offer and contract</h2>
          <p className="mt-3 leading-relaxed">
            Offers include price, earnest money, contingencies, and timelines. We explain common
            Las Vegas purchase agreement concepts in plain language; your decisions drive terms.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-emerald-950">5. Escrow and closing</h2>
          <p className="mt-3 leading-relaxed">
            Title and escrow coordinate signatures, payoffs, and recording. Your lender funds the
            loan when conditions are cleared. Closing day ends with keys when the transaction is
            funded and recorded—your escrow officer confirms details.
          </p>
        </section>
      </div>

      <section className="mt-14 rounded-2xl border border-emerald-900/15 bg-emerald-50/50 p-6">
        <h2 className="text-lg font-semibold text-emerald-950">Work with our buyer specialist</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {siteContact.secondaryContactName}, {siteContact.secondaryContactTitle}, supports buyers
          touring and purchasing in {siteContact.serviceAreaDescription}.
        </p>
        <div className="mt-4">
          <BuyerCtaStrip />
        </div>
        <p className="mt-4 text-sm">
          <Link href="/buyers" className="font-medium text-emerald-900 hover:underline">
            Back to buyer hub
          </Link>
        </p>
      </section>
    </main>
  );
}
