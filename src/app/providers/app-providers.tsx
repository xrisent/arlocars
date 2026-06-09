"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { App, ConfigProvider } from "antd";
import { Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useState } from "react";

import { createQueryClient } from "@/shared/api/query-client";
import { mainTheme } from "@/shared/assets/themes";
import { globalStore } from "@/shared/lib/store";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <JotaiProvider store={globalStore}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ConfigProvider theme={mainTheme}>
            <App>{children}</App>
          </ConfigProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </JotaiProvider>
  );
};
