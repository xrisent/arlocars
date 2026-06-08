export type ContactQuotePayload = {
  name: string;
  email: string;
  message: string;
};

export type SellCarPayload = {
  fullName: string;
  contactNumber: string;
  carMakeModel: string;
  year: string;
  mileage: string;
  specifications: string;
  tradeIn: string;
  notes: string;
  images: File[];
};
