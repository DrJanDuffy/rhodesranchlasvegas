type LastUpdatedNoteProps = {
  /**
   * Human-readable month/year review marker (safe static text, no implied real-time guarantee).
   * Example: "April 2026".
   */
  reviewedMonthYear: string;
  className?: string;
};

/**
 * Compact trust signal for SEO/AEO pages:
 * - "Last reviewed" timestamp for editorial copy freshness
 * - Explicit cadence language for scheduled updates
 * - Separate listing-data caveat to avoid overstating update precision
 */
export function LastUpdatedNote({ reviewedMonthYear, className }: LastUpdatedNoteProps) {
  const baseClass =
    "rounded-xl border border-stone-200/80 bg-stone-50/70 px-4 py-3 text-xs leading-relaxed text-stone-600";
  return (
    <p className={className ? `${baseClass} ${className}` : baseClass}>
      Last reviewed: <strong>{reviewedMonthYear}</strong>. Editorial copy is reviewed monthly. Listing
      availability, pricing, and status can change daily and should be confirmed before decisions.
    </p>
  );
}
