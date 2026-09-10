"use client";

import { useQueryState } from "nuqs";

import { CarsGridView, useCarsQuery } from "@/entities/car";
import type { CarListResponse } from "@/entities/car";
import type { CategoryDto } from "@/entities/category";
import { carFiltersToRequest, CarFiltersPanel, useCarFilters } from "@/features/car-filters";

interface CarsForSaleProps {
  initialData?: CarListResponse;
  categories: CategoryDto[];
  colors: string[];
}

export const CarsForSale = ({ initialData, categories, colors }: CarsForSaleProps) => {
  const { filters } = useCarFilters();
  const [page, setPage] = useQueryState("page");
  const [pageSize, setPageSize] = useQueryState("page_size");

  const currentPage = page ? Number.parseInt(page, 10) || 1 : 1;
  const currentPageSize = pageSize ? Number.parseInt(pageSize, 10) || 10 : 10;

  const { data, isLoading } = useCarsQuery(
    carFiltersToRequest(filters, { page: currentPage, page_size: currentPageSize }),
    initialData,
  );

  return (
    <div className="pt-[130px]">
      <CarFiltersPanel categories={categories} colors={colors} />
      <div className="container pt-[40px]">
        <CarsGridView
          items={data?.items ?? []}
          pagination={{
            pageSize: currentPageSize,
            total: data?.total || 0,
            current: currentPage,
            onChange: (pageChange, pageSizeChange) => {
              setPage(pageChange.toString());
              setPageSize(pageSizeChange?.toString() || "");
            },
          }}
          loading={isLoading}
          className="pb-[40px]"
        />
      </div>
    </div>
  );
};
