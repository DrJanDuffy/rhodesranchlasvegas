import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { NapBlock } from "@/components/sections/NapBlock";
import { defaultMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: `Contact ${siteContact.agentName} & ${siteContact.secondaryContactName} | Rhodes Ranch Las Vegas`,
  description: `Call or email ${siteContact.agentName} (${siteContact.agentTitle}) or ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}) for Rhodes Ranch Las Vegas homes. Nevada license ${siteContact.license}. ${siteContact.legalBrokerage}. ${siteContact.address.streetAddress}, ${siteContact.address.addressLocality}, ${siteContact.address.addressRegion} ${siteContact.address.postalCode}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: `Contact ${siteContact.agentName} | Rhodes Ranch Las Vegas team`,
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
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          Contact the Rhodes Ranch Las Vegas team
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          <strong>{siteContact.agentName}</strong> ({siteContact.agentTitle}) and{" "}
          <strong>{siteContact.secondaryContactName}</strong> ({siteContact.secondaryContactTitle}
          ). Reach us by phone or email, send a secure message, or open directions in Google Maps.
          Hours: {siteContact.hoursSummaryLine}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
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
          <ContactForm />
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
    </main>
  );
}
