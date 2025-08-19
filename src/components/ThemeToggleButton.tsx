import React from "react";
import SunIcon from "../assets/Icons/SunIcon";
import MoonIcon from "../assets/Icons/MoonIcon";

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
      <SunIcon />
    ) : (
      // Moon icon
      <MoonIcon />
    )}
  </button>
);

export default ThemeToggleButton;
