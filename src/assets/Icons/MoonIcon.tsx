import React from "react";

const MoonIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 18.5C20.5 19.5 18.5 20 16.5 20C11.5 20 7.5 16 7.5 11C7.5 9 8 7 9 5.5C5.5 7.5 3 11 3 15C3 20 7.5 24.5 13 24.5C17 24.5 20.5 22 22 18.5Z"
      fill="#333"
    />
    <circle cx="14" cy="14" r="10.5" stroke="#333" strokeWidth="2" />
  </svg>
);

export default MoonIcon;
