"use client";

import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";
import { ensureRealScoutReady } from "@/lib/realscout-load";

/**
 * RealScout office listings custom element. Loads UMD once via ensureRealScoutReady(),
 * then mounts with createElement (reliable with React). Use minimal mode by default so
 * tight price/type filters cannot zero out the grid.
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
          widget.setAttribute("price-min", realScoutPriceMin);
          widget.setAttribute("price-max", realScoutPriceMax);
        } else {
          widget.setAttribute("listings-per-page", realScoutListingsPerPage);
        }

        el.replaceChildren(widget);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "RealScout office listings failed to load.",
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
