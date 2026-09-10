import type { CarListResponse } from "@/entities/car";
import type { CategoryDto } from "@/entities/category";
import { CarsForSale } from "@/widgets/cars-for-sale";

interface CarsPageProps {
  initialData?: CarListResponse;
  categories: CategoryDto[];
  colors: string[];
}

export const CarsPage = ({ initialData, categories, colors }: CarsPageProps) => {
  return (
    <main className="min-h-[calc(100vh-667px)]">
      <h1 className="sr-only">Cars For Sale in Dubai</h1>
      <CarsForSale initialData={initialData} categories={categories} colors={colors} />
    </main>
  );
};
