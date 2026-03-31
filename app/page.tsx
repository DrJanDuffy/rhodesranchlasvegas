import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { NapBlock } from "@/components/sections/NapBlock";
import { rhodesRanchFaq } from "@/lib/faq-rhodes-ranch";
import { defaultMetadata } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Rhodes Ranch Homes for Sale | Las Vegas REALTOR®",
  description:
    "Rhodes Ranch (89148) real estate: gated golf community, Ted Robinson course, and southwest Las Vegas lifestyle. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  alternates: { canonical: "/" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Rhodes Ranch Homes for Sale | Dr. Jan Duffy",
    description:
      "Buy or sell in Rhodes Ranch with a local REALTOR®. Guard-gated golf community in 89148.",
  },
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={faqPageJsonLd(rhodesRanchFaq)} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
          Southwest Las Vegas · {siteContact.address.postalCode}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          Rhodes Ranch homes &amp; lifestyle in Las Vegas
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          Rhodes Ranch is a guard-gated, master-planned community in Spring Valley—about six miles
          southwest of the Las Vegas Strip—with a central golf course, recreation, and easy access
          to major roads, shopping, and schools. Work with{" "}
          <strong>{siteContact.agentName}</strong>, {siteContact.legalBrokerage}, for listings,
          showings, and strategy tailored to this neighborhood.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/search"
            className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-900"
          >
            View area listings
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
          >
            Call or message
          </Link>
        </div>
      </header>

      <section className="mt-14 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 text-slate-700">
          <h2 className="text-2xl font-semibold text-emerald-950">
            Why buyers watch Rhodes Ranch
          </h2>
          <p className="leading-relaxed">
            The community wraps around{" "}
            <a
              href="https://rhodesranchgolf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch Golf Club
            </a>
            , a Ted Robinson design that opened in 1997. Beyond golf, residents use parks, trails,
            and club facilities—plus everyday convenience from southwest Las Vegas retail and
            dining.
          </p>
          <p className="leading-relaxed">
            Need context for the broader valley? Explore{" "}
            <Link href="/rhodes-ranch-lifestyle" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              Rhodes Ranch lifestyle &amp; nearby attractions
            </Link>{" "}
            — from Red Rock Canyon day trips to Strip entertainment—without losing focus on what makes
            89148 home.
          </p>
        </div>
        <NapBlock />
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-emerald-950">
          Rhodes Ranch real estate help
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
          Whether you are relocating from California, upsizing locally, or preparing to sell,
          {siteContact.agentName} provides pricing perspective, contract guidance, and MLS search
          support aligned with today&apos;s market—without sensational claims. Start with a
          conversation or browse{" "}
          <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            active listings
          </Link>
          .
        </p>
      </section>

      <div className="mt-16">
        <FaqSection id="faq-heading" heading="Rhodes Ranch FAQ" items={rhodesRanchFaq} />
      </div>
    </main>
  );
}
