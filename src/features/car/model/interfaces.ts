export interface ParsedCarCreate {
  price: number;
  oldPrice?: number;
  mileage?: number;
  year: number;
  color: string;
  description: string;
  categoryId: number;
  name: string;
  mainPhoto: File;
  photos: File[];
}

export interface ParsedCarUpdate {
  price?: number;
  oldPrice?: number | null;
  mileage?: number | null;
  year?: number;
  name?: string;
  color?: string;
  description?: string;
  categoryId?: number;
  mainPhoto?: File;
  photos: File[];
  replacePhotos: boolean;
}
