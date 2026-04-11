import type { CarDto } from "@/entities/car";
import { CarCardView } from "@/entities/car";
import { CustomCardGrid } from "@/shared/ui";

interface CarsGridViewProps {
  items: CarDto[];
  pagination: {
    current: number;
    pageSize: number;
    total?: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  loading: boolean;
  className?: string;
}

export const CarsGridView = ({ items, loading, className, pagination }: CarsGridViewProps) => {
  return (
    <CustomCardGrid data={items} pagination={pagination} loading={loading} className={className}>
      {items.map((car) => (
        <CarCardView car={car} key={car.id} />
      ))}
    </CustomCardGrid>
  );
};
