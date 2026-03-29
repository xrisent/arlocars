"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Provider as JotaiProvider } from "jotai";
import { useState } from "react";

import { createQueryClient } from "@/shared/api/query-client";
import { mainTheme } from "@/shared/assets/themes";

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
};
