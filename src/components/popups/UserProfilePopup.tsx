import UserPopover from "./UserPopover";
import React, { useState } from "react";

import { UserOutlined } from "@ant-design/icons";

import Button from "antd/es/button";
import "antd/es/button/style";

// Update the component signature:
const UserProfilePopup: React.FC = () => {
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

export default UserProfilePopup;
