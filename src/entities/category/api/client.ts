import axios from "axios";

import type { CategoryListResponse } from "@/entities/category/model/interfaces";
import { API_ENDPOINTS } from "@/shared/constants";

export interface CategoryListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function fetchCategories(
  params: CategoryListParams = {},
): Promise<CategoryListResponse> {
  const response = await axios.get<CategoryListResponse>(API_ENDPOINTS.CATEGORIES.BASE, {
    params,
  });
  return response.data;
}
