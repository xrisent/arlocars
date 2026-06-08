import { HttpError } from "./http";

export function num(raw: FormDataEntryValue | null): number | undefined {
  if (raw == null || raw === "") return undefined;
  const s = typeof raw === "string" ? raw : "";
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : undefined;
}

export function int(raw: FormDataEntryValue | null): number | undefined {
  if (raw == null || raw === "") return undefined;
  const s = typeof raw === "string" ? raw : "";
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function str(raw: FormDataEntryValue | null): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === "string") return raw;
  return undefined;
}

export function bool(raw: FormDataEntryValue | null): boolean {
  if (raw == null) return false;
  const s = typeof raw === "string" ? raw.toLowerCase() : "";
  return s === "1" || s === "true" || s === "yes";
}

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export function parseImages(form: FormData): File[] {
  const files = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      throw new HttpError(400, "Images must be PNG or JPG");
    }
    if (file.size > MAX_IMAGE_SIZE) {
      throw new HttpError(400, "Each image must be no larger than 10 MB");
    }
  }

  return files;
}
