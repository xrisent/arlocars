export const QUERY_KEYS = {
  CARS: {
    BASE: ["car"],
    LIST: ["car", "list"],
    DETAIL: (id: number) => ["car", "detail", id] as const,
  },
  CATEGORIES: {
    BASE: ["category"],
    LIST: ["category", "list"],
  },
};
