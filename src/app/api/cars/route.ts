import { listCars } from "@/entities/car";
import { createCar, parseCarCreateForm } from "@/features/car";
import { requireAdmin } from "@/shared/lib/auth-request";
import { handleApiError, jsonOk } from "@/shared/lib/http";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await listCars(searchParams);
    return jsonOk(result);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const form = await request.formData();
    const parsed = parseCarCreateForm(form);
    const car = await createCar(parsed);
    return jsonOk(car, 201);
  } catch (e) {
    return handleApiError(e);
  }
}
