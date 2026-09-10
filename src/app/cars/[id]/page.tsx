import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCarById } from "@/entities/car/api/requests";
import { formatMileage } from "@/shared/lib/format";
import { breadcrumbSchema, buildPageMetadata, JsonLd, vehicleSchema } from "@/shared/seo";
import { getImageUrl } from "@/shared/utils";
import { CarDetailPage } from "@/views/cars/ui/car-detail-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);

  if (!Number.isFinite(id)) {
    return { title: "Car Not Found" };
  }

  const car = await getCarById(id);

  if (!car) {
    return { title: "Car Not Found" };
  }

  const summary = [
    String(car.year),
    car.mileage != null ? formatMileage(car.mileage) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const description = summary
    ? `${summary}. ${car.description}`.slice(0, 160)
    : car.description.slice(0, 160);

  return buildPageMetadata({
    title: car.name,
    description,
    path: `/cars/${car.id}`,
    ogImage: getImageUrl(car.mainPhoto),
  });
}

export default async function CarDetailRoute({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);

  if (!Number.isFinite(id)) {
    notFound();
  }

  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Cars For Sale", path: "/cars" },
            { name: car.name, path: `/cars/${car.id}` },
          ]),
          vehicleSchema(car),
        ]}
      />
      <CarDetailPage car={car} />
    </>
  );
}
