import { QueryClient } from "@tanstack/react-query";

import { TTL } from "@/shared/utils";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: TTL.MINUTE,
        gcTime: TTL.FIVE_MINUTES,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
