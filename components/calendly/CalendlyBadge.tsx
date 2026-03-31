"use client";

import { useEffect } from "react";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { publicEnv } from "@/lib/env";

let badgeInitPromise: Promise<void> | null = null;

/** Floating Calendly badge — mount once in root layout. */
export function CalendlyBadge() {
  useEffect(() => {
    if (badgeInitPromise) return;

    badgeInitPromise = (async () => {
      await ensureCalendlyReady();
      if (!window.Calendly) return;
      window.Calendly.initBadgeWidget({
        url: publicEnv.calendlyEventUrl,
        text: publicEnv.calendlyBadgeLabel,
        color: publicEnv.calendlyBadgeColor,
        textColor: publicEnv.calendlyBadgeTextColor,
        branding: false,
      });
    })().catch(() => {
      badgeInitPromise = null;
    });
  }, []);

  return null;
}
