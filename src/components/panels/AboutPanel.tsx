import React from "react";
import "./AboutPanel.less"; // Assuming you have a CSS file for styling

/**
 * AboutPanel displays information about the application.
 */
const AboutPanel: React.FC = () => (
  <div className="about-panel">
    <h2 className="about-panel-title">About</h2>
    <div className="about-panel-content">
      <p>
        Welcome to <b>fruteria</b>!<br />
        This is a playful trading app for fruit, built with React.
        <br />
        Drag panels from the sidebar to explore features.
        <br />
        <br />
        <i>Made with 🍌 and ❤️</i>
      </p>
    </div>
  </div>
);

export default AboutPanel;
