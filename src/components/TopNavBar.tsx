import React from "react";
import UserProfile from "./UserProfile";
import "./TopNavBar.less";

interface TopNavBarProps {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ navOpen, setNavOpen }) => (
  <div className="top-navbar">
    {/* Hamburger/X icon */}
    <button
      className={`top-navbar-toggle${navOpen ? " open" : ""}`}
      onClick={() => setNavOpen((v) => !v)}
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
  <span className="top-navbar-title">fruteria</span>
    {/* Spacer to push UserProfile to the right */}
  <div className="top-navbar-spacer" />
    {/* UserProfile on the right */}
    <div className="top-navbar-profile">
      <UserProfile />
    </div>
  </div>
);

export default TopNavBar;
