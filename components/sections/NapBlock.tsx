import { siteContact } from "@/lib/site-contact";

export function NapBlock() {
  return (
    <section
      aria-labelledby="nap-heading"
      className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5"
    >
      <h2 id="nap-heading" className="font-display text-xl font-semibold text-emerald-950">
        Office and contact
      </h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-medium text-stone-800">Name</dt>
          <dd>
            {siteContact.businessName} — {siteContact.legalBrokerage}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Address</dt>
          <dd>
            {siteContact.address.streetAddress}, {siteContact.address.addressLocality},{" "}
            {siteContact.address.addressRegion} {siteContact.address.postalCode}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Phone</dt>
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
          <dt className="font-medium text-stone-800">Text (SMS)</dt>
          <dd>
            <a
              className="font-semibold text-emerald-900 hover:underline"
              href={siteContact.phoneSmsHref}
            >
              Text {siteContact.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Hours</dt>
          <dd>{siteContact.hoursSummaryLine}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Service area</dt>
          <dd>{siteContact.serviceAreaDescription}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Email</dt>
          <dd className="space-y-1">
            <a className="text-emerald-900 hover:underline" href={`mailto:${siteContact.email}`}>
              {siteContact.email}
            </a>
            <span className="block text-stone-600">
              {siteContact.agentName} — {siteContact.agentTitle}
            </span>
            <a
              className="block text-emerald-900 hover:underline"
              href={`mailto:${siteContact.secondaryEmail}`}
            >
              {siteContact.secondaryEmail}
            </a>
            <span className="text-stone-600">
              {siteContact.secondaryContactName} — {siteContact.secondaryContactTitle}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">License</dt>
          <dd>{siteContact.license}</dd>
        </div>
      </dl>
    </section>
  );
}
