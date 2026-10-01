import type { CategoryListResponse } from "@/entities/category";
import { categoryRequestToSearchParams } from "@/entities/category/api/requests";
import { listCategories } from "@/entities/category/api/server";
import { AdminCategoriesPage } from "@/views/admin";

export default async function AdminCategoriesRoute() {
  let initialData: CategoryListResponse | undefined;

  try {
    initialData = await listCategories(
      categoryRequestToSearchParams({
        page: 1,
        pageSize: 10,
      }),
    );
  } catch {
    initialData = undefined;
  }

  return <AdminCategoriesPage initialData={initialData} />;
}
