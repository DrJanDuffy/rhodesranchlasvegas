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

    const isMobile =
      typeof globalThis.matchMedia === "function" &&
      globalThis.matchMedia("(max-width: 768px)").matches;

    if (typeof globalThis.requestIdleCallback === "function") {
      const id = globalThis.requestIdleCallback(() => scheduleInit(), {
        timeout: isMobile ? 9000 : 4000,
      });
      return () => {
        cancelled = true;
        globalThis.cancelIdleCallback(id);
      };
    }

    const t = globalThis.setTimeout(scheduleInit, isMobile ? 6000 : 2800);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  return null;
}
