import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import LandingPage from "./routes/landing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
