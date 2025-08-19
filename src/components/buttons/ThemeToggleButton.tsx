import React from "react";
import SunIcon from "../../assets/Icons/SunIcon";
import MoonIcon from "../../assets/Icons/MoonIcon";
import "./ThemeToggleButton.less";

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
  >
    {theme === "dark" ? <SunIcon /> : <MoonIcon />}
  </button>
);

export default ThemeToggleButton;
