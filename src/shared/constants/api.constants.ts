export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REFRESH: "/api/auth/refresh",
  },
  CARS: {
    BASE: "/api/cars/",
    BY_ID: (id: number) => `/api/cars/${id}`,
  },
  CATEGORIES: {
    BASE: "/api/categories",
    BY_ID: (id: number) => `/api/categories/${id}`,
  },
  CONTACT: "/api/contact",
  SELL_YOUR_CAR: "/api/sell-your-car",
};
