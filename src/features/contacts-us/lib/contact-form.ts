import type { ContactQuotePayload } from "@/features/contacts-us/model/interfaces";
import { HttpError } from "@/shared/lib/http";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactQuoteBody(body: unknown): ContactQuotePayload {
  if (!body || typeof body !== "object") {
    throw new HttpError(400, "Invalid request body");
  }

  const { name, email, message } = body as Record<string, unknown>;
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    throw new HttpError(400, "name, email and message are required");
  }

  if (!EMAIL_RE.test(trimmedEmail)) {
    throw new HttpError(400, "Invalid email address");
  }

  return {
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
  };
}
