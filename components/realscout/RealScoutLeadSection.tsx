import {
  RealScoutOfficeListings,
  type RealScoutMountStrategy,
} from "@/components/realscout/RealScoutOfficeListings";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type RealScoutLeadSectionProps = {
  className?: string;
  /** Route-specific intro (SEO): replaces default listing blurb when set. */
  listingIntro?: string;
  /** Visible H2 (default: Featured office listings). */
  heading?: string;
  /** `openHouses` uses NEXT_PUBLIC_REALSCOUT_OPEN_HOUSE_LISTING_STATUS on the widget. */
  variant?: "listings" | "openHouses";
  /** Optional id for the section heading (a11y). */
  headingId?: string;
  /**
   * When to mount the listing grid (default `idle` for LCP; `openHouses` defaults to `immediate`).
   * Use `immediate` on `/search` and similar primary-content routes.
   */
  listingMountStrategy?: RealScoutMountStrategy;
};

/**
 * Office listings strip (broker search widget). Use on marketing routes; script loads once from the client loader.
 */
export function RealScoutLeadSection({
  className,
  listingIntro,
  heading = "Featured office listings",
  variant = "listings",
  headingId = "office-listings-lead-heading",
  listingMountStrategy,
}: RealScoutLeadSectionProps) {
  const intro =
    listingIntro ??
    "Active homes for sale from our office search—filter by price and property type, then call for a private tour or a Rhodes Ranch–focused short list.";

  const listingStatusOverride =
    variant === "openHouses" ? publicEnv.realScoutOpenHouseListingStatus : undefined;

  const mountStrategy =
    listingMountStrategy ?? (variant === "openHouses" ? "immediate" : "idle");

  return (
    <section
      className={cn(
        "border-t border-stone-200/80 bg-gradient-to-b from-emerald-50/50 via-stone-50/30 to-white py-10 sm:py-12",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id={headingId}
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
        >
          {heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">{intro}</p>
        <div className="mt-6 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-6">
          <RealScoutOfficeListings
            className="min-h-[480px]"
            listingStatusOverride={listingStatusOverride}
            omitPropertyTypes={variant === "openHouses"}
            mountStrategy={mountStrategy}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone-600">
          Listing data comes from participating brokers; availability, price, and status change daily.
          Broker listing rules require attribution on listing detail pages—confirm with your REALTOR®.
        </p>
      </div>
    </section>
  );
}
