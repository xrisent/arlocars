"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCategoryRequest,
  deleteCategoryRequest,
  updateCategoryRequest,
} from "@/features/category/api/client";
import type {
  CategoryCreateInput,
  CategoryUpdateInput,
} from "@/features/category/model/interfaces";
import { QUERY_KEYS } from "@/shared/constants";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreateInput) => createCategoryRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES.BASE });
    },
  });
}

export function useUpdateCategory(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryUpdateInput) => updateCategoryRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES.BASE });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategoryRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES.BASE });
    },
  });
}
