"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchCategories, type CategoryListResponse, type ICategoryRequest } from "@/entities/category";
import { QUERY_KEYS } from "@/shared/constants";

export function useCategoriesQuery(params: ICategoryRequest = {}, initialData?: CategoryListResponse) {
  // `initialData` is the SSR result for whatever params the page first
  // rendered with (e.g. page 1, no search). If it were passed
  // unconditionally, any *other* params combination would briefly seed its
  // brand-new query key with this unrelated snapshot. Only seed the exact
  // query key it belongs to, and treat the admin table like any other
  // mutable list — always refetch rather than trusting a stale window.
  const [initialParams] = useState(params);
  const isInitialParams = JSON.stringify(params) === JSON.stringify(initialParams);

  return useQuery({
    queryKey: [...QUERY_KEYS.CATEGORIES.LIST, params],
    queryFn: () => fetchCategories(params),
    initialData: isInitialParams ? initialData : undefined,
    staleTime: 0,
  });
}
