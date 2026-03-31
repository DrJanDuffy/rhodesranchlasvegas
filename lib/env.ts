/**
 * Public environment configuration (NEXT_PUBLIC_*).
 * Set values in `.env.local` (local) and Vercel Project Settings → Environment Variables (production).
 * Never commit secrets; use server-only env vars for API keys in route handlers / Server Actions.
 */

function env(name: string, fallback: string): string {
  const v = process.env[name];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : fallback;
}

function envOptional(name: string): string | undefined {
  const v = process.env[name];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
}

/** Normalize canonical site URL (no trailing slash) for metadataBase and JSON-LD. */
export function normalizeSiteUrl(raw: string): string {
  let u = raw.trim();
  if (!u.startsWith("http://") && !u.startsWith("https://")) {
    u = `https://${u}`;
  }
  return u.replace(/\/$/, "");
}

function envNumber(name: string, fallback: number): number {
  const v = envOptional(name);
  if (v === undefined) return fallback;
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

/** Tel: href from E.164 (e.g. +17025001942 → tel:+17025001942). */
export function telHrefFromE164(e164: string): string {
  const trimmed = e164.trim();
  if (trimmed.startsWith("tel:")) return trimmed;
  return `tel:${trimmed}`;
}

/**
 * All public site configuration used by NAP, metadata, maps, and widgets.
 * Defaults match production Rhodes Ranch / Dr. Jan Duffy branding; override per deploy.
 */
export const publicEnv = {
  siteUrl: normalizeSiteUrl(
    env("NEXT_PUBLIC_SITE_URL", "https://www.rhodesranchlasvegas.com"),
  ),

  agentName: env("NEXT_PUBLIC_AGENT_NAME", "Dr. Jan Duffy"),
  businessName: env("NEXT_PUBLIC_BUSINESS_NAME", "Dr. Jan Duffy"),
  legalBrokerage: env(
    "NEXT_PUBLIC_BROKERAGE_NAME",
    "Berkshire Hathaway HomeServices Nevada Properties",
  ),
  license: env("NEXT_PUBLIC_LICENSE_NUMBER", "S.0197614.LLC"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "drduffy@bhhsnv.com"),

  phoneE164: env("NEXT_PUBLIC_PHONE_E164", "+17025001942"),
  phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "(702) 500-1942"),

  addressStreet: env(
    "NEXT_PUBLIC_ADDRESS_STREET",
    "8850 W. Sunset Road, Suite 200",
  ),
  addressLocality: env("NEXT_PUBLIC_ADDRESS_CITY", "Las Vegas"),
  addressRegion: env("NEXT_PUBLIC_ADDRESS_STATE", "NV"),
  postalCode: env("NEXT_PUBLIC_ADDRESS_ZIP", "89148"),
  addressCountry: env("NEXT_PUBLIC_ADDRESS_COUNTRY", "US"),

  geoLatitude: envNumber("NEXT_PUBLIC_GEO_LATITUDE", 36.0639),
  geoLongitude: envNumber("NEXT_PUBLIC_GEO_LONGITUDE", -115.2982),

  serviceAreaDescription: env(
    "NEXT_PUBLIC_SERVICE_AREA",
    "Rhodes Ranch, Spring Valley, and southwest Las Vegas (89148)",
  ),
  hoursSummaryLine: env(
    "NEXT_PUBLIC_HOURS_SUMMARY",
    "Monday–Friday 9:00 a.m.–5:00 p.m. (weekend showings by appointment)",
  ),

  /** Weekday office hours for JSON-LD (24h HH:mm). */
  officeWeekdayOpens: env("NEXT_PUBLIC_OFFICE_WEEKDAY_OPENS", "09:00"),
  officeWeekdayCloses: env("NEXT_PUBLIC_OFFICE_WEEKDAY_CLOSES", "17:00"),

  /**
   * Full Google Maps embed URL (optional). If unset, built from NEXT_PUBLIC_MAP_QUERY or address fields.
   */
  mapEmbedUrl: envOptional("NEXT_PUBLIC_MAP_EMBED_URL"),

  /**
   * Query for maps.google.com embed when NEXT_PUBLIC_MAP_EMBED_URL is not set.
   * Defaults to office address line + city, state, zip.
   */
  mapQuery: envOptional("NEXT_PUBLIC_MAP_QUERY"),

  realScoutAgentId: (() => {
    const raw = env(
      "NEXT_PUBLIC_REALSCOUT_AGENT_ID",
      "QWdlbnQtMjI1MDUw",
    );
    // Typical RealScout encoded id is base64-like; reject quotes/angle brackets for attribute safety.
    if (!/^[A-Za-z0-9+/=_-]{4,128}$/.test(raw)) {
      return "QWdlbnQtMjI1MDUw";
    }
    return raw;
  })(),
  /** RealScout sort token; restricted to safe characters for use in widget HTML attributes. */
  realScoutSortOrder: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_SORT_ORDER", "NEWEST");
    if (!/^[A-Za-z0-9_-]{1,32}$/.test(raw)) return "NEWEST";
    return raw;
  })(),
  realScoutListingsPerPage: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_LISTINGS_PER_PAGE", "12");
    const n = Number.parseInt(raw, 10);
    if (!Number.isFinite(n) || n < 1 || n > 48) return "12";
    return String(n);
  })(),

  /** Default metadata / OG brand line */
  siteBrandShort: env("NEXT_PUBLIC_SITE_BRAND_SHORT", "Rhodes Ranch Homes"),
} as const;
