export interface CarFiltersState {
  q: string;
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  colors: string[];
  categoryIds: number[];
}

export const EMPTY_CAR_FILTERS: CarFiltersState = {
  q: "",
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  colors: [],
  categoryIds: [],
};
