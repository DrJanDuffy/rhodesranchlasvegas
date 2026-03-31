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
  agentTitle: env("NEXT_PUBLIC_AGENT_TITLE", "Listing Agent Specialist"),
  /** Primary inbox (Dr. Jan Duffy); align with GBP / site NAP. */
  email: env(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "DrDuffySells@RhodesRanchLasVegas.com",
  ),
  /** Team / secondary inbox (e.g. Chance). */
  secondaryContactEmail: env(
    "NEXT_PUBLIC_SECONDARY_CONTACT_EMAIL",
    "ChanceSells@RhodesRanchLasVegas.com",
  ),
  secondaryContactName: env(
    "NEXT_PUBLIC_SECONDARY_CONTACT_NAME",
    "Chance Fuller",
  ),
  secondaryContactTitle: env(
    "NEXT_PUBLIC_SECONDARY_CONTACT_TITLE",
    "Home Buyer Specialist",
  ),

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
   * Google My Maps embed for weekend open houses (Share → Embed a map).
   * Used on the homepage; update in Vercel when the map layer changes.
   */
  openHousesMapEmbedUrl: env(
    "NEXT_PUBLIC_OPEN_HOUSES_MAP_EMBED_URL",
    "https://www.google.com/maps/d/embed?mid=1fl048P0dAxnuNvwqHLrJU4i4zZmkwpE&ehbc=2E312F",
  ),

  /**
   * Query for maps.google.com embed when NEXT_PUBLIC_MAP_EMBED_URL is not set.
   * Defaults to office address line + city, state, zip.
   */
  mapQuery: envOptional("NEXT_PUBLIC_MAP_QUERY"),

  /**
   * Google Maps embed for the Rhodes Ranch / Spring Valley community area (dedicated /map page).
   */
  rhodesRanchAreaMapEmbedUrl: (() => {
    const raw = env(
      "NEXT_PUBLIC_RHODES_RANCH_AREA_MAP_EMBED_URL",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51599.877125736304!2d-115.29691299999999!3d36.0692914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8b8649f2725ab%3A0xa8bfb93b8b3b3a06!2sRhodes%20Ranch%2C%20Spring%20Valley%2C%20NV!5e0!3m2!1sen!2sus!4v1774989906439!5m2!1sen!2sus",
    );
    if (!raw.startsWith("https://www.google.com/maps/embed")) {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51599.877125736304!2d-115.29691299999999!3d36.0692914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8b8649f2725ab%3A0xa8bfb93b8b3b3a06!2sRhodes%20Ranch%2C%20Spring%20Valley%2C%20NV!5e0!3m2!1sen!2sus!4v1774989906439!5m2!1sen!2sus";
    }
    return raw;
  })(),

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

  /**
   * minimal = agent + sort + listings-per-page (most reliable; avoids empty grid from tight filters).
   * full = also listing-status, property-types, price-min, price-max.
   */
  realScoutWidgetMode: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_WIDGET_MODE", "minimal").toLowerCase();
    return raw === "full" ? "full" : "minimal";
  })(),

  /** Office listings filter: listing status (e.g. For Sale). */
  realScoutListingStatus: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_LISTING_STATUS", "For Sale");
    if (!/^[\w\s\-]{1,64}$/.test(raw)) return "For Sale";
    return raw;
  })(),

  /** Comma-led property type token for the widget (e.g. ,SFR for single-family). */
  realScoutPropertyTypes: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_PROPERTY_TYPES", ",SFR");
    if (!/^[,A-Za-z0-9_-]{1,32}$/.test(raw)) return ",SFR";
    return raw;
  })(),

  /**
   * List price floor (USD) for the office listings widget—targets buyers/sellers, not rentals.
   * ~$350k+ matches typical single-family purchase band in southwest Las Vegas / Rhodes Ranch area.
   */
  realScoutPriceMin: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_PRICE_MIN", "350000");
    if (!/^\d{1,12}$/.test(raw)) return "350000";
    return raw;
  })(),

  /** List price ceiling (USD); keeps luxury inventory while avoiding unusable outliers. */
  realScoutPriceMax: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_PRICE_MAX", "15000000");
    if (!/^\d{1,12}$/.test(raw)) return "15000000";
    return raw;
  })(),
  /** Default metadata / OG brand line */
  siteBrandShort: env("NEXT_PUBLIC_SITE_BRAND_SHORT", "Rhodes Ranch Homes"),
  /**
   * Optional homepage / default meta subline (Rhodes Ranch Las Vegas homes + E-E-A-T).
   * Override in Vercel without code changes.
   */
  seoSiteTagline: env(
    "NEXT_PUBLIC_SEO_SITE_TAGLINE",
    "Rhodes Ranch Las Vegas homes — local REALTOR® expertise in 89148.",
  ),

  /**
   * Calendly event URL (15-min consultation). Must be https://calendly.com/...
   * Post-deploy: Google Search Console → URL Inspection for /contact and /search; confirm no CSP blocks.
   */
  calendlyEventUrl: (() => {
    const fallback =
      "https://calendly.com/drjanduffy/dr-duffy-private-15-min-conversation";
    const raw = env("NEXT_PUBLIC_CALENDLY_EVENT_URL", fallback);
    try {
      const u = new URL(raw);
      if (u.protocol === "https:" && u.hostname === "calendly.com") {
        return u.toString().replace(/\/$/, "") || fallback;
      }
    } catch {
      /* fall through */
    }
    return fallback;
  })(),

  calendlyBadgeColor: (() => {
    const raw = env("NEXT_PUBLIC_CALENDLY_BADGE_COLOR", "#0069ff");
    return /^#[0-9A-Fa-f]{6}$/.test(raw) ? raw : "#0069ff";
  })(),

  calendlyBadgeTextColor: (() => {
    const raw = env("NEXT_PUBLIC_CALENDLY_BADGE_TEXT_COLOR", "#ffffff");
    return /^#[0-9A-Fa-f]{6}$/.test(raw) ? raw : "#ffffff";
  })(),

  calendlyBadgeLabel: env(
    "NEXT_PUBLIC_CALENDLY_BADGE_LABEL",
    "Schedule time with me",
  ),
} as const;
