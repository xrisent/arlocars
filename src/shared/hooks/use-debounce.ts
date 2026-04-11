"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number, withLoading?: false): T;

export function useDebounce<T>(
  value: T,
  delay: number,
  withLoading: true,
): { value: T; isLoading: boolean };

export function useDebounce<T>(value: T, delay: number, withLoading = false) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  if (withLoading) {
    return { value: debouncedValue, isLoading };
  }

  return debouncedValue;
}
