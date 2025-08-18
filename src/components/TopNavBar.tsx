import React from "react";
import UserProfile from "./UserProfile";
import { NAV_BAR_HEIGHT } from "../constants/constants";

interface TopNavBarProps {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ navOpen, setNavOpen }) => (
  <div
    style={{
      width: "100%",
      background: "linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
      color: "#fff",
      padding: "0.5rem 1.5rem",
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: 1,
      position: "sticky" as React.CSSProperties["position"],
      top: 0,
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 8px #0002",
      minHeight: NAV_BAR_HEIGHT,
      borderBottom: "1px solid var(--secondary-color)",
    }}
  >
    {/* Hamburger/X icon */}
    <button
      onClick={() => setNavOpen((v) => !v)}
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        fontSize: 26,
        cursor: "pointer",
        marginRight: 20,
        display: "flex",
        alignItems: "center",
        padding: 0,
        height: 40,
        width: 40,
        borderRadius: 8,
        transition: "background 0.2s",
        boxShadow: navOpen ? "0 2px 8px #0002" : undefined,
      }}
      aria-label="Toggle navigation"
    >
      <span style={{ display: "inline-block", width: 28, height: 28 }}>
        {navOpen ? (
          // X icon
          <svg width="28" height="28" viewBox="0 0 28 28">
            <line x1="7" y1="7" x2="21" y2="21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="21" y1="7" x2="7" y2="21" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          // Hamburger icon
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect y="6" width="28" height="3" rx="1.5" fill="#fff" />
            <rect y="13" width="28" height="3" rx="1.5" fill="#fff" />
            <rect y="20" width="28" height="3" rx="1.5" fill="#fff" />
          </svg>
        )}
      </span>
    </button>
    {/* App title */}
    <span
      style={{
        fontFamily: "monospace",
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 2,
        color: "#fff",
        textShadow: "0 1px 2px #0006",
        userSelect: "none",
        textTransform: "uppercase",
      }}
    >
      fruteria
    </span>
    {/* Spacer to push UserProfile to the right */}
    <div style={{ flex: 1 }} />
    {/* UserProfile on the right */}
    <div style={{ marginRight: 32 }}>
      <UserProfile />
    </div>
  </div>
);

export default TopNavBar;
