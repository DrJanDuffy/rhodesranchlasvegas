"use client";

import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";
import { ensureRealScoutReady } from "@/lib/realscout-load";

/**
 * Office listings custom element (broker IDX search). Loads UMD once via ensureRealScoutReady(),
 * then mounts with createElement (reliable with React). Default minimal mode avoids extra
 * type/status filters; list price min/max still scope results to a purchase-oriented band.
 */
export function RealScoutOfficeListings({
  className,
}: {
  className?: string;
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

        if (realScoutWidgetMode === "full") {
          widget.setAttribute("listing-status", realScoutListingStatus);
          widget.setAttribute("property-types", realScoutPropertyTypes);
        } else {
          widget.setAttribute("listings-per-page", realScoutListingsPerPage);
        }
        // Purchase-focused range (buyer/seller persona); applied in minimal and full modes.
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
  }, []);

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
