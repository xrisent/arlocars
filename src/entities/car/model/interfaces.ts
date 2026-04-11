export type Car = {
  id: number;
  price: number;
  description: string;
  name: string;
  mainPhoto: string;
  photos: string;
  year: number;
  color: string;
  categoryId: number;
  createdAt: string;
};

export type CarDto = {
  id: number;
  price: number;
  description: string;
  name: string;
  mainPhoto: string;
  photos: string[];
  year: number;
  color: string;
  categoryId: number;
  category: { id: number; name: string };
  createdAt: string;
};

export type CarListResponse = {
  items: CarDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type CarRowWithCategory = {
  id: number;
  price: number;
  description: string;
  mainPhoto: string;
  name: string;
  photos: string;
  year: number;
  color: string;
  categoryId: number;
  createdAt: Date;
  category: { id: number; name: string };
};

export interface ICarRequest {
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  colors?: string[];
  categoryIds?: number[];
  q?: string;
  page?: number;
  page_size?: number;
}
