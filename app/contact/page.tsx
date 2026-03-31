import type { Metadata } from "next";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactFaq } from "@/lib/faq-contact";
import { defaultMetadata } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: `Schedule a consultation | Contact ${siteContact.agentName} | Rhodes Ranch Las Vegas 89148`,
  description: `Book a private 15-minute conversation with ${siteContact.agentName} or reach ${siteContact.secondaryContactName} for Rhodes Ranch Las Vegas homes. Call ${siteContact.phoneDisplay}, visit ${siteContact.address.addressLocality} office, or use the calendar below. Nevada license ${siteContact.license}. ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: `Schedule with ${siteContact.agentName} | Rhodes Ranch Las Vegas`,
    description: `Schedule a consultation or call for Rhodes Ranch and 89148 real estate. ${siteContact.legalBrokerage}.`,
  },
};

const gbpSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${siteContact.agentName} ${siteContact.legalBrokerage} ${siteContact.address.streetAddress} ${siteContact.address.addressLocality} ${siteContact.address.addressRegion}`,
  );

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={faqPageJsonLd(contactFaq)} />
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Get in touch
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Contact the Rhodes Ranch Las Vegas team
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          <strong>{siteContact.agentName}</strong> ({siteContact.agentTitle}) and{" "}
          <strong>{siteContact.secondaryContactName}</strong> ({siteContact.secondaryContactTitle}
          ). Book a time on the calendar below, call{" "}
          <a href={siteContact.phoneTelHref} className="font-semibold text-emerald-900 underline-offset-2 hover:underline">
            {siteContact.phoneDisplay}
          </a>
          , or email—hours: {siteContact.hoursSummaryLine}
        </p>
      </header>

      <RealScoutLeadSection
        className="mt-10"
        listingIntro="See active listings before you book time on the calendar—narrow your search by price and features, then use the scheduler below for a 15-minute private conversation."
      />

      <section
        id="schedule"
        className="mt-14 scroll-mt-24"
        aria-labelledby="schedule-heading"
      >
        <h2
          id="schedule-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
        >
          Schedule a private 15-minute conversation
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
          Pick a time that works for you. Prefer phone or email first? Use the NAP block below—the
          same numbers and addresses match our Google Business Profile.
        </p>
        <div className="mt-6 rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-4">
          <CalendlyInline />
        </div>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <a
              href={siteContact.phoneTelHref}
              className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-900"
            >
              Call {siteContact.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Email {siteContact.agentName} (listings)
            </a>
            <a
              href={`mailto:${siteContact.secondaryEmail}`}
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Email {siteContact.secondaryContactName} (buyers)
            </a>
            <a
              href={gbpSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Directions
            </a>
            <a
              href={gbpSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Google reviews
            </a>
          </div>
          <NapBlock />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-emerald-950">Map &amp; service area</h2>
          <MapEmbed title="Berkshire Hathaway HomeServices Nevada Properties office map" />
          <p className="text-sm text-slate-600">
            {siteContact.agentName} and {siteContact.secondaryContactName} serve buyers and sellers
            in {siteContact.serviceAreaDescription}.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <FaqSection
          id="contact-faq-heading"
          heading="Questions about scheduling and contact"
          items={contactFaq}
        />
      </div>
    </main>
  );
}
