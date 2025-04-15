import { render } from "@testing-library/react";
import { Alert } from "antd";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ReactElement } from "react";

export const renderWithProvider = (ui: ReactElement) => {
  const queryClient = new QueryClient();
  const { ErrorBoundary } = Alert;
  return render(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ErrorBoundary>
  );
};
