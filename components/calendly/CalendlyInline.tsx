"use client";

import { useEffect, useRef } from "react";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type CalendlyInlineProps = {
  className?: string;
};

/** Inline Calendly scheduler — requires client hydration. */
export function CalendlyInline({ className }: CalendlyInlineProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    let cancelled = false;
    void (async () => {
      try {
        await ensureCalendlyReady();
        if (cancelled || !window.Calendly || !parentRef.current) return;
        window.Calendly.initInlineWidget({
          url: publicEnv.calendlyEventUrl,
          parentElement: parentRef.current,
        });
      } catch {
        // Widget failed; page still has phone and email in the contact section.
      }
    })();

    return () => {
      cancelled = true;
      parent.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn("min-h-[700px] min-w-[320px] w-full", className)}
      aria-label="Schedule a private conversation"
    />
  );
}
