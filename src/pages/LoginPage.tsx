import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Alert, Card } from "antd";
import "./LoginPage.less";

type LoginComponentProps = {
  onLoginSuccess?: () => void;
};

const LoginPage: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const [theme, setTheme] = useState("light");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    localStorage.setItem("theme", theme);

    console.log(`Theme changed to ${theme}`);
  };

  const onFinish = (values: any) => {
    const { username, password } = values;
    if (username === "admin" && password === "1234") {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setErrorMsg("Invalid credentials");
    }
  };

  return (
    <div id="login-component" className="login-page">
      <button onClick={handleThemeChange} className="theme-toggle-button">
        Toggle Theme
      </button>
      <Card className="login-card">
        <label className="typography">Login</label>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label={<span className="login-label">Username</span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input autoFocus className="login-input" placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label={<span className="login">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="login-input" placeholder="Enter your password" />
          </Form.Item>
          {errorMsg && (
            <Form.Item>
              <Alert message={errorMsg} type="error" showIcon />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
