"use client";

import { useEffect } from "react";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { publicEnv } from "@/lib/env";

let badgeInitPromise: Promise<void> | null = null;

/** Floating Calendly badge — mount once in root layout. */
export function CalendlyBadge() {
  useEffect(() => {
    let cancelled = false;

    function scheduleInit() {
      if (badgeInitPromise || cancelled) return;

      badgeInitPromise = (async () => {
        await ensureCalendlyReady();
        if (!window.Calendly || cancelled) return;
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
    }

    if (typeof globalThis.requestIdleCallback === "function") {
      const id = globalThis.requestIdleCallback(() => scheduleInit(), {
        timeout: 4000,
      });
      return () => {
        cancelled = true;
        globalThis.cancelIdleCallback(id);
      };
    }

    const t = globalThis.setTimeout(scheduleInit, 2800);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  return null;
}
