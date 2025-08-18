import React from "react";

interface ThemeToggleButtonProps {
  theme: string;
  onToggle: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
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
);

export default ThemeToggleButton;
