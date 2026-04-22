"use client";

import dynamic from "next/dynamic";

/**
 * Maps directions UI loads the Google Maps JS API client-side only.
 * `next/dynamic` with `ssr: false` must live in a Client Component (Next 16 + Turbopack).
 */
export const DirectionsToOfficeDynamic = dynamic(
  () =>
    import("@/components/directions/DirectionsToOffice").then((m) => ({
      default: m.DirectionsToOffice,
    })),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-stone-500" role="status">
        Loading directions…
      </p>
    ),
  },
);
