import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Button, Alert, Card } from "antd";
import APIClient from "../Network/APIClient";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";
import "./LoginPage.less";

interface AuthFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = React.memo(() => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm<AuthFormValues>();

  // Theme toggle
  const handleThemeChange = useCallback(() => toggleTheme(), [toggleTheme]);

  // Registration handler
  const handleRegister = useCallback(async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const values = await form.validateFields();
      await APIClient.post("/register", values);
      setSuccessMsg("Registration successful. You can now log in.");
    } catch (err: any) {
      if (err?.errorFields) return; // Validation error
      setErrorMsg(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }, [form]);

  // Login handler
  const handleLogin = useCallback(
    async (values: AuthFormValues) => {
      setErrorMsg(null);
      setSuccessMsg(null);
      setLoading(true);
      try {
        const res = await APIClient.post("/login", values);
        const { token } = res.data;
        if (token) {
          localStorage.setItem("authToken", token);
          navigate("/app");
        } else {
          setErrorMsg("Login failed: No token returned");
        }
      } catch (err: any) {
        setErrorMsg(err?.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <div id="login-component" className="login-page">
      <button
        onClick={handleThemeChange}
        className="theme-toggle-button react-theme-toggle"
        type="button"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 0,
        }}
      >
        {theme === "dark" ? (
          // Sun icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="6" fill="#FFD600" />
            <g stroke="#FFD600" strokeWidth="2">
              <line x1="14" y1="2" x2="14" y2="6" />
              <line x1="14" y1="22" x2="14" y2="26" />
              <line x1="2" y1="14" x2="6" y2="14" />
              <line x1="22" y1="14" x2="26" y2="14" />
              <line x1="5.1" y1="5.1" x2="7.9" y2="7.9" />
              <line x1="20.1" y1="20.1" x2="22.9" y2="22.9" />
              <line x1="5.1" y1="22.9" x2="7.9" y2="20.1" />
              <line x1="20.1" y1="7.9" x2="22.9" y2="5.1" />
            </g>
          </svg>
        ) : (
          // Moon icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 18.5C20.5 19.5 18.5 20 16.5 20C11.5 20 7.5 16 7.5 11C7.5 9 8 7 9 5.5C5.5 7.5 3 11 3 15C3 20 7.5 24.5 13 24.5C17 24.5 20.5 22 22 18.5Z"
              fill="#333"
            />
            <circle cx="14" cy="14" r="10.5" stroke="#333" strokeWidth="2" />
          </svg>
        )}
      </button>
      <Card className="login-card">
        <label className="typography">Login</label>
        <Form form={form} layout="vertical" autoComplete="off" onFinish={handleLogin}>
          <Form.Item
            label={<span className="form-label">Username</span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input autoFocus className="login-input" placeholder="Enter your username..." />
          </Form.Item>
          <Form.Item
            label={<span className="form-label">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="login-input" placeholder="Enter your password..." />
          </Form.Item>
          {(errorMsg || successMsg) && (
            <Form.Item>
              {errorMsg && <Alert message={errorMsg} type="error" showIcon />}
              {successMsg && <Alert message={successMsg} type="success" showIcon />}
            </Form.Item>
          )}
          <Form.Item>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Button
                type="primary"
                block
                className="login-button"
                onClick={handleRegister}
                loading={loading}
                disabled={loading}
              >
                Register
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="login-button"
                loading={loading}
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
});

export default LoginPage;
