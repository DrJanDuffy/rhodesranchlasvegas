/**
 * Single-flight UMD load for the RealScout `realscout-office-listings` web component (client-only).
 * Injects the RealScout UMD from `publicEnv.realScoutWidgetScriptSrc` once, then waits for
 * `customElements.define` so `RealScoutOfficeListings` can mount the element.
 */

import { publicEnv } from "@/lib/env";

const SCRIPT_ID = "realscout-web-components-umd";

let loadPromise: Promise<void> | null = null;

function findScript(src: string): HTMLScriptElement | null {
  const byId = document.getElementById(SCRIPT_ID);
  if (byId instanceof HTMLScriptElement) return byId;
  for (const el of document.querySelectorAll<HTMLScriptElement>("script[src]")) {
    if (el.src === src) return el;
  }
  return null;
}

export function ensureRealScoutReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.customElements.get("realscout-office-listings")) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const src = publicEnv.realScoutWidgetScriptSrc;
    if (!findScript(src)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
      await new Promise<void>((resolve, reject) => {
        s.addEventListener("load", () => resolve(), { once: true });
        s.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "RealScout UMD failed to load (check CSP script-src for em.realscout.com).",
              ),
            ),
          { once: true },
        );
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
