import type { CarListResponse } from "@/entities/car";
import { carRequestToSearchParams, listCars } from "@/entities/car/api/requests";
import { AdminCarsPage } from "@/views/admin";

export default async function AdminCarsRoute() {
  let initialData: CarListResponse | undefined;

  try {
    initialData = await listCars(
      carRequestToSearchParams({
        page: 1,
        page_size: 10,
      }),
    );
  } catch {
    initialData = undefined;
  }

  return <AdminCarsPage initialData={initialData} />;
}
