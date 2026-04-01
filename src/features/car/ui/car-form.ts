import type { ParsedCarCreate, ParsedCarUpdate } from "@/features/car/model/interfaces";
import { HttpError } from "@/shared/lib/http";


function num(raw: FormDataEntryValue | null): number | undefined {
  if (raw == null || raw === "") return undefined;
  const s = typeof raw === "string" ? raw : "";
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : undefined;
}

function int(raw: FormDataEntryValue | null): number | undefined {
  if (raw == null || raw === "") return undefined;
  const s = typeof raw === "string" ? raw : "";
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

function str(raw: FormDataEntryValue | null): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === "string") return raw;
  return undefined;
}

function bool(raw: FormDataEntryValue | null): boolean {
  if (raw == null) return false;
  const s = typeof raw === "string" ? raw.toLowerCase() : "";
  return s === "1" || s === "true" || s === "yes";
}

export function parseCarCreateForm(form: FormData): ParsedCarCreate {
  const price = num(form.get("price"));
  const year = int(form.get("year"));
  const color = str(form.get("color"))?.trim();
  const description = str(form.get("description"))?.trim();
  const categoryId = int(form.get("categoryId"));
  const mainRaw = form.get("mainPhoto");
  const mainPhoto = mainRaw instanceof File && mainRaw.size > 0 ? mainRaw : null;

  if (price == null || year == null || !color || !description || categoryId == null || !mainPhoto) {
    throw new HttpError(
      400,
      "Missing required fields: price, year, color, description, categoryId, mainPhoto (file)",
    );
  }

  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);

  return {
    price,
    year,
    color,
    description,
    categoryId,
    mainPhoto,
    photos,
  };
}

export function parseCarUpdateForm(form: FormData): ParsedCarUpdate {
  const price = num(form.get("price"));
  const year = int(form.get("year"));
  const colorRaw = str(form.get("color"));
  const descRaw = str(form.get("description"));
  const categoryId = int(form.get("categoryId"));
  const mainRaw = form.get("mainPhoto");
  const mainPhoto =
    mainRaw instanceof File && mainRaw.size > 0 ? mainRaw : undefined;

  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const replacePhotos = bool(form.get("replacePhotos"));

  return {
    ...(price != null ? { price } : {}),
    ...(year != null ? { year } : {}),
    ...(colorRaw !== undefined ? { color: colorRaw.trim() } : {}),
    ...(descRaw !== undefined ? { description: descRaw.trim() } : {}),
    ...(categoryId != null ? { categoryId } : {}),
    ...(mainPhoto != null ? { mainPhoto } : {}),
    photos,
    replacePhotos,
  };
}
