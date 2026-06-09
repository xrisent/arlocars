"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";

import { loginAdmin } from "@/features/auth/api/client";
import type { LoginFields } from "@/features/auth/ui/auth-form";
import {
  AUTH_STORAGE_EVENT,
  clearAuthTokens,
  loadAuthTokens,
} from "@/shared/lib/admin-api";

function subscribeToAuthStorage(onStoreChange: () => void) {
  window.addEventListener(AUTH_STORAGE_EVENT, onStoreChange);
  return () => window.removeEventListener(AUTH_STORAGE_EVENT, onStoreChange);
}

function getAccessTokenSnapshot(): string | null {
  return loadAuthTokens()?.accessToken ?? null;
}

export function useAuthSession() {
  const isReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const accessToken = useSyncExternalStore(
    subscribeToAuthStorage,
    getAccessTokenSnapshot,
    () => null,
  );

  const logout = useCallback(() => {
    clearAuthTokens();
  }, []);

  return { accessToken, isAuthenticated: Boolean(accessToken), isReady, logout };
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginFields) => loginAdmin(credentials),
    onSuccess: () => {
      router.replace("/admin/cars");
    },
  });
}
