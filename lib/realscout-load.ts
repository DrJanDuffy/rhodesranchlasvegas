/**
 * Single-flight readiness check for the office listings web component (client-only).
 * Script is loaded once globally in app/layout.tsx; this helper only waits for element registration.
 */

let loadPromise: Promise<void> | null = null;

export function ensureRealScoutReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.customElements.get("realscout-office-listings")) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    await new Promise<void>((resolve) => {
      if (window.customElements.get("realscout-office-listings")) {
        resolve();
        return;
      }
      // On client-side route transitions, the load event may already have fired.
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", () => resolve(), { once: true });
    });

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
