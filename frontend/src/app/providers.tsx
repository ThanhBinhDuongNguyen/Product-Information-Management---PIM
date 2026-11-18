"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { useState, type ReactNode } from "react";
import { store } from "@/store/store";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <ReduxProvider store={store}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></ReduxProvider>;
}
