import axios from "axios";

import type { CarDto, CarListResponse, ICarRequest } from "@/entities/car";
import { API_ENDPOINTS } from "@/shared/constants";

export function carRequestToSearchParams(params: ICarRequest): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.page != null) searchParams.set("page", String(params.page));
  if (params.page_size != null) searchParams.set("pageSize", String(params.page_size));
  if (params.priceMin != null) searchParams.set("priceMin", String(params.priceMin));
  if (params.priceMax != null) searchParams.set("priceMax", String(params.priceMax));
  if (params.yearMin != null) searchParams.set("yearMin", String(params.yearMin));
  if (params.yearMax != null) searchParams.set("yearMax", String(params.yearMax));
  if (params.q) searchParams.set("q", params.q);
  params.colors?.forEach((color) => searchParams.append("colors", color));
  params.categoryIds?.forEach((id) => searchParams.append("categoryIds", String(id)));

  return searchParams;
}

export const fetchCars = (params: ICarRequest) => {
  // Pass a real `URLSearchParams` (built the same way as the SSR path) so
  // axios serializes `categoryIds`/`colors` as repeated `key=value` pairs.
  // Handing axios a plain array instead produces `categoryIds[]=1` by
  // default, which `buildWhere`'s `searchParams.getAll("categoryIds")`
  // never matches — the filter is silently dropped server-side.
  return axios.get(API_ENDPOINTS.CARS.BASE, {
    params: carRequestToSearchParams(params),
  });
};

export async function fetchCarById(id: number): Promise<CarDto> {
  const response = await axios.get<CarDto>(API_ENDPOINTS.CARS.BY_ID(id));
  return response.data;
}
