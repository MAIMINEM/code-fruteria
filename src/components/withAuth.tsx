import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Example: check localStorage for login status
function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

export function withAuth<T>(WrappedComponent: ComponentType<T>) {
  const AuthComponent: React.FC<T> = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/login");
      }
    }, [navigate]);
    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };
  return AuthComponent;
}
