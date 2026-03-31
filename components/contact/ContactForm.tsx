"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-900 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const initialState: ContactFormState = { ok: false };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.ok) {
    return (
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
        Thank you—your message was received. Dr. Jan Duffy or the team will follow up shortly.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-800">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-800">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
