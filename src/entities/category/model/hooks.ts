"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCategories, type CategoryListResponse, type ICategoryRequest } from "@/entities/category";
import { QUERY_KEYS } from "@/shared/constants";

export function useCategoriesQuery(params: ICategoryRequest = {}, initialData?: CategoryListResponse) {
  return useQuery({
    queryKey: [...QUERY_KEYS.CATEGORIES.LIST, params],
    queryFn: () => fetchCategories(params),
    initialData,
    staleTime: initialData ? 30_000 : 0,
  });
}
