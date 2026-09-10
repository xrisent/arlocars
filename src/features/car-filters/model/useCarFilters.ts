"use client";

import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useCallback, useMemo } from "react";

import type { CarFiltersState } from "@/features/car-filters/model/types";

const carFiltersParsers = {
  q: parseAsString.withDefault(""),
  price_min: parseAsInteger,
  price_max: parseAsInteger,
  year_min: parseAsInteger,
  year_max: parseAsInteger,
  colors: parseAsArrayOf(parseAsString).withDefault([]),
  categories: parseAsArrayOf(parseAsInteger).withDefault([]),
  page: parseAsInteger,
};

export interface UseCarFiltersResult {
  filters: CarFiltersState;
  activeFilterCount: number;
  setFilters: (next: CarFiltersState | ((current: CarFiltersState) => CarFiltersState)) => void;
  resetFilters: () => void;
}

export function useCarFilters(): UseCarFiltersResult {
  const [state, setState] = useQueryStates(carFiltersParsers, {
    shallow: true,
    clearOnDefault: true,
  });

  const filters = useMemo<CarFiltersState>(
    () => ({
      q: state.q,
      priceMin: state.price_min,
      priceMax: state.price_max,
      yearMin: state.year_min,
      yearMax: state.year_max,
      colors: state.colors,
      categoryIds: state.categories,
    }),
    [state],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.q) count += 1;
    if (filters.priceMin != null || filters.priceMax != null) count += 1;
    if (filters.yearMin != null || filters.yearMax != null) count += 1;
    if (filters.colors.length > 0) count += 1;
    if (filters.categoryIds.length > 0) count += 1;
    return count;
  }, [filters]);

  const setFilters = useCallback(
    (next: CarFiltersState | ((current: CarFiltersState) => CarFiltersState)) => {
      const resolved = typeof next === "function" ? next(filters) : next;

      void setState({
        q: resolved.q || null,
        price_min: resolved.priceMin,
        price_max: resolved.priceMax,
        year_min: resolved.yearMin,
        year_max: resolved.yearMax,
        colors: resolved.colors.length > 0 ? resolved.colors : null,
        categories: resolved.categoryIds.length > 0 ? resolved.categoryIds : null,
        page: null,
      });
    },
    [setState, filters],
  );

  const resetFilters = useCallback(() => {
    void setState({
      q: null,
      price_min: null,
      price_max: null,
      year_min: null,
      year_max: null,
      colors: null,
      categories: null,
      page: null,
    });
  }, [setState]);

  return { filters, activeFilterCount, setFilters, resetFilters };
}
