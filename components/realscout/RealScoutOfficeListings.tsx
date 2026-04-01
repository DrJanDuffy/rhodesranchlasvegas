"use client";

import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";
import { ensureRealScoutReady } from "@/lib/realscout-load";

/**
 * Office listings custom element (broker IDX search). Loads UMD once via ensureRealScoutReady(),
 * then mounts with createElement (reliable with React). Default minimal mode avoids extra
 * type/status filters; list price min/max still scope results to a purchase-oriented band.
 *
 * When `listingStatusOverride` is set (e.g. open house pages), listing-status + property filters apply.
 */
export function RealScoutOfficeListings({
  className,
  listingStatusOverride,
}: {
  className?: string;
  /** e.g. "Open House" — must match RealScout/MLS; when set, listing-status + property-types are applied. */
  listingStatusOverride?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    async function run() {
      setError(null);
      try {
        await ensureRealScoutReady();
        if (cancelled || !el) return;

        const {
          realScoutAgentId,
          realScoutSortOrder,
          realScoutListingsPerPage,
          realScoutWidgetMode,
          realScoutListingStatus,
          realScoutPropertyTypes,
          realScoutPriceMin,
          realScoutPriceMax,
        } = publicEnv;

        const widget = document.createElement("realscout-office-listings");
        widget.setAttribute("agent-encoded-id", realScoutAgentId);
        widget.setAttribute("sort-order", realScoutSortOrder);

        if (listingStatusOverride) {
          widget.setAttribute("listing-status", listingStatusOverride);
          widget.setAttribute("property-types", realScoutPropertyTypes);
          widget.setAttribute("listings-per-page", realScoutListingsPerPage);
        } else if (realScoutWidgetMode === "full") {
          widget.setAttribute("listing-status", realScoutListingStatus);
          widget.setAttribute("property-types", realScoutPropertyTypes);
        } else {
          widget.setAttribute("listings-per-page", realScoutListingsPerPage);
        }
        widget.setAttribute("price-min", realScoutPriceMin);
        widget.setAttribute("price-max", realScoutPriceMax);

        el.replaceChildren(widget);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Office listings failed to load.",
          );
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
      el.replaceChildren();
    };
  }, [listingStatusOverride]);

  return (
    <>
      {error ? (
        <p className="mb-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <div ref={containerRef} className={className} suppressHydrationWarning />
    </>
  );
}
