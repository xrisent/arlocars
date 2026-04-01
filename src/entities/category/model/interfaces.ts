export type CategoryDto = {
  id: number;
  name: string;
};

export type CategoryListResponse = {
  items: CategoryDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
