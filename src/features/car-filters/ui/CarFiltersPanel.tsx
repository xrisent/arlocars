"use client";

import { useEffect, useState } from "react";

import type { CategoryDto } from "@/entities/category";
import { EMPTY_CAR_FILTERS } from "@/features/car-filters/model/types";
import { useCarFilters } from "@/features/car-filters/model/useCarFilters";
import { useDebounce } from "@/shared/hooks";
import { CustomSelect } from "@/shared/ui";

const DEBOUNCE_MS = 400;

interface CarFiltersPanelProps {
  categories: CategoryDto[];
  colors: string[];
}

const inputClassName =
  "w-full border-0 border-b border-[var(--border-color)] bg-transparent px-0 py-2 text-sm text-[var(--color-dark)] placeholder:text-[var(--color-medium)] focus:border-[var(--color-gold)] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const labelClassName =
  "mb-2.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-medium)]";

/**
 * Horizontal filter bar for `/cars`. Category/color apply immediately
 * (discrete clicks); search, price and year are typed into local "draft"
 * state and only reach the URL — via `useCarFilters#setFilters` — after a
 * 400ms pause, so typing doesn't write to `history`/refetch on every
 * keystroke.
 *
 * Collapses into a toggleable panel below `md` — the search box stays
 * visible, the rest hides behind a "Filters" disclosure button.
 */
