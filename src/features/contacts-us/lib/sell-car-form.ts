import type { SellCarPayload } from "@/features/contacts-us/model/interfaces";
import { HttpError } from "@/shared/lib/http";
import { parseImages, str } from "@/shared/lib/parser";

export function parseSellCarForm(form: FormData): SellCarPayload {
  const fullName = str(form.get("fullName"));
  const contactNumber = str(form.get("contactNumber"));
  const carMakeModel = str(form.get("carMakeModel"));
  const year = str(form.get("year"));
  const mileage = str(form.get("mileage"));
  const specifications = str(form.get("specifications"));
  const tradeIn = str(form.get("tradeIn"));
  const notes = str(form.get("notes"));
  const images = parseImages(form);

  if (!fullName || !contactNumber || !carMakeModel || !year || !mileage) {
    throw new HttpError(
      400,
      "fullName, contactNumber, carMakeModel, year and mileage are required",
    );
  }

  return {
    fullName,
    contactNumber,
    carMakeModel,
    year,
    mileage,
    specifications: specifications || "",
    tradeIn: tradeIn || "",
    notes: notes || "",
    images,
  };
}
