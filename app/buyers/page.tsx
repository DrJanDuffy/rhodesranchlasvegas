import Link from "next/link";
import type { Metadata } from "next";
import { BuyerCtaStrip } from "@/components/buyers/BuyerCtaStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { buyerFaq } from "@/lib/faq-buyers";
import { defaultMetadata } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Buy a Home in Rhodes Ranch Las Vegas | Buyer Guide",
  description: `Rhodes Ranch Las Vegas home buyers: work with ${siteContact.secondaryContactName}, ${siteContact.secondaryContactTitle}, and ${siteContact.agentName} for MLS search, showings, and offers in 89148. ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/buyers" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: `Rhodes Ranch Buyers | ${siteContact.secondaryContactName}`,
    description: `Search homes, book tours, and get buyer guidance for Rhodes Ranch (89148).`,
  },
};

export default function BuyersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={faqPageJsonLd(buyerFaq)} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
          Home buyers · {siteContact.address.postalCode}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          Buy a home in Rhodes Ranch Las Vegas
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          Whether you are relocating, upsizing, or buying your first Nevada home, our team focuses on
          Rhodes Ranch Las Vegas homes and the surrounding southwest valley.{" "}
          <strong>{siteContact.secondaryContactName}</strong> is your{" "}
          {siteContact.secondaryContactTitle}; <strong>{siteContact.agentName}</strong> leads listing
          strategy when you also sell.
        </p>
        <div className="mt-6">
          <BuyerCtaStrip />
        </div>
      </header>

      <section className="mt-14 space-y-6 text-slate-700">
        <h2 className="text-2xl font-semibold text-emerald-950">
          Why buyers start their search here
        </h2>
        <p className="leading-relaxed">
          Rhodes Ranch offers guard-gated neighborhoods, a Ted Robinson golf course, recreation, and
          quick access to shopping and major roads. When you are ready, we align MLS search filters
          with your budget, commute, and must-haves—then schedule tours that respect community access
          rules.
        </p>
        <BuyerCtaStrip />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-emerald-950">Your buyer journey (overview)</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Finance first.</strong> Connect with a mortgage professional for pre-approval so
            you know your price range and loan options.
          </li>
          <li>
            <strong>Search &amp; save.</strong> Use our{" "}
            <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              MLS search
            </Link>{" "}
            for Rhodes Ranch Las Vegas area listings; ask us to refine results or set showings.
          </li>
          <li>
            <strong>Tour &amp; offer.</strong> We coordinate gated access, review comps with you, and
            structure offers under your direction—not as legal or tax advice.
          </li>
          <li>
            <strong>Close with your partners.</strong> Your lender and title/escrow partners drive
            timelines and documents; we stay in sync through keys.
          </li>
        </ol>
        <p className="mt-6">
          <Link
            href="/buyers/process"
            className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
          >
            Read the step-by-step Las Vegas home buying overview
          </Link>
        </p>
      </section>

      <section className="mt-14 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-emerald-950">
          Explore the neighborhood before you offer
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Lifestyle, golf, and nearby attractions help you decide if Rhodes Ranch fits your daily
          life—not just the floor plan.
        </p>
        <Link
          href="/rhodes-ranch-lifestyle"
          className="mt-4 inline-flex font-semibold text-emerald-900 underline-offset-2 hover:underline"
        >
          Rhodes Ranch lifestyle &amp; area highlights
        </Link>
      </section>

      <div className="mt-16">
        <FaqSection id="buyers-faq-heading" heading="Buyer FAQ" items={buyerFaq} />
      </div>

      <section className="mt-12 border-t border-emerald-900/10 pt-10">
        <h2 className="text-xl font-semibold text-emerald-950">Ready for the next step?</h2>
        <p className="mt-2 text-slate-700">
          Tell us your timeline and must-haves—we will suggest a search plan and tour strategy for
          Rhodes Ranch Las Vegas homes.
        </p>
        <div className="mt-6">
          <BuyerCtaStrip />
        </div>
      </section>
    </main>
  );
}
