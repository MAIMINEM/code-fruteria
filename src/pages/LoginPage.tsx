import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Button, Alert, Card } from "antd";
import APIClient from "../Network/APIClient";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";
import ThemeToggleButton from "../components/ThemeToggleButton";
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
    <div id="login-page" className="login-page">
      <ThemeToggleButton theme={theme} onToggle={handleThemeChange} />
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
