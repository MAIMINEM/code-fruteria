import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// add for antD compatible with React 19
import "@ant-design/v5-patch-for-react-19";
import "../styles/theme.less";

// using react-router to manage page routers and navigation
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <RouterProvider router={AppRoutes} />
    </React.StrictMode>
  );
}
