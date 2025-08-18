import UserPopover from "./UserPopover";
import React, { useState } from "react";
import { Button, Typography, Switch } from "antd";
// Use canonical AntD import for Typography.Text
// const { Text } = Typography;
import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";

// Styles
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

// Add these props to the component's props type/interface:
interface UserProfileProps {
  // onLogout: () => void;
  onThemeToggle?: () => void;
  theme?: "dark" | "light";
}

interface UserPopoverProps {
  userInfo: { name: string; email: string };
  onLogout: () => void;
  onCancel: () => void;
  onThemeToggle?: () => void;
  theme?: "dark" | "light";
}

// Update the component signature:
const UserProfile: React.FC<UserProfileProps> = () => {
  const [showPopover, setShowPopover] = useState(false);

  // You can fetch/display real user info here if available
  const userInfo = {
    name: "User",
    email: "user@email.com",
  };

  const handlePopoverVisibility = () => {
    setShowPopover(!showPopover);
  };

  // ...UserPopover is now imported from its own file

  return (
    <div
      className="top-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* ...existing code for left/middle of top bar... */}
      <div style={{ marginLeft: "auto" }}>
        <Button
          shape="circle"
          icon={<UserOutlined />}
          onClick={handlePopoverVisibility}
          style={{
            background: "#232634",
            border: "1px solid #35394a",
            color: "#b0b4c1",
          }}
        />
      </div>
      {showPopover && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(23, 25, 34, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onClick={handlePopoverVisibility}
        >
          <div style={{ pointerEvents: "auto" }} onClick={(e) => e.stopPropagation()}>
            <UserPopover userInfo={userInfo} onCancel={handlePopoverVisibility} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
