import React, { useCallback } from "react";
import { useThemeStore } from "../../store/themeStore";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "../buttons/ThemeToggleButton";
import "./UserPopover.less";

import Button from "antd/es/button";
import Text from "antd/es/typography/Text";
import "antd/es/button/style";
import "antd/es/typography/style";
import { UserInfo } from "../../models/models";

export interface UserPopoverProps {
  userInfo: UserInfo;
  onCancel: () => void;
}

const UserPopover: React.FC<UserPopoverProps> = ({ userInfo, onCancel }) => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  // Theme toggle
  const handleThemeChange = useCallback(() => toggleTheme(), [toggleTheme]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    onCancel();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="user-popover-container">
      <Text strong className="user-popover-title">
        {userInfo.name}
      </Text>
      <br />
      <Text strong className="user-popover-email">
        {userInfo.email}
      </Text>
      <div className="user-popover-divider" />
      <div className="user-popover-logout-text">Do you want to log out?</div>
      <Button type="primary" block className="user-popover-logout-btn" onClick={handleLogout}>
        Log out
      </Button>
      <Button block className="user-popover-cancel-btn" onClick={onCancel}>
        Cancel
      </Button>
      <div className="user-popover-theme-toggle">
        <ThemeToggleButton theme={theme} onToggle={handleThemeChange} />
      </div>
    </div>
  );
};

export default UserPopover;
