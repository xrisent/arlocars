import type { CategoryDto } from "@/entities/category";
import type { CarFiltersState } from "@/features/car-filters/model/types";
import { formatPrice } from "@/shared/lib/format";

export function buildCarsCanonicalPath(filters: CarFiltersState): string {
  const searchParams = new URLSearchParams();

  filters.categoryIds.forEach((id) => searchParams.append("categories", String(id)));
  filters.colors.forEach((color) => searchParams.append("colors", color));
  if (filters.priceMin != null) searchParams.set("price_min", String(filters.priceMin));
  if (filters.priceMax != null) searchParams.set("price_max", String(filters.priceMax));
  if (filters.yearMin != null) searchParams.set("year_min", String(filters.yearMin));
  if (filters.yearMax != null) searchParams.set("year_max", String(filters.yearMax));
  if (filters.q) searchParams.set("q", filters.q);

  searchParams.sort();
  const query = searchParams.toString();

  return query ? `/cars?${query}` : "/cars";
}

interface CarsSeoContent {
  title: string;
  description: string;
}

function buildYearPhrase(filters: CarFiltersState): string | null {
  const { yearMin, yearMax } = filters;
  if (yearMin != null && yearMax != null && yearMin === yearMax) return `${yearMin} model year`;
  if (yearMin != null && yearMax != null) return `${yearMin}-${yearMax}`;
  if (yearMin != null) return `${yearMin} or newer`;
  if (yearMax != null) return `up to ${yearMax}`;
  return null;
}

function buildPricePhrase(filters: CarFiltersState): string | null {
  const { priceMin, priceMax } = filters;
  if (priceMin != null && priceMax != null) {
    return `from ${formatPrice(priceMin)} to ${formatPrice(priceMax)}`;
  }
  if (priceMin != null) return `from ${formatPrice(priceMin)}`;
  if (priceMax != null) return `up to ${formatPrice(priceMax)}`;
  return null;
}

export function buildCarsSeoContent(
  filters: CarFiltersState,
  category: CategoryDto | null,
): CarsSeoContent {
  const subjectParts = [category?.name, filters.q ? `"${filters.q}"` : null].filter(
    (part): part is string => Boolean(part),
  );

  const detailParts = [buildPricePhrase(filters), buildYearPhrase(filters), filters.colors.join("/") || null].filter(
    (part): part is string => Boolean(part),
  );

  const isFiltered = subjectParts.length > 0 || detailParts.length > 0;

  if (!isFiltered) {
    return {
      title: "Cars For Sale",
      description:
        "Browse verified used cars for sale in Dubai. Filter by price, year and category at Arlo Cars.",
    };
  }

  const subject = subjectParts.length > 0 ? subjectParts.join(" ") : "Used Cars";
  const title = [subject, ...detailParts].join(" ") + " — Cars For Sale";
  const description = `Browse ${subject.toLowerCase()}${
    detailParts.length > 0 ? ` ${detailParts.join(", ")}` : ""
  } at Arlo Cars, Dubai. Verified listings, transparent pricing.`;

  return { title, description };
}
