import { getCategoryById } from "@/entities/category";
import { deleteCategory, parseCategoryJsonName, updateCategory } from "@/features/category";
import { requireAdmin } from "@/shared/lib/auth-request";
import { handleApiError, HttpError, jsonOk } from "@/shared/lib/http";

function parseId(raw: string): number {
  const id = Number.parseInt(raw, 10);
  if (!Number.isFinite(id)) {
    throw new HttpError(400, "Invalid id");
  }
  return id;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await context.params;
    const id = parseId(idParam);
    const category = await getCategoryById(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    return jsonOk(category);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(request);
    const { id: idParam } = await context.params;
    const id = parseId(idParam);
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      throw new HttpError(400, "Invalid JSON body");
    }
    const name = parseCategoryJsonName(body);
    const category = await updateCategory(id, name);
    return jsonOk(category);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(request);
    const { id: idParam } = await context.params;
    const id = parseId(idParam);
    await deleteCategory(id);
    return new Response(null, { status: 204 });
  } catch (e) {
    return handleApiError(e);
  }
}
