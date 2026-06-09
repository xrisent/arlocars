"use client";

import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { CarListResponse, carsAtom, fetchCarById, fetchCars, ICarRequest } from "@/entities/car";
import { QUERY_KEYS } from "@/shared/constants";

export const useCarsQuery = (params: ICarRequest, initialData?: CarListResponse) => {
  const setCars = useSetAtom(carsAtom);

  const query = useQuery({
    queryKey: [QUERY_KEYS.CARS.BASE, QUERY_KEYS.CARS.LIST, params],
    queryFn: async () => {
      const response = await fetchCars(params);
      return response.data;
    },
    initialData,
    staleTime: initialData ? 30_000 : 0,
  });

  useEffect(() => {
    if (query.data) {
      setCars(query.data.items);
    }
  }, [query.data, setCars]);

  return query;
};

export function useCarQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.CARS.DETAIL(id),
    queryFn: () => fetchCarById(id),
    enabled: Number.isFinite(id),
  });
}
