import { RealScoutOfficeListings } from "@/components/realscout/RealScoutOfficeListings";
import { cn } from "@/lib/utils";

/**
 * MLS office listings strip (RealScout). Use on marketing routes; load script once in root layout only.
 */
export function RealScoutLeadSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "border-t border-emerald-900/15 bg-gradient-to-b from-emerald-50/80 to-white py-10 sm:py-12",
        className,
      )}
      aria-labelledby="office-listings-lead-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="office-listings-lead-heading"
          className="text-xl font-semibold tracking-tight text-emerald-950 sm:text-2xl"
        >
          Featured office listings
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Active MLS inventory from our office search—filter by price and property type, then call for
          a private tour or a Rhodes Ranch–focused short list.
        </p>
        <div className="mt-6 rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm sm:p-6">
          <RealScoutOfficeListings className="min-h-[480px]" />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-600">
          Listing data is provided through RealScout; availability, price, and status change daily.
          MLS rules require brokerage attribution on listing detail pages—confirm with your REALTOR®.
        </p>
      </div>
    </section>
  );
}
