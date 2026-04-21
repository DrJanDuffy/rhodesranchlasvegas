/**
 * Single-flight loader for the office listings UMD web component (client-only).
 * One script tag; waits until <realscout-office-listings> is defined.
 * Script URL defaults in {@link publicEnv.realScoutWidgetScriptSrc} (override with NEXT_PUBLIC_REALSCOUT_SCRIPT_URL).
 */
import { publicEnv } from "@/lib/env";

let loadPromise: Promise<void> | null = null;

function widgetScriptSrc(): string {
  return publicEnv.realScoutWidgetScriptSrc;
}

export function ensureRealScoutReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.customElements.get("realscout-office-listings")) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const src = widgetScriptSrc();
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script!.onload = () => resolve();
        script!.onerror = () => reject(new Error("Office listings script failed to load"));
      });
    } else {
      await new Promise<void>((resolve) => {
        if (window.customElements.get("realscout-office-listings")) {
          resolve();
          return;
        }
        script!.addEventListener("load", () => resolve(), { once: true });
        if (document.readyState === "complete") {
          setTimeout(resolve, 0);
        }
      });
    }

    const deadline = Date.now() + 25_000;
    while (
      !window.customElements.get("realscout-office-listings") &&
      Date.now() < deadline
    ) {
      await new Promise((r) => setTimeout(r, 32));
    }

    if (!window.customElements.get("realscout-office-listings")) {
      throw new Error(
        "Office listings widget did not register (check network, ad blockers, and CSP for em.realscout.com).",
      );
    }
  })().catch((e) => {
    loadPromise = null;
    throw e;
  });

  return loadPromise;
}
