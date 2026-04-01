"use client";

import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";
import { waitForIdle, waitUntilVisible } from "@/lib/perf-scheduler";
import { ensureRealScoutReady } from "@/lib/realscout-load";
import { cn } from "@/lib/utils";

export type RealScoutMountStrategy = "immediate" | "idle" | "visible";

/**
 * Office listings custom element (broker IDX search). Loads UMD once via ensureRealScoutReady(),
 * then mounts with createElement (reliable with React). Default minimal mode avoids extra
 * type/status filters; list price min/max still scope results to a purchase-oriented band.
 *
 * `mountStrategy` defaults to `idle` to improve LCP on marketing pages (listing images are heavy).
 * Use `immediate` on search-focused routes where the grid is the primary content.
 */
export function RealScoutOfficeListings({
  className,
  listingStatusOverride,
  /** When true (open-house hub), omit property-types so MLS open houses are not over-filtered by ,SFR. */
  omitPropertyTypes = false,
  mountStrategy = "idle",
}: {
  className?: string;
  /** e.g. "Open House" — must match RealScout/MLS; when set, listing-status + property filters apply. */
  listingStatusOverride?: string;
  omitPropertyTypes?: boolean;
  mountStrategy?: RealScoutMountStrategy;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasWidget, setHasWidget] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    async function run() {
      setError(null);
      setHasWidget(false);
      try {
        if (mountStrategy === "idle") {
          await waitForIdle(2000);
        } else if (mountStrategy === "visible") {
          if (!el) return;
          await waitUntilVisible(el, { rootMargin: "320px 0px 240px 0px" });
        }
        if (cancelled || !el) return;

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
          if (!omitPropertyTypes) {
            widget.setAttribute("property-types", realScoutPropertyTypes);
          }
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
        if (!cancelled) setHasWidget(true);
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
      setHasWidget(false);
    };
  }, [listingStatusOverride, mountStrategy, omitPropertyTypes]);

  return (
    <>
      {error ? (
        <p className="mb-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <div className="relative">
        <div
          ref={containerRef}
          className={cn(className, !hasWidget && !error && "min-h-[480px]")}
          suppressHydrationWarning
        />
        {!hasWidget && !error ? (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-stone-50/90 ring-1 ring-stone-200/80"
            aria-busy="true"
            aria-live="polite"
          >
            <span className="text-sm font-medium text-stone-500">Loading listings…</span>
          </div>
        ) : null}
      </div>
    </>
  );
}
