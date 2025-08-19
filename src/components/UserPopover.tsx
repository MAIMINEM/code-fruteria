import React from "react";
import { useThemeStore } from "../store/themeStore";
import { Button, Typography, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const popoverContainerStyle: React.CSSProperties = {
  minWidth: 280,
  padding: 28,
  background: "#232634",
  borderRadius: 14,
  boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
  textAlign: "center",
  color: "#f5f6fa",
  border: "1px solid #2e3244",
  position: "relative",
};

const logoutButtonStyle: React.CSSProperties = {
  background: "#e74c3c",
  borderColor: "#e74c3c",
  color: "#fff",
  fontWeight: 500,
  borderRadius: 8,
};

const cancelButtonStyle: React.CSSProperties = {
  marginTop: 10,
  background: "transparent",
  border: "1px solid #35394a",
  color: "#b0b4c1",
  borderRadius: 8,
};

const dividerStyle: React.CSSProperties = {
  margin: "20px 0 16px 0",
  borderTop: "1px solid #35394a",
};

const themeSwitchStyle: React.CSSProperties = {
  marginLeft: 8,
  marginTop: 16,
  display: "inline-block",
};

export interface UserPopoverProps {
  userInfo: { name: string; email: string };
  //   onLogout: () => void;
  onCancel: () => void;
}

const UserPopover: React.FC<UserPopoverProps> = ({ userInfo, onCancel }) => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    onCancel();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div style={popoverContainerStyle}>
      <Typography.Text strong style={{ fontSize: 18, color: "#f5f6fa" }}>
        {userInfo.name}
      </Typography.Text>
      <br />
      <Typography.Text type="secondary" style={{ fontSize: 14, color: "#b0b4c1" }}>
        {userInfo.email}
      </Typography.Text>

      <div style={dividerStyle} />
      <div style={{ marginBottom: 16, fontSize: 15, color: "#b0b4c1" }}>Do you want to log out?</div>
      <Button type="primary" block style={logoutButtonStyle} onClick={handleLogout}>
        Log out
      </Button>
      <Button block style={cancelButtonStyle} onClick={onCancel}>
        Cancel
      </Button>
      <div style={themeSwitchStyle}>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={theme === "dark"}
          onChange={toggleTheme}
          defaultChecked={theme === "dark"}
        />
        <span style={{ marginLeft: 8, color: "#b0b4c1", fontSize: 14 }}>
          {theme === "dark" ? "Light" : "Dark"} Theme
        </span>
      </div>
    </div>
  );
};

export default UserPopover;
