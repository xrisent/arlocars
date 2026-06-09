import type { CategoryDto } from "@/entities/category/model/interfaces";
import type { CategoryCreateInput, CategoryUpdateInput } from "@/features/category/model/interfaces";
import { API_ENDPOINTS } from "@/shared/constants";
import { adminRequest, parseApiError } from "@/shared/lib/admin-api";

export async function createCategoryRequest(data: CategoryCreateInput): Promise<CategoryDto> {
  try {
    return await adminRequest<CategoryDto>({
      method: "POST",
      url: API_ENDPOINTS.CATEGORIES.BASE,
      data,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}

export async function updateCategoryRequest(
  id: number,
  data: CategoryUpdateInput,
): Promise<CategoryDto> {
  try {
    return await adminRequest<CategoryDto>({
      method: "PATCH",
      url: API_ENDPOINTS.CATEGORIES.BY_ID(id),
      data,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}

export async function deleteCategoryRequest(id: number): Promise<void> {
  try {
    await adminRequest<void>({
      method: "DELETE",
      url: API_ENDPOINTS.CATEGORIES.BY_ID(id),
    });
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}
