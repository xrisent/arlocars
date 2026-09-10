import type { CarFiltersState } from "@/features/car-filters/model/types";
import {
  parseFloatParam,
  parseIntIdList,
  parseIntParam,
  parseStringList,
} from "@/shared/lib/list-query";

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export function toURLSearchParams(record: SearchParamsRecord): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(record)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      value.forEach((entry) => searchParams.append(key, entry));
    } else {
      searchParams.set(key, value);
    }
  }

  return searchParams;
}

export function parseCarFilters(searchParams: URLSearchParams): CarFiltersState {
  return {
    q: searchParams.get("q")?.trim() ?? "",
    priceMin: parseFloatParam(searchParams.get("price_min")) ?? null,
    priceMax: parseFloatParam(searchParams.get("price_max")) ?? null,
    yearMin: parseIntParam(searchParams.get("year_min")) ?? null,
    yearMax: parseIntParam(searchParams.get("year_max")) ?? null,
    colors: parseStringList(searchParams, "colors"),
    categoryIds: parseIntIdList(searchParams, "categories"),
  };
}

export function isCarFiltersEmpty(filters: CarFiltersState): boolean {
  return (
    !filters.q &&
    filters.priceMin == null &&
    filters.priceMax == null &&
    filters.yearMin == null &&
    filters.yearMax == null &&
    filters.colors.length === 0 &&
    filters.categoryIds.length === 0
  );
}
