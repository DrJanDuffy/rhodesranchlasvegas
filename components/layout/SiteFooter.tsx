import Link from "next/link";
import { siteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";

const gbpSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${siteContact.agentName} ${siteContact.legalBrokerage} ${siteContact.address.streetAddress} ${siteContact.address.addressLocality} ${siteContact.address.addressRegion}`,
  );

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-auto border-t border-emerald-900/10 bg-slate-50 text-slate-800",
        className,
      )}
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
            NAP (matches Google Business Profile)
          </p>
          <p className="mt-2 text-base font-medium">{siteContact.businessName}</p>
          <p className="text-sm text-slate-600">{siteContact.legalBrokerage}</p>
          <p className="mt-2 text-sm">
            Nevada License {siteContact.license}
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            {siteContact.address.streetAddress}
            <br />
            {siteContact.address.addressLocality}, {siteContact.address.addressRegion}{" "}
            {siteContact.address.postalCode}
          </p>
          <p className="mt-2">
            <a
              href={siteContact.phoneTelHref}
              className="font-semibold text-emerald-900 hover:underline"
            >
              {siteContact.phoneDisplay}
            </a>
          </p>
          <p className="mt-1">
            <a
              href={`mailto:${siteContact.email}`}
              className="text-sm text-emerald-900 hover:underline"
            >
              {siteContact.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-900">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/rhodes-ranch-lifestyle" className="hover:underline">
                Rhodes Ranch lifestyle &amp; amenities
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:underline">
                Search Rhodes Ranch area homes
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact &amp; directions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-900">Actions</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={siteContact.phoneTelHref}
              className="inline-flex w-fit rounded-md border border-emerald-800 px-3 py-2 font-medium text-emerald-900 hover:bg-white"
            >
              Call now
            </a>
            <a
              href={gbpSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-md border border-emerald-800 px-3 py-2 font-medium text-emerald-900 hover:bg-white"
            >
              View on Google Maps
            </a>
            <a
              href={gbpSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-md border border-emerald-800 px-3 py-2 font-medium text-emerald-900 hover:bg-white"
            >
              Google reviews
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-900/10 px-4 py-4 text-center text-xs text-slate-600 sm:px-6">
        <p>
          IDX listings provided by RealScout. MLS disclaimers apply where shown on listing
          tools.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {siteContact.agentName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
