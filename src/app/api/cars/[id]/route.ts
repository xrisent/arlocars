import { getCarById } from "@/entities/car";
import { deleteCar, parseCarUpdateForm, updateCar } from "@/features/car";
import { requireAdmin } from "@/shared/lib/auth-request";
import { handleApiError, HttpError, jsonOk } from "@/shared/lib/http";

export const runtime = "nodejs";

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
    const car = await getCarById(id);
    if (!car) {
      throw new HttpError(404, "Car not found");
    }
    return jsonOk(car);
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
    const form = await request.formData();
    const parsed = parseCarUpdateForm(form);
    const car = await updateCar(id, parsed);
    return jsonOk(car);
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
    await deleteCar(id);
    return new Response(null, { status: 204 });
  } catch (e) {
    return handleApiError(e);
  }
}
