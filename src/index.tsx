import "antd/dist/reset.css";
import "../styles/theme.less";
import React, { useState, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./pages/LoginPage";
import App from "./app";
import "@ant-design/v5-patch-for-react-19";
import { isLoggedIn } from "./utils/utils";

/**
 * Root component that handles login state.
 */
const Root: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    // Listen for login event from LoginComponent
    const handler = () => setLoggedIn(isLoggedIn());
    window.addEventListener("login-success", handler);
    return () => window.removeEventListener("login-success", handler);
  }, []);

  if (!loggedIn) {
    return <LoginPage />;
  }
  return <App />;
};

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Root />
    </StrictMode>
  );
}

// Patch LoginComponent to set login flag and dispatch event
// (You can move this logic inside LoginComponent if you prefer)
const origLoginComponent = LoginPage;
(LoginPage as any) = (props: any) => {
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);
  return React.createElement(origLoginComponent, {
    ...props,
    onLoginSuccess: () => {
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("login-success"));
      forceUpdate();
    },
  });
};
