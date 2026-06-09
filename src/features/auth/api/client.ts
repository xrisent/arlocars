import axios from "axios";

import type { AuthTokens } from "@/features/auth/model/interfaces";
import type { LoginFields } from "@/features/auth/ui/auth-form";
import { API_ENDPOINTS } from "@/shared/constants";
import { parseApiError, saveAuthTokens } from "@/shared/lib/admin-api";

export async function loginAdmin(credentials: LoginFields): Promise<AuthTokens> {
  try {
    const response = await axios.post<AuthTokens>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    saveAuthTokens(response.data);
    return response.data;
  } catch (error) {
    throw new Error(await parseApiError(error));
  }
}
