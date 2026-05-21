import type { Metadata } from "next";

import type { CarListResponse } from "@/entities/car";
import { carRequestToSearchParams, listCars } from "@/entities/car/api/requests";
import { buildPageMetadata } from "@/shared/seo";
import { CarsPage } from "@/views/cars";

export const metadata: Metadata = buildPageMetadata({
  title: "Cars For Sale",
  description:
    "Browse verified used cars for sale in Dubai. Filter by price, year and category at Arlo Cars.",
  path: "/cars",
});

export default async function Cars() {
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

  return <CarsPage initialData={initialData} />;
}
