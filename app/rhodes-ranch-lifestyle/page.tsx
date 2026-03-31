import type { Metadata } from "next";
import Link from "next/link";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { defaultMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title:
    "Rhodes Ranch Community Guide: Golf, Amenities & Southwest Las Vegas Lifestyle | 89148",
  description: `Guard-gated Rhodes Ranch (89148): Ted Robinson golf, recreation center, trails, and resort-style living southwest of the Strip. Community context for buyers and sellers—${siteContact.agentName}, ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/rhodes-ranch-lifestyle" },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Rhodes Ranch community guide: golf, amenities & Las Vegas 89148 lifestyle",
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Community guide · {siteContact.address.postalCode} · Not affiliated with named venues
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.4rem]">
          Rhodes Ranch community guide: golf, amenities &amp; southwest Las Vegas lifestyle
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          {siteContact.serviceAreaDescription}. Below is an editorial overview of the neighborhood—
          golf and HOA-related amenities are operated by their respective organizations; verify
          hours, fees, and programs directly with them. Retail and attraction names are for
          orientation only.
        </p>
      </header>

      <RealScoutLeadSection
        className="mt-10"
        listingIntro="Pair this community overview with live results for homes for sale—see listings near Rhodes Ranch golf, gates, and trails."
      />

      <div className="mt-12 max-w-3xl space-y-12 text-stone-700">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Rhodes Ranch at a glance
          </h2>
          <p className="mt-4 leading-relaxed">
            Rhodes Ranch is a guard-gated, roughly 1,330-acre master-planned community in Spring
            Valley—about 15 minutes southwest of the Las Vegas Strip. Development began in 1997,
            and the neighborhood is often called the &ldquo;Oasis in the Southwest.&rdquo; A scenic,
            circular two-mile walking path loops through the community. Multiple builders have
            contributed homes over the years, so you will see varied architecture and floor plans side
            by side.
          </p>
          <p className="mt-4 leading-relaxed">
            For orientation, see our{" "}
            <Link
              href="/map"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch &amp; Spring Valley map
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="golf-heading">
          <h2 id="golf-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Living in Rhodes Ranch: golf &amp; the club
          </h2>
          <p className="mt-4 leading-relaxed">
            Rhodes Ranch is built around the 18-hole{" "}
            <a
              href="https://rhodesranchgolf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch Golf Club
            </a>{" "}
            course—about 162 acres—designed by Ted Robinson Sr. The layout is known for a strong set
            of par threes Robinson spoke highly of, and at roughly 6,582 yards it balances challenge
            with playability for many skill levels. The club opened in 1997 and, over time, has
            become known for conditioning, water features, elevation changes, views, and rolling
            fairways. The property also includes Rhodes Ranch Grille, a restaurant and full bar—
            confirm menus, events, and membership with the club.
          </p>
        </section>

        <section aria-labelledby="rec-center-heading">
          <h2 id="rec-center-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Recreation center &amp; indoor amenities
          </h2>
          <p className="mt-4 leading-relaxed">
            Beyond golf, Rhodes Ranch offers a large recreation center—on the order of 35,000 square
            feet—with fitness and social spaces. Typical uses include:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
            <li>Weight and cardio training areas</li>
            <li>Aerobics room</li>
            <li>Sauna</li>
            <li>Pickleball, racquetball, and basketball courts</li>
            <li>Table tennis and billiards</li>
            <li>Craft and meeting rooms</li>
            <li>
              A main lobby with fireplace, piano, and seating—hours and access rules are set by the
              association or operator; confirm before you plan a visit
            </li>
          </ul>
        </section>

        <section aria-labelledby="outdoor-heading">
          <h2 id="outdoor-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Outdoor amenities &amp; nearby open space
          </h2>
          <p className="mt-4 leading-relaxed">
            Inside the gates, residents also use outdoor amenities such as basketball courts,
            playgrounds, tennis courts, and extensive walking and biking trails. The community
            includes an outdoor pool and water-park-style features for summer—think cabanas, lagoon
            pool, spas, lap pool, play elements, and slides (specifics and schedules change; verify
            with the association).
          </p>
          <p className="mt-4 leading-relaxed">
            For bigger outdoor days,{" "}
            <a
              href="https://www.nps.gov/redw"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Red Rock Canyon National Conservation Area
            </a>{" "}
            and{" "}
            <a
              href="https://www.blm.gov/sloan-canyon-nca"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Sloan Canyon National Conservation Area
            </a>{" "}
            are a short drive away for hiking and desert scenery.
          </p>
        </section>

        <section aria-labelledby="lifestyle-heading">
          <h2 id="lifestyle-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Resort-style living &amp; city access
          </h2>
          <p className="mt-4 leading-relaxed">
            Many families choose Rhodes Ranch for a resort-style feel—golf, recreation, and
            trails—while staying outside the densest parts of the urban core. When you want more
            retail and dining,{" "}
            <strong className="font-semibold text-stone-800">Downtown Summerlin</strong> is roughly
            15 minutes north, with large shopping and dining clusters including Tivoli Village,
            Canyon Pointe, and Boca Park (we are not affiliated with these centers—hours and tenants
            change). The Las Vegas Strip and major entertainment venues remain a straightforward
            drive from the front gate.
          </p>
        </section>

        <section aria-labelledby="market-heading">
          <h2 id="market-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Homes, pricing &amp; HOA context
          </h2>
          <p className="mt-4 leading-relaxed">
            Inventory in Rhodes Ranch spans attached products through large single-family homes;
            values differ by neighborhood, condition, lot size, and timing. Older homes on larger lots
            often trade at a premium to smaller-lot product, but there is no substitute for current
            comps.{" "}
            <Link
              href="/search"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Browse active home listings
            </Link>{" "}
            for today&apos;s asking prices, or ask {siteContact.agentName} or{" "}
            {siteContact.secondaryContactName} for a curated list.
          </p>
          <p className="mt-4 leading-relaxed">
            HOA assessments vary by section and change over time. For current fees, budgets, and
            what they cover, review association documents during diligence—your agent can help you
            request the right materials.
          </p>
        </section>

        <section
          aria-labelledby="cta-heading"
          className="rounded-2xl border border-stone-200/90 bg-gradient-to-br from-emerald-50/50 to-stone-50/40 shadow-[0_8px_30px_rgb(0_0_0_/0.05)] ring-1 ring-stone-900/5 p-6 sm:p-8"
        >
          <h2 id="cta-heading" className="font-display text-xl font-semibold text-emerald-950">
            Want to go deeper?
          </h2>
          <p className="mt-3 leading-relaxed">
            For a no-obligation conversation about buying or selling in Rhodes Ranch, call{" "}
            <a
              href={siteContact.phoneTelHref}
              className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
            >
              {siteContact.phoneDisplay}
            </a>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
            >
              message {siteContact.agentName} or {siteContact.secondaryContactName}
            </Link>
            . New to the area? Start with our{" "}
            <Link
              href="/buyers"
              className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
            >
              home buyer guide
            </Link>
            .
          </p>
        </section>
      </div>

      <section className="mt-14 space-y-6">
        <h2 className="font-display text-2xl font-semibold text-emerald-950">
          Recreation &amp; landmarks (editorial)
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-stone-600">
          Quick links to official or authoritative sites—same list as our short &ldquo;nearby&rdquo;
          reference. Not sponsored.
        </p>
        <ul className="space-y-6">
          {highlights.map((item) => (
            <li
              key={item.name}
              className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0_/0.04)] ring-1 ring-stone-900/5"
            >
              <h3 className="text-xl font-medium text-stone-900">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-900 underline-offset-2 hover:underline"
                >
                  {item.name}
                </a>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-dashed border-emerald-900/30 bg-emerald-50/40 p-6">
        <h2 className="font-display text-xl font-semibold text-emerald-950">Work with a local REALTOR®</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          Return to the{" "}
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
