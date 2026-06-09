import { AdminCarDetailPage } from "@/views/admin";

interface AdminCarDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCarDetailRoute({ params }: AdminCarDetailRouteProps) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);

  if (!Number.isFinite(id)) {
    return <p>Car not found</p>;
  }

  return <AdminCarDetailPage carId={id} />;
}
