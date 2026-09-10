import type { ICarRequest } from "@/entities/car";
import type { CarFiltersState } from "@/features/car-filters/model/types";

export function carFiltersToRequest(
  filters: CarFiltersState,
  pagination: { page?: number; page_size?: number } = {},
): ICarRequest {
  return {
    priceMin: filters.priceMin ?? undefined,
    priceMax: filters.priceMax ?? undefined,
    yearMin: filters.yearMin ?? undefined,
    yearMax: filters.yearMax ?? undefined,
    colors: filters.colors.length > 0 ? filters.colors : undefined,
    categoryIds: filters.categoryIds.length > 0 ? filters.categoryIds : undefined,
    q: filters.q || undefined,
    page: pagination.page,
    page_size: pagination.page_size,
  };
}
