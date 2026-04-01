import { listCategories } from "@/entities/category";
import { createCategory, parseCategoryJsonName } from "@/features/category";
import { requireAdmin } from "@/shared/lib/auth-request";
import { handleApiError, HttpError, jsonOk } from "@/shared/lib/http";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await listCategories(searchParams);
    return jsonOk(result);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      throw new HttpError(400, "Invalid JSON body");
    }
    const name = parseCategoryJsonName(body);
    const category = await createCategory(name);
    return jsonOk(category, 201);
  } catch (e) {
    return handleApiError(e);
  }
}
