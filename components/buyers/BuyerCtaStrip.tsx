import Link from "next/link";
import { siteContact } from "@/lib/site-contact";

/** Repeated buyer CTAs to increase engagement (search, call, email buyer specialist). */
export function BuyerCtaStrip({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-900/15 bg-emerald-50/80 px-4 py-4 sm:px-6 ${className ?? ""}`}
    >
      <Link
        href="/search"
        className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-900"
      >
        Search MLS listings
      </Link>
      <a
        href={siteContact.phoneTelHref}
        className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-white"
      >
        Call {siteContact.phoneDisplay}
      </a>
      <a
        href={`mailto:${siteContact.secondaryEmail}?subject=Rhodes%20Ranch%20buyer%20consult`}
        className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-white"
      >
        Email {siteContact.secondaryContactName} (buyers)
      </a>
      <Link
        href="/contact"
        className="text-sm font-medium text-emerald-900 underline-offset-2 hover:underline"
      >
        Full contact form
      </Link>
    </div>
  );
}
