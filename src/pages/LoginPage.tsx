import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Button, Alert, Card } from "antd";
import APIClient from "../Network/APIClient";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";
import ThemeToggleButton from "../components/ThemeToggleButton";
import "./LoginPage.less";
import { AuthFormValues, UserRegister, UserLogin } from "../Network/Auth";

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
    try {
      const values = await form.validateFields();
      setLoading(true);
      const result = await UserRegister(values);
      if (result.success) {
        setSuccessMsg("Registration successful. You can now log in.");
      } else {
        setErrorMsg(result.message);
      }
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
      const result = await UserLogin(values);
      if (result.success) {
        navigate("/app");
      } else {
        setErrorMsg(result.message);
      }
      setLoading(false);
    },
    [form]
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
