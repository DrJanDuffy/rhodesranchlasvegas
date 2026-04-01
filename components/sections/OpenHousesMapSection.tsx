import Link from "next/link";
import { siteContact } from "@/lib/site-contact";

function viewerUrlFromEmbed(embedUrl: string): string {
  const m = embedUrl.match(/[?&]mid=([^&]+)/);
  return m
    ? `https://www.google.com/maps/d/viewer?mid=${encodeURIComponent(m[1])}&hl=en`
    : embedUrl;
}

/**
 * Weekend open houses map (Google My Maps) hosted by the buyer specialist.
 * Visible copy + iframe support SEO/AEO/GEO; map URL is env-driven for GSC-friendly updates without redeploy copy.
 */
export function OpenHousesMapSection() {
  const embedSrc = siteContact.openHousesMapEmbedUrl;
  const viewerHref = viewerUrlFromEmbed(embedSrc);
  const { secondaryContactName, secondaryContactTitle, phoneTelHref, phoneDisplay } =
    siteContact;

  return (
    <section
      className="mt-10 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
      aria-labelledby="open-houses-map-heading"
    >
      <h2
        id="open-houses-map-heading"
        className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
      >
        Where are this weekend&apos;s open houses in Rhodes Ranch and Las Vegas?
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-stone-700">
        <strong>{secondaryContactName}</strong>, {secondaryContactTitle}, hosts the current tour
        lineup on a live Google Map covering Rhodes Ranch, Spring Valley, and nearby Las Vegas
        neighborhoods. Use it to plan your route, then call{" "}
        <a href={phoneTelHref} className="font-medium text-emerald-900 underline-offset-2 hover:underline">
          {phoneDisplay}
        </a>{" "}
        or{" "}
        <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
          message the team
        </Link>{" "}
        for questions or a private showing.
      </p>
      <p className="mt-2 text-sm text-stone-600">
        Map updates when new open houses are added—bookmark this page and refresh before you head
        out.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 shadow-inner">
        <div className="relative aspect-4/3 w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
          <iframe
            title={`Open houses map — ${secondaryContactName}, ${secondaryContactTitle}`}
            src={embedSrc}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-600">
        <a
          href={viewerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
        >
          Open full map in Google Maps
        </a>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <Link href="/open-houses" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
          Open houses by day + MLS search
        </Link>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <Link href="/buyers" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
          Home buyer resources
        </Link>
      </p>
    </section>
  );
}
