import "antd/dist/reset.css";
import "../styles/theme.less";
import React, { useState, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./pages/LoginPage";
import App from "./app";
import "@ant-design/v5-patch-for-react-19";
import { isLoggedIn } from "./utils/utils";
import { RouterProvider } from "react-router-dom";
import { default as AxiosClient } from "axios";
import AppRoutes from "./routes/AppRoutes";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <RouterProvider router={AppRoutes} />
    </React.StrictMode>
  );
}

/**
 * Root component that handles login state.
 */

// const Root: React.FC = () => {
//   const [loggedIn, setLoggedIn] = useState(isLoggedIn());

//   useEffect(() => {
//     AxiosClient.get("http://localhost:3000/auth/hello").then((response) => {
//       console.log(response.data);
//     });
//   }, []);

//   useEffect(() => {
//     // Listen for login event from LoginComponent
//     const handler = () => setLoggedIn(isLoggedIn());
//     window.addEventListener("login-success", handler);
//     return () => window.removeEventListener("login-success", handler);
//   }, []);

//   if (!loggedIn) {
//     return <LoginPage />;
//   }
//   return <App />;
// };

// const container = document.getElementById("root");

// if (container) {
//   const root = createRoot(container);
//   root.render(
//     <StrictMode>
//       <BrowserRouter>
//         <Root />
//       </BrowserRouter>
//     </StrictMode>
//   );
// }

// // Patch LoginComponent to set login flag and dispatch event
// // (You can move this logic inside LoginComponent if you prefer)
// const origLoginComponent = LoginPage;
// (LoginPage as any) = (props: any) => {
//   const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);
//   return React.createElement(origLoginComponent, {
//     ...props,
//     onLoginSuccess: () => {
//       localStorage.setItem("isLoggedIn", "true");
//       window.dispatchEvent(new Event("login-success"));
//       forceUpdate();
//     },
//   });
// };
