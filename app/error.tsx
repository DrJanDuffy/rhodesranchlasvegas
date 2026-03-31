"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold text-emerald-950">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm text-slate-700">
        Please try again. If the problem continues, call Dr. Jan Duffy using the phone number in the
        site header or footer.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Try again
      </button>
    </div>
  );
}
