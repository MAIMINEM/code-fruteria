import React, { useEffect } from "react";
import TermsIcon from "../assets/Icons/TermsIcon";
import AboutIcon from "../assets/Icons/AboutIcon";
import FruitViewIcon from "../assets/Icons/FruitViewIcon";
interface SideNavBarProps {
  isOpen: boolean;
  panelList: any[];
  dragNavPanelKey: string | null;
  onNavDragStart: (key: string) => (e: React.DragEvent<HTMLLIElement>) => void;
  setDragNavPanelKey: (key: string | null) => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
  isOpen,
  panelList,
  dragNavPanelKey,
  onNavDragStart,
  setDragNavPanelKey,
}) => {
  return (
    <>
      {isOpen && (
        <nav
          style={{
            width: 90,
            background: "#232b3e",
            padding: "0.5rem 0.25rem",
            borderRight: "1px solid #3e4a6b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 90,
            boxSizing: "border-box",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {panelList.map((panel) => (
              <li
                key={panel.key}
                style={{
                  marginBottom: 16,
                  cursor: "grab",
                  fontWeight: "normal",
                  background: dragNavPanelKey === panel.key ? "#353b4a" : undefined,
                  padding: 8,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "#e0e0e0",
                  width: "100%",
                  transition: "background 0.2s",
                  textAlign: "center",
                  minHeight: 64,
                }}
                draggable
                onDragStart={onNavDragStart(panel.key)}
                onDragEnd={() => setDragNavPanelKey(null)}
                title={panel.title}
              >
                <span style={{ marginBottom: 4 }}>
                  {panel.key === "fruitbook" ? (
                    <TermsIcon />
                  ) : panel.key === "fruitview" ? (
                    <FruitViewIcon />
                  ) : panel.key === "about" ? (
                    <AboutIcon />
                  ) : null}
                </span>
                <span
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                  }}
                >
                  {panel.title}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default React.memo(SideNavBar);
