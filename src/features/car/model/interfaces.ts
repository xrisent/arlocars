export type ParsedCarCreate = {
  price: number;
  year: number;
  color: string;
  description: string;
  categoryId: number;
  name: string;
  mainPhoto: File;
  photos: File[];
};

export type ParsedCarUpdate = {
  price?: number;
  year?: number;
  name?: string;
  color?: string;
  description?: string;
  categoryId?: number;
  mainPhoto?: File;
  photos: File[];
  replacePhotos: boolean;
};
