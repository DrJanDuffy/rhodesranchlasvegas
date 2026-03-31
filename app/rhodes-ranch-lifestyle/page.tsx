import type { Metadata } from "next";
import Link from "next/link";
import { defaultMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Rhodes Ranch Lifestyle & Nearby Attractions | Las Vegas",
  description:
    "Golf, recreation, and day trips near Rhodes Ranch (89148): Rhodes Ranch Golf Club, local parks, water parks, Red Rock Canyon, and Strip resorts—area context for buyers and sellers.",
  alternates: { canonical: "/rhodes-ranch-lifestyle" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Rhodes Ranch Lifestyle & Nearby Attractions",
  },
};

const highlights = [
  {
    name: "Rhodes Ranch Golf Club",
    href: "https://rhodesranchgolf.com",
    body: "Ted Robinson design; public tee time and membership details live on the club’s official site.",
  },
  {
    name: "Wet‘n’Wild Las Vegas",
    href: "https://www.wetnwildlasvegas.com",
    body: "Regional water park—fun for families a short drive from southwest Las Vegas.",
  },
  {
    name: "Cowabunga Canyon Waterpark",
    href: "https://www.cowabungacanyon.com",
    body: "Another summer water-park option for valley residents and visitors.",
  },
  {
    name: "Red Ridge Park",
    href: "https://www.google.com/maps/search/?api=1&query=Red+Ridge+Park+Las+Vegas+NV",
    body: "Local parks add trails and green space; confirm hours and amenities with the operator.",
  },
  {
    name: "Red Rock Canyon National Conservation Area",
    href: "https://www.nps.gov/redw",
    body: "Hiking and scenic drives west of the valley—popular for outdoor weekends.",
  },
  {
    name: "Las Vegas Strip resorts",
    href: "https://www.visitlasvegas.com",
    body: "Bellagio, Caesars Palace, The Venetian, and more—world-class dining and entertainment.",
  },
];

export default function RhodesRanchLifestylePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
          Area guide · Not affiliated with named venues
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
          Rhodes Ranch lifestyle &amp; things to do nearby
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          {siteContact.serviceAreaDescription}. Use this page for orientation: golf and HOA-related
          amenities are governed by their operators, while city and county resources set park hours
          and fees. Links open official or authoritative sites when possible.
        </p>
      </header>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold text-emerald-950">
          Recreation &amp; landmarks (editorial)
        </h2>
        <ul className="space-y-6">
          {highlights.map((item) => (
            <li
              key={item.name}
              className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-medium text-slate-900">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-900 underline-offset-2 hover:underline"
                >
                  {item.name}
                </a>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-dashed border-emerald-900/25 bg-emerald-50/50 p-6">
        <h2 className="text-xl font-semibold text-emerald-950">Work with a local REALTOR®</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Ready to tour homes or talk exit strategy? Return to the{" "}
          <Link href="/" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            Rhodes Ranch overview
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            contact {siteContact.agentName} or {siteContact.secondaryContactName}
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
