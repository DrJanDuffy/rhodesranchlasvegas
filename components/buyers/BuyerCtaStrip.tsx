import Link from "next/link";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { siteContact } from "@/lib/site-contact";

/** Repeated buyer CTAs to increase engagement (search, call, email buyer specialist). */
export function BuyerCtaStrip({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white to-emerald-50/35 px-4 py-4 shadow-[0_4px_24px_rgb(0_0_0_/0.05)] ring-1 ring-stone-900/5 sm:px-6 ${className ?? ""}`}
    >
      <Link
        href="/search"
        className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
      >
        Search homes for sale
      </Link>
      <a
        href={siteContact.phoneTelHref}
        className="rounded-full border border-stone-300/90 bg-white/95 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm hover:border-stone-400"
      >
        Call {siteContact.phoneDisplay}
      </a>
      <a
        href={`mailto:${siteContact.secondaryEmail}?subject=Rhodes%20Ranch%20buyer%20consult`}
        className="rounded-full border border-stone-300/90 bg-white/95 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm hover:border-stone-400"
      >
        Email {siteContact.secondaryContactName} (buyers)
      </a>
      <CalendlyPopupButton className="rounded-full border border-emerald-800/40 bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950">
        Schedule time with me
      </CalendlyPopupButton>
      <Link
        href="/contact#schedule"
        className="text-sm font-medium text-emerald-900 underline-offset-2 hover:underline"
      >
        Contact page
      </Link>
    </div>
  );
}
