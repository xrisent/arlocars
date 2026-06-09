import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

import { API_ENDPOINTS, STORAGE_KEYS } from "@/shared/constants";
import type { AuthTokens } from "@/shared/interfaces";

export const AUTH_STORAGE_EVENT = "arlocars-auth-change";

export function notifyAuthStorageChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
  }
}

interface ApiErrorBody {
  error?: string;
}

let refreshPromise: Promise<string> | null = null;

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
}

export function saveAuthTokens(tokens: AuthTokens): void {
  localStorage.setItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN, tokens.refreshToken);
  notifyAuthStorageChange();
}

export function clearAuthTokens(): void {
  localStorage.removeItem(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
  notifyAuthStorageChange();
}

export function loadAuthTokens(): AuthTokens | null {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await axios.post<AuthTokens>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  saveAuthTokens(response.data);
  return response.data.accessToken;
}

async function getValidAccessToken(): Promise<string | null> {
  return getAccessToken();
}

export async function parseApiError(error: unknown): Promise<string> {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>;
    return axiosError.response?.data?.error ?? axiosError.message ?? "Request failed";
  }
  if (error instanceof Error) return error.message;
  return "Request failed";
}

export async function adminRequest<T>(config: AxiosRequestConfig, retry = true): Promise<T> {
  const token = await getValidAccessToken();
  const headers: Record<string, string> = {
    ...(config.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.request<T>({ ...config, headers });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || !retry) {
      throw error;
    }

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    try {
      const newToken = await refreshPromise;
      const retryHeaders = { ...config.headers, Authorization: `Bearer ${newToken}` };
      const response = await axios.request<T>({ ...config, headers: retryHeaders });
      return response.data;
    } catch {
      clearAuthTokens();
      throw error;
    }
  }
}
