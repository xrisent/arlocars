import axios from "axios";

import type {
  CategoryListResponse,
  ICategoryRequest,
} from "@/entities/category/model/interfaces";
import { API_ENDPOINTS } from "@/shared/constants";

export function categoryRequestToSearchParams(params: ICategoryRequest): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.page != null) searchParams.set("page", String(params.page));
  if (params.pageSize != null) searchParams.set("pageSize", String(params.pageSize));
  if (params.search) searchParams.set("search", params.search);

  return searchParams;
}

export async function fetchCategories(params: ICategoryRequest = {}): Promise<CategoryListResponse> {
  const response = await axios.get<CategoryListResponse>(API_ENDPOINTS.CATEGORIES.BASE, {
    params,
  });
  return response.data;
}
