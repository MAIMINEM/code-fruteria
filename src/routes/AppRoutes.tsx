import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";

const AppRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <NotFound />,
  },
]);

export default AppRoutes;
