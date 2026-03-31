import Link from "next/link";
import { siteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/buyers", label: "Buyers" },
  { href: "/rhodes-ranch-lifestyle", label: "Lifestyle" },
  { href: "/search", label: "Homes for Sale" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-b border-emerald-900/10 bg-white/90 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group">
          <span className="block text-sm font-semibold uppercase tracking-wide text-emerald-900">
            Rhodes Ranch Las Vegas
          </span>
          <span className="text-base font-medium text-slate-800 group-hover:text-emerald-800">
            {siteContact.agentName}
          </span>
          <span className="mt-0.5 block text-xs font-medium text-emerald-900/90">
            {siteContact.agentTitle}
          </span>
          <span className="mt-0.5 block text-xs text-slate-600">
            {siteContact.legalBrokerage}
          </span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-700 underline-offset-4 hover:text-emerald-800 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteContact.phoneTelHref}
          className="rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900"
        >
          Call {siteContact.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
