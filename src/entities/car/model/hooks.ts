"use client";

import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  CarDto,
  CarListResponse,
  carsAtom,
  fetchCarById,
  fetchCars,
  ICarRequest,
} from "@/entities/car";
import { QUERY_KEYS } from "@/shared/constants";

export const useCarsQuery = (params: ICarRequest, initialData?: CarListResponse) => {
  const setCars = useSetAtom(carsAtom);

  // `initialData` is the SSR result for whatever params the page first
  // rendered with. If it were passed unconditionally, every *other* params
  // combination (e.g. after picking a category filter) would briefly seed
  // its brand-new query key with this unrelated, unfiltered snapshot before
  // the real fetch resolves. Only seed the exact query key it belongs to.
  const [initialParams] = useState(params);
  const isInitialParams = JSON.stringify(params) === JSON.stringify(initialParams);

  const query = useQuery({
    queryKey: [...QUERY_KEYS.CARS.LIST, params],
    queryFn: async () => {
      const response = await fetchCars(params);
      return response.data;
    },
    initialData: isInitialParams ? initialData : undefined,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      setCars(query.data.items);
    }
  }, [query.data, setCars]);

  return query;
};

export function useCarQuery(id: number, initialData?: CarDto) {
  return useQuery({
    queryKey: QUERY_KEYS.CARS.DETAIL(id),
    queryFn: () => fetchCarById(id),
    enabled: Number.isFinite(id),
    initialData,
    staleTime: initialData ? 30_000 : 0,
  });
}
