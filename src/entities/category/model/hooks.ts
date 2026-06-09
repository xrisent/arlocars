"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "@/entities/category/api/client";
import type { CategoryListParams } from "@/entities/category/api/client";
import { QUERY_KEYS } from "@/shared/constants";

export function useCategoriesQuery(params: CategoryListParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES.BASE, QUERY_KEYS.CATEGORIES.LIST, params],
    queryFn: () => fetchCategories(params),
  });
}
