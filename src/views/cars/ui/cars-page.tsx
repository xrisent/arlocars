import type { CarListResponse } from "@/entities/car";
import { CarsForSale } from "@/widgets/cars-for-sale";

interface CarsPageProps {
  initialData?: CarListResponse;
}

export const CarsPage = ({ initialData }: CarsPageProps) => {
  return (
    <main>
      <h1 className="sr-only">Cars For Sale in Dubai</h1>
      <CarsForSale initialData={initialData} />
    </main>
  );
};
