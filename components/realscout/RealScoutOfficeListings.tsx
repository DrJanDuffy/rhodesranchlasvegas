import { publicEnv } from "@/lib/env";

/**
 * RealScout office listings via custom element (script loaded once in root layout).
 * Do not load the RealScout script in this file.
 */
export function RealScoutOfficeListings({
  className,
}: {
  className?: string;
}) {
  const agentId = publicEnv.realScoutAgentId;
  const sortOrder = publicEnv.realScoutSortOrder;
  const listingsPerPage = publicEnv.realScoutListingsPerPage;
  const markup = `<realscout-office-listings agent-encoded-id="${agentId}" sort-order="${sortOrder}" listings-per-page="${listingsPerPage}"></realscout-office-listings>`;

  return (
    <div
      className={className}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
