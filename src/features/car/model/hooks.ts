"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CarDto } from "@/entities/car";
import { createCarRequest, deleteCarRequest, updateCarRequest } from "@/features/car/api/client";
import { QUERY_KEYS } from "@/shared/constants";

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createCarRequest(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARS.BASE });
    },
  });
}

export function useUpdateCar(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateCarRequest(id, formData),
    onSuccess: (car: CarDto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARS.BASE });
      queryClient.setQueryData(QUERY_KEYS.CARS.DETAIL(id), car);
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCarRequest(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARS.BASE });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.CARS.DETAIL(id) });
    },
  });
}
