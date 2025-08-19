import React from "react";

const SunIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
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
);

export default SunIcon;
