import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">404</p>
      <h1 className="mt-2 text-2xl font-bold text-emerald-950">Page not found</h1>
      <p className="mt-3 text-sm text-slate-700">
        The page you requested is not available. Start from the home page or contact Dr. Jan Duffy.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-emerald-900/30 px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
