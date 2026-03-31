<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## RealScout vs IDX (this repo)

- **`components/idx/**`** — MLS/IDX compliance and vendor integration. **Do not modify** unless the user explicitly approves (see global Cursor rules).
- **`components/realscout/**`** — RealScout web components and lead strips. Safe to extend; not the same as IDX.

## RealScout script vs widget placement

Follow this to avoid regressions (broken UMD load, duplicate scripts, or unwanted global MLS weight):

1. **Script (once)** — Load the RealScout UMD **only** via [`lib/realscout-load.ts`](lib/realscout-load.ts) (`ensureRealScoutReady()`), invoked from `RealScoutOfficeListings`. **Do not** add `<Script>` in `app/layout.tsx` for RealScout (avoids duplicate tags and `customElements.define` races). **Never** use `type="module"` on the UMD file.
2. **Widget mount** — `RealScoutOfficeListings` is a client component: it waits for the custom element to be defined, then uses `document.createElement("realscout-office-listings")` and `setAttribute`. Default **`NEXT_PUBLIC_REALSCOUT_WIDGET_MODE=minimal`** (agent + sort + listings-per-page); use **`full`** for price/type/status filters.
3. **Where to render the office-listings strip** — **Default:** import `RealScoutLeadSection` on **marketing routes** (`app/**/page.tsx`), typically **below each page’s hero**, **not** in root layout unless the user asks for a site-wide strip.

## CSP

Keep `em.realscout.com` and `www.realscout.com` aligned in `next.config.ts` with any RealScout or widget changes.
