export interface ContactQuotePayload {
  name: string;
  email: string;
  message: string;
}

export interface SellCarPayload {
  fullName: string;
  contactNumber: string;
  carMakeModel: string;
  year: string;
  mileage: string;
  specifications: string;
  tradeIn: string;
  notes: string;
  images: File[];
}
