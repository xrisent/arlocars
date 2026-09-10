import type { CarDto } from "@/entities/car";
import type { CarFiltersState } from "@/features/car-filters/model/types";

export function filterCars(cars: CarDto[], filters: CarFiltersState): CarDto[] {
  const q = filters.q.trim().toLowerCase();

  return cars.filter((car) => {
    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(car.categoryId)) {
      return false;
    }
    if (filters.colors.length > 0 && !filters.colors.includes(car.color)) {
      return false;
    }
    if (filters.priceMin != null && car.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax != null && car.price > filters.priceMax) {
      return false;
    }
    if (filters.yearMin != null && car.year < filters.yearMin) {
      return false;
    }
    if (filters.yearMax != null && car.year > filters.yearMax) {
      return false;
    }
    if (q && !car.name.toLowerCase().includes(q) && !car.description.toLowerCase().includes(q)) {
      return false;
    }
    return true;
  });
}
