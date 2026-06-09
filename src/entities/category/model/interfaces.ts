export interface CategoryDto {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  items: CategoryDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
