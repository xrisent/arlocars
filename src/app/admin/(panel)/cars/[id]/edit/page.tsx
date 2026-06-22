import { getCarById } from "@/entities/car/api/requests";
import { AdminCarFormPage } from "@/views/admin";

interface AdminCarEditRouteProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCarEditRoute({ params }: AdminCarEditRouteProps) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);

  if (!Number.isFinite(id)) {
    return <p>Car not found</p>;
  }

  const initialCar = await getCarById(id);

  if (!initialCar) {
    return <p>Car not found</p>;
  }

  return <AdminCarFormPage mode="edit" carId={id} initialCar={initialCar} />;
}
