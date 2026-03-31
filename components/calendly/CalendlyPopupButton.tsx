"use client";

import type { ComponentProps } from "react";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type CalendlyPopupButtonProps = ComponentProps<"button">;

/** Opens Calendly popup overlay (same event URL as inline/badge). */
export function CalendlyPopupButton({
  className,
  children,
  type = "button",
  onClick,
  ...rest
}: CalendlyPopupButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn(className)}
      onClick={async (e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        try {
          await ensureCalendlyReady();
          window.Calendly?.initPopupWidget({ url: publicEnv.calendlyEventUrl });
        } catch {
          // Fallback: user can still use /contact or phone.
        }
      }}
    >
      {children}
    </button>
  );
}
