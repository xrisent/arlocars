import type { ParsedCarCreate, ParsedCarUpdate } from "@/features/car/model/interfaces";
import { HttpError } from "@/shared/lib/http";
import { bool, int, num, str } from "@/shared/lib/parser";

export function parseCarCreateForm(form: FormData): ParsedCarCreate {
  const price = num(form.get("price"));
  const oldPrice = int(form.get("oldPrice"));
  const mileage = int(form.get("mileage"));
  const year = int(form.get("year"));
  const color = str(form.get("color"))?.trim();
  const description = str(form.get("description"))?.trim();
  const categoryId = int(form.get("categoryId"));
  const mainRaw = form.get("mainPhoto");
  const name = str(form.get("name"));
  const mainPhoto = mainRaw instanceof File && mainRaw.size > 0 ? mainRaw : null;

  if (
    price == null ||
    year == null ||
    !color ||
    !description ||
    categoryId == null ||
    !mainPhoto ||
    !name
  ) {
    throw new HttpError(
      400,
      "Missing required fields: price, year, color, description, categoryId, mainPhoto (file), name",
    );
  }

  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);

  return {
    name,
    price,
    ...(oldPrice != null ? { oldPrice } : {}),
    ...(mileage != null ? { mileage } : {}),
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
  const oldPrice = int(form.get("oldPrice"));
  const mileage = int(form.get("mileage"));
  const year = int(form.get("year"));
  const colorRaw = str(form.get("color"));
  const descRaw = str(form.get("description"));
  const categoryId = int(form.get("categoryId"));
  const mainRaw = form.get("mainPhoto");
  const name = str(form.get("name"));
  const mainPhoto = mainRaw instanceof File && mainRaw.size > 0 ? mainRaw : undefined;

  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const replacePhotos = bool(form.get("replacePhotos"));

  return {
    ...(price != null ? { price } : {}),
    ...(form.has("oldPrice") ? { oldPrice: oldPrice ?? null } : {}),
    ...(form.has("mileage") ? { mileage: mileage ?? null } : {}),
    ...(year != null ? { year } : {}),
    ...(colorRaw !== undefined ? { color: colorRaw.trim() } : {}),
    ...(descRaw !== undefined ? { description: descRaw.trim() } : {}),
    ...(categoryId != null ? { categoryId } : {}),
    ...(mainPhoto != null ? { mainPhoto } : {}),
    ...(name !== undefined ? { name } : {}),
    photos,
    replacePhotos,
  };
}
