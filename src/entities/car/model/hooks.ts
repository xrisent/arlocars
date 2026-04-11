"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { CarListResponse, carsAtom, fetchCars, ICarRequest } from "@/entities/car";
import { QUERY_KEYS } from "@/shared/constants";

export const useCarsQuery = (params: ICarRequest) => {
  const setCars = useSetAtom(carsAtom);

  const query = useQuery({
    queryKey: [QUERY_KEYS.CARS.BASE, QUERY_KEYS.CARS.LIST, params],
    queryFn: () => fetchCars(params),
    select: (data: AxiosResponse<CarListResponse>) => data.data,
  });

  useEffect(() => {
    if (query.data) {
      setCars(query.data.items);
    }
  }, [query.data, setCars]);

  return query;
};
