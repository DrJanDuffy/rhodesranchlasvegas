"use server";

export type ContactFormState = {
  ok: boolean;
  error?: string;
};

function isNonEmpty(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  if (!isNonEmpty(name) || !isNonEmpty(email) || !isNonEmpty(message)) {
    return { ok: false, error: "Please complete name, email, and message." };
  }

  const emailStr = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Wire to email/CRM in production (e.g. Resend, FUB webhook). Intentionally no PII logging.
  void phone;

  return { ok: true };
}
