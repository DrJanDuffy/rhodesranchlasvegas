export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-busy="true" aria-live="polite">
      <div className="h-8 w-48 animate-pulse rounded bg-emerald-900/10" />
      <div className="mt-6 h-4 max-w-xl animate-pulse rounded bg-emerald-900/10" />
      <div className="mt-3 h-4 max-w-lg animate-pulse rounded bg-emerald-900/10" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="h-40 animate-pulse rounded-2xl bg-emerald-900/10" />
        <div className="h-40 animate-pulse rounded-2xl bg-emerald-900/10" />
      </div>
    </div>
  );
}
