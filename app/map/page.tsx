import Link from "next/link";
import type { Metadata } from "next";
import { NapBlock } from "@/components/sections/NapBlock";
import { defaultMetadata, metaAddressOnly } from "@/lib/metadata";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Rhodes Ranch and Spring Valley Area Map | Las Vegas 89148",
  description: `Interactive map of Rhodes Ranch and Spring Valley (${siteContact.address.postalCode})—orientation for buyers and sellers. ${metaAddressOnly} ${siteContact.agentName}, ${siteContact.agentTitle}. ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/map" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Rhodes Ranch and Spring Valley map | Las Vegas 89148",
    description: `Community map for 89148. ${metaAddressOnly}`,
  },
};

export default function MapPage() {
  const embedSrc = publicEnv.rhodesRanchAreaMapEmbedUrl;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Area guide · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch and Spring Valley area map
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Use the embedded Google Map to orient to Rhodes Ranch, Spring Valley, and southwest Las
          Vegas. For homes, tours, or pricing,{" "}
          <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            search homes for sale
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            contact {siteContact.agentName} or {siteContact.secondaryContactName}
          </Link>
          .
        </p>
      </header>

      <section
        className="mt-10 overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-sm"
        aria-labelledby="embed-map-heading"
      >
        <h2 id="embed-map-heading" className="sr-only">
          Rhodes Ranch and Spring Valley interactive map
        </h2>
        <div className="relative aspect-4/3 w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
          <iframe
            title="Map of Rhodes Ranch, Spring Valley, Nevada"
            src={embedSrc}
            width={600}
            height={450}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <p className="mt-6 text-sm text-stone-600">
        Map data © Google. Boundaries and labels are for orientation only; verify schools, HOA, and
        parcel lines with official sources.
      </p>

      <div className="mt-10 max-w-2xl">
        <NapBlock />
      </div>
    </main>
  );
}
