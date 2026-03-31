"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-emerald-50 px-6 text-slate-900">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-emerald-950">Something went wrong</h1>
          <p className="mt-3 text-sm text-slate-700">{error.message}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
