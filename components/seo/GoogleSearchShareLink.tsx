import { googleSearchShareHref } from "@/lib/site-contact";

type GoogleSearchShareLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Opens the configured Google Search share view (e.g. “Rhodes Ranch Las Vegas” SERP).
 * URL from `NEXT_PUBLIC_GOOGLE_SEARCH_SHARE_URL` (default: share link in env).
 */
export function GoogleSearchShareLink({
  className = "font-medium text-emerald-900 underline-offset-2 hover:underline",
  children,
}: GoogleSearchShareLinkProps) {
  return (
    <a
      href={googleSearchShareHref()}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children ?? "Rhodes Ranch Las Vegas on Google Search"}
    </a>
  );
}
