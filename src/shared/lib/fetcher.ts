// import { message } from "antd";
// import axios, { AxiosError } from "axios";
// import type { AxiosInstance, AxiosRequestConfig } from "axios";

// import { API_ENDPOINTS, STORAGE_KEYS } from "@/shared/constants";

// import { ENV_CONFIG } from "@/shared/configs";

// const config: AxiosRequestConfig = {
//   baseURL: `${ENV_CONFIG.api.url}/${ENV_CONFIG.api.version}`,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// };

// const $api: AxiosInstance = axios.create(config);

// $api.interceptors.request.use(
//   (configApi) => {
//     const token = localStorage.getItem(STORAGE_KEYS.USER.TOKEN);
//     if (token) {
//       configApi.headers.Authorization = `Bearer ${token}`;
//     }
//     return configApi;
//   },
//   (error) => Promise.reject(error),
// );

// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (value?: any) => void;
//   reject: (error?: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// const refreshToken = async (): Promise<string> => {
//   const refreshTokenLocal = localStorage.getItem(STORAGE_KEYS.USER.REFRESH_TOKEN);

//   if (!refreshTokenLocal) {
//     throw new Error("No refresh token available");
//   }

//   try {
//     const response = await axios.post(
//       `/api/v1/${API_ENDPOINTS.AUTH.REFRESH}`,
//       { refresh: refreshTokenLocal },
//       { timeout: 10000 },
//     );

//     const { access, refresh: newRefreshToken } = response.data;

//     localStorage.setItem(STORAGE_KEYS.USER.TOKEN, access);
//     localStorage.setItem(STORAGE_KEYS.USER.REFRESH_TOKEN, newRefreshToken);

//     return access;
//   } catch (error) {
//     localStorage.removeItem(STORAGE_KEYS.USER.TOKEN);
//     localStorage.removeItem(STORAGE_KEYS.USER.REFRESH_TOKEN);
//     throw error;
//   }
// };

// $api.interceptors.response.use(
//   (response) => response,
//   async (errAxios: AxiosError) => {
//     const error = errAxios as AxiosError<{ error?: string }>;
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const status = error.response?.status;
//     const url = originalRequest?.url || "";

//     const isAuthRequest = url.includes("/auth/staff/login/") || url.includes("/auth/refresh/");

//     if (status === 401 && isAuthRequest) {
//       return Promise.reject(error);
//     }

//     if (status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             if (originalRequest.headers) {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             }
//             return $api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const newToken = await refreshToken();
//         processQueue(null, newToken);

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         }

//         return $api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         message.warning("Сессия истекла, требуется повторная авторизация");

//         window.location.href = "/login";

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     if (!url.includes("/auth/staff/login/")) {
//       message.error(
//         error.response?.data?.error || error.response?.statusText || "Произошла ошибка",
//       );
//     }

//     return Promise.reject(error);
//   },
// );

// export default $api;
