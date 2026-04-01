import { HttpError } from "@/shared/lib/http";

export function parseCategoryJsonName(body: unknown, field = "name"): string {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "Invalid JSON body");
  }
  const name = (body as Record<string, unknown>)[field];
  if (name == null || typeof name !== "string") {
    throw new HttpError(400, `${field} is required`);
  }
  const trimmed = name.trim();
  if (!trimmed) {
    throw new HttpError(400, "Name is required");
  }
  return trimmed;
}
