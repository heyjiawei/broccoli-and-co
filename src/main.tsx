import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Alert } from "antd";
import LandingPage from "./routes/landing-page";
import "./index.css";

const { ErrorBoundary } = Alert;

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
