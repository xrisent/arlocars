import type { CarDto } from "@/entities/car";
import { API_ENDPOINTS } from "@/shared/constants";
import { adminRequest, parseApiError } from "@/shared/lib/admin-api";

export async function createCarRequest(formData: FormData): Promise<CarDto> {
  try {
    return await adminRequest<CarDto>({
      method: "POST",
      url: API_ENDPOINTS.CARS.BASE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}

export async function updateCarRequest(id: number, formData: FormData): Promise<CarDto> {
  try {
    return await adminRequest<CarDto>({
      method: "PATCH",
      url: API_ENDPOINTS.CARS.BY_ID(id),
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}

export async function deleteCarRequest(id: number): Promise<void> {
  try {
    await adminRequest<void>({
      method: "DELETE",
      url: API_ENDPOINTS.CARS.BY_ID(id),
    });
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}
