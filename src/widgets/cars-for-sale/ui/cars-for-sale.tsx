"use client";

import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState, useQueryStates } from "nuqs";

import { CarsGridView, useCarsQuery } from "@/entities/car";
import type { CarListResponse } from "@/entities/car";
import { useDebounce } from "@/shared/hooks";

interface CarsForSaleProps {
  initialData?: CarListResponse;
}

export const CarsForSale = ({ initialData }: CarsForSaleProps) => {
  const [priceMin] = useQueryState("price_min");
  const [priceMax] = useQueryState("price_max");
  const [yearMin] = useQueryState("year_min");
  const [yearMax] = useQueryState("year_max");
  const [colors] = useQueryStates({ colors: parseAsArrayOf(parseAsString) });
  const [categories] = useQueryStates({ categories: parseAsArrayOf(parseAsInteger) });
  const [q] = useQueryState("q");
  const [pageSize, setPageSize] = useQueryState("page_size");
  const [page, setPage] = useQueryState("page");

  const debouncedPriceMin = useDebounce(priceMin, 500);
  const debouncedPriceMax = useDebounce(priceMax, 500);
  const debouncedYearMin = useDebounce(yearMin, 500);
  const debouncedYearMax = useDebounce(yearMax, 500);
  const debouncedColors = useDebounce(colors, 500);
  const debouncedCategories = useDebounce(categories, 500);
  const debouncedQ = useDebounce(q, 500);
  const debouncedPageSize = useDebounce(pageSize, 500);
  const debouncedPage = useDebounce(page, 500);

  const { data, isLoading } = useCarsQuery(
    {
    priceMin: debouncedPriceMin
      ? isNaN(parseInt(debouncedPriceMin))
        ? undefined
        : parseInt(debouncedPriceMin)
      : undefined,
    priceMax: debouncedPriceMax
      ? isNaN(parseInt(debouncedPriceMax))
        ? undefined
        : parseInt(debouncedPriceMax)
      : undefined,
    yearMin: debouncedYearMin
      ? isNaN(parseInt(debouncedYearMin))
        ? undefined
        : parseInt(debouncedYearMin)
      : undefined,
    yearMax: debouncedYearMax
      ? isNaN(parseInt(debouncedYearMax))
        ? undefined
        : parseInt(debouncedYearMax)
      : undefined,
    colors: debouncedColors?.colors?.length ? debouncedColors.colors : undefined,
    categoryIds: debouncedCategories?.categories?.length
      ? debouncedCategories.categories
      : undefined,
    q: debouncedQ || undefined,
    page: debouncedPage ? (isNaN(parseInt(debouncedPage)) ? 1 : parseInt(debouncedPage)) : 1,
    page_size: debouncedPageSize
      ? isNaN(parseInt(debouncedPageSize))
        ? 10
        : parseInt(debouncedPageSize)
      : 10,
    },
    initialData,
  );

  return (
    <div className="container pt-[130px]">
      <CarsGridView
        items={data?.items ?? []}
        pagination={{
          pageSize: debouncedPageSize
            ? isNaN(parseInt(debouncedPageSize))
              ? 10
              : parseInt(debouncedPageSize)
            : 10,
          total: data?.total || 0,
          current: debouncedPage
            ? isNaN(parseInt(debouncedPage))
              ? 1
              : parseInt(debouncedPage)
            : 1,
          onChange: (pageChange, pageSizeChange) => {
            setPage(pageChange.toString());
            setPageSize(pageSizeChange?.toString() || "");
          },
        }}
        loading={isLoading}
        className="pb-[40px]"
      />
    </div>
  );
};