export const CarFiltersPanel = ({ categories, colors }: CarFiltersPanelProps) => {
  const { filters, activeFilterCount, setFilters, resetFilters } = useCarFilters();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [draft, setDraft] = useState(filters);

  // Re-sync the draft whenever the URL-derived filters change from outside
  // this form (browser back/forward, a link, reset) — adjusted during
  // render rather than in an effect, and only touches this component's own
  // local state (never `setFilters`), so it can't clash with other
  // components subscribed to the same URL params. See
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [syncedFilters, setSyncedFilters] = useState(filters);
  if (filters !== syncedFilters) {
    setSyncedFilters(filters);
    setDraft(filters);
  }

  const debouncedSearch = useDebounce(draft.q, DEBOUNCE_MS);
  const debouncedPriceMin = useDebounce(draft.priceMin, DEBOUNCE_MS);
  const debouncedPriceMax = useDebounce(draft.priceMax, DEBOUNCE_MS);
  const debouncedYearMin = useDebounce(draft.yearMin, DEBOUNCE_MS);
  const debouncedYearMax = useDebounce(draft.yearMax, DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch !== filters.q) {
      setFilters((current) => ({ ...current, q: debouncedSearch }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedPriceMin !== filters.priceMin || debouncedPriceMax !== filters.priceMax) {
      setFilters((current) => ({
        ...current,
        priceMin: debouncedPriceMin,
        priceMax: debouncedPriceMax,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceMin, debouncedPriceMax]);

  useEffect(() => {
    if (debouncedYearMin !== filters.yearMin || debouncedYearMax !== filters.yearMax) {
      setFilters((current) => ({
        ...current,
        yearMin: debouncedYearMin,
        yearMax: debouncedYearMax,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedYearMin, debouncedYearMax]);

  const handleReset = () => {
    setDraft(EMPTY_CAR_FILTERS);
    resetFilters();
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: String(category.id),
  }));
  const colorOptions = colors.map((color) => ({ label: color, value: color }));

  return (
    <form
      role="search"
      aria-label="Car filters"
      onSubmit={(event) => {
        event.preventDefault();
        // Enter/"Search" commits the draft immediately instead of waiting
        // out the debounce.
        setFilters(draft);
      }}
      className="border-b border-[var(--border-color)] bg-white py-6"
    >
      <div className="container">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="car-search" className="sr-only">
            Search by make or model
          </label>
          <input
            id="car-search"
            name="q"
            type="search"
            placeholder="Search by make or model…"
            value={draft.q}
            onChange={(event) => setDraft((current) => ({ ...current, q: event.target.value }))}
            className="w-full flex-1 border border-[var(--border-color)] px-5 py-3 text-base text-[var(--color-dark)] placeholder:text-[var(--color-medium)] focus:border-[var(--color-gold)] focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setIsPanelOpen((open) => !open)}
            aria-expanded={isPanelOpen}
            aria-controls="car-filters-fields"
            className="shrink-0 border border-[var(--color-gold)] px-5 py-3 text-sm font-medium text-[var(--color-gold)] transition-colors duration-200 hover:bg-[var(--color-gold)] hover:text-white md:hidden"
          >
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>

        <div
          id="car-filters-fields"
          className={`mt-6 flex-col md:flex ${isPanelOpen ? "flex" : "hidden"}`}
        >
          <div className="grid grid-cols-1 gap-px border border-[var(--border-color)] bg-[var(--border-color)] sm:grid-cols-2 md:grid-cols-4">
            {categories.length > 0 && (
              <div className="bg-white p-5">
                <label htmlFor="filter-category" className={labelClassName}>
                  Category
                </label>
                <CustomSelect
                  id="filter-category"
                  name="categories"
                  value={draft.categoryIds[0] != null ? String(draft.categoryIds[0]) : ""}
                  onChange={(value) => {
                    const categoryIds = value ? [Number(value)] : [];
                    setDraft((current) => ({ ...current, categoryIds }));
                    setFilters((current) => ({ ...current, categoryIds }));
                  }}
                  options={categoryOptions}
                  placeholder="All categories"
                />
              </div>
            )}

            {colors.length > 0 && (
              <div className="bg-white p-5">
                <label htmlFor="filter-color" className={labelClassName}>
                  Color
                </label>
                <CustomSelect
                  id="filter-color"
                  name="colors"
                  value={draft.colors[0] ?? ""}
                  onChange={(value) => {
                    const nextColors = value ? [value] : [];
                    setDraft((current) => ({ ...current, colors: nextColors }));
                    setFilters((current) => ({ ...current, colors: nextColors }));
                  }}
                  options={colorOptions}
                  placeholder="Any color"
                />
              </div>
            )}

            <div className="bg-white p-5">
              <span className={labelClassName}>Price, AED</span>
              <div className="flex items-center gap-2">
                <label htmlFor="price_min" className="sr-only">
                  Minimum price
                </label>
                <input
                  id="price_min"
                  name="price_min"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="From"
                  value={draft.priceMin ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      priceMin: event.target.value === "" ? null : Number(event.target.value),
                    }))
                  }
                  className={inputClassName}
                />
                <label htmlFor="price_max" className="sr-only">
                  Maximum price
                </label>
                <input
                  id="price_max"
                  name="price_max"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="To"
                  value={draft.priceMax ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      priceMax: event.target.value === "" ? null : Number(event.target.value),
                    }))
                  }
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="bg-white p-5">
              <span className={labelClassName}>Year</span>
              <div className="flex items-center gap-2">
                <label htmlFor="year_min" className="sr-only">
                  From year
                </label>
                <input
                  id="year_min"
                  name="year_min"
                  type="number"
                  inputMode="numeric"
                  min={1980}
                  placeholder="From"
                  value={draft.yearMin ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      yearMin: event.target.value === "" ? null : Number(event.target.value),
                    }))
                  }
                  className={inputClassName}
                />
                <label htmlFor="year_max" className="sr-only">
                  To year
                </label>
                <input
                  id="year_max"
                  name="year_max"
                  type="number"
                  inputMode="numeric"
                  min={1980}
                  placeholder="To"
                  value={draft.yearMax ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      yearMax: event.target.value === "" ? null : Number(event.target.value),
                    }))
                  }
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              disabled={activeFilterCount === 0}
              className={`text-sm text-[var(--color-medium)] underline underline-offset-4 transition-colors duration-200 hover:text-[var(--color-gold)] disabled:opacity-50 disabled:hover:text-[var(--color-medium)] ${activeFilterCount !== 0 && "cursor-pointer"}`}
            >
              Reset all
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
