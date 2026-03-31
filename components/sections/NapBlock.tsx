import { siteContact } from "@/lib/site-contact";

export function NapBlock() {
  return (
    <section
      aria-labelledby="nap-heading"
      className="rounded-2xl border border-emerald-900/15 bg-white p-6 shadow-sm"
    >
      <h2 id="nap-heading" className="text-lg font-semibold text-emerald-950">
        Office &amp; contact (NAP)
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Business name, address, and phone match our Google Business Profile.
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-medium text-slate-800">Name</dt>
          <dd>
            {siteContact.businessName} — {siteContact.legalBrokerage}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-800">Address</dt>
          <dd>
            {siteContact.address.streetAddress}, {siteContact.address.addressLocality},{" "}
            {siteContact.address.addressRegion} {siteContact.address.postalCode}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-800">Phone</dt>
          <dd>
            <a
              className="font-semibold text-emerald-900 hover:underline"
              href={siteContact.phoneTelHref}
            >
              {siteContact.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-800">Email</dt>
          <dd className="space-y-1">
            <a className="text-emerald-900 hover:underline" href={`mailto:${siteContact.email}`}>
              {siteContact.email}
            </a>
            <span className="block text-slate-600">
              {siteContact.agentName} — {siteContact.agentTitle}
            </span>
            <a
              className="block text-emerald-900 hover:underline"
              href={`mailto:${siteContact.secondaryEmail}`}
            >
              {siteContact.secondaryEmail}
            </a>
            <span className="text-slate-600">
              {siteContact.secondaryContactName} — {siteContact.secondaryContactTitle}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-800">License</dt>
          <dd>{siteContact.license}</dd>
        </div>
      </dl>
    </section>
  );
}
