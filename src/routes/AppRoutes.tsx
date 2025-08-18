import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFoundPage";

const AppRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/app",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
]);

export default AppRoutes;
