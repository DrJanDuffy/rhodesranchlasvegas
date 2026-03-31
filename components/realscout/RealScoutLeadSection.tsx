import { RealScoutOfficeListings } from "@/components/realscout/RealScoutOfficeListings";
import { cn } from "@/lib/utils";

type RealScoutLeadSectionProps = {
  className?: string;
  /** Route-specific intro (SEO): replaces default listing blurb when set. */
  listingIntro?: string;
};

/**
 * Office listings strip (broker search widget). Use on marketing routes; script loads once from the client loader.
 */
export function RealScoutLeadSection({ className, listingIntro }: RealScoutLeadSectionProps) {
  const intro =
    listingIntro ??
    "Active homes for sale from our office search—filter by price and property type, then call for a private tour or a Rhodes Ranch–focused short list.";

  return (
    <section
      className={cn(
        "border-t border-stone-200/80 bg-gradient-to-b from-emerald-50/50 via-stone-50/30 to-white py-10 sm:py-12",
        className,
      )}
      aria-labelledby="office-listings-lead-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="office-listings-lead-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
        >
          Featured office listings
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">{intro}</p>
        <div className="mt-6 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-6">
          <RealScoutOfficeListings className="min-h-[480px]" />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone-600">
          Listing data comes from participating brokers; availability, price, and status change daily.
          Broker listing rules require attribution on listing detail pages—confirm with your REALTOR®.
        </p>
      </div>
    </section>
  );
}
