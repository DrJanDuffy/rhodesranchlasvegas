/**
 * Single-flight loader for RealScout UMD web components (client-only).
 * One script tag; waits until <realscout-office-listings> is defined.
 */
export const REALSCOUT_WIDGET_SCRIPT_SRC =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

let loadPromise: Promise<void> | null = null;

export function ensureRealScoutReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.customElements.get("realscout-office-listings")) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${REALSCOUT_WIDGET_SCRIPT_SRC}"]`,
    );

    if (!script) {
      script = document.createElement("script");
      script.src = REALSCOUT_WIDGET_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script!.onload = () => resolve();
        script!.onerror = () => reject(new Error("RealScout script failed to load"));
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
  })().catch((e) => {
    loadPromise = null;
    throw e;
  });

  return loadPromise;
}
