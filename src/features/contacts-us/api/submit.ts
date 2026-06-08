import axios, { AxiosError } from "axios";

import type { ContactQuotePayload } from "@/features/contacts-us";
import { API_ENDPOINTS } from "@/shared/constants";

async function parseErrorMessage(error: AxiosError): Promise<string> {
  const responseData = error.response?.data as { error?: string };
  return responseData?.error ?? "Request failed";
}

export async function submitContactQuote(data: ContactQuotePayload): Promise<void> {
  try {
    await axios.post(API_ENDPOINTS.CONTACT, data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(await parseErrorMessage(error as AxiosError));
  }
}

export async function submitSellCarForm(formData: FormData): Promise<void> {
  try {
    await axios.post(API_ENDPOINTS.SELL_YOUR_CAR, formData);
  } catch (error) {
    throw new Error(await parseErrorMessage(error as AxiosError));
  }
}
