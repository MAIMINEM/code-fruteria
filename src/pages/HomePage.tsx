import React, { useState, FC, useEffect } from "react";
import ResizableDraggablePanel from "../components/ResizableDraggablePanel";
import { MainWorkspace } from "../components/MainWorkspace";
import UserProfile from "../components/UserProfile";
import { panelList } from "../panelList";
import { getGridCellPosition } from "../utils/utils";
import { useThemeStore } from "../store/themeStore";
import { useDragAndDrop } from "./useDragAndDrop";
import { NAV_BAR_HEIGHT, INACTIVITY_LIMIT, THEME_KEY, GRID_COLS, GRID_ROWS } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
/**
 * Represents an open panel's state and position.
 */
type OpenPanel = {
  id: string;
  key: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Main application component.
 */
const HomePage: FC = () => {
  const [openPanels, setOpenPanels] = useState<OpenPanel[]>([]);
  const [navOpen, setNavOpen] = useState<boolean>(true);

  // Use extracted drag-and-drop hook
  const {
    onNavDragStart,
    handleGridDropInfo,
    onMainDrop,
    onMainDragOver,
    dragNavPanelKey,
    setDragNavPanelKey,
    dropCell,
    containerSize,
    setDropCell,
    setContainerSize,
  } = useDragAndDrop({
    panelList,
    openPanels,
    setOpenPanels,
    NAV_BAR_HEIGHT,
    getGridCellPosition,
  });
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  // ...drag and drop logic is now handled by useDragAndDrop

  /**
   * Closes a panel by id.
   */
  const handleClose = (id: string) => {
    setOpenPanels(openPanels.filter((p) => p.id !== id));
  };

  /**
   * Moves a panel by delta x and y.
   */
  const handlePanelMove = (id: string, dx: number, dy: number) => {
    setOpenPanels((panels) => panels.map((p) => (p.id === id ? { ...p, x: p.x + dx, y: p.y + dy } : p)));
  };

  /**
   * Resizes a panel by delta width and height.
   */
  const handlePanelResize = (id: string, dw: number, dh: number) => {
    setOpenPanels((panels) =>
      panels.map((p) =>
        p.id === id
          ? {
              ...p,
              width: Math.max(200, p.width + dw),
              height: Math.max(100, p.height + dh),
            }
          : p
      )
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken") === null) {
      // User is not logged in, redirect to login page
      navigate("/login");
    }
  });

  // Inactivity logout timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("authToken");
      }, INACTIVITY_LIMIT);
    };

    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (timer) clearTimeout(timer);
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  // Theme class is now handled by zustand theme store effect

  // Theme toggle now uses zustand
  const handleThemeToggle = toggleTheme;

  return (
    <div className={`app-root theme-${theme}`} style={{ display: "flex", height: "100vh" }}>
      {/* Navigation Bar */}
      {navOpen && (
        <Sidebar
          panelList={panelList}
          dragNavPanelKey={dragNavPanelKey}
          onNavDragStart={onNavDragStart}
          setDragNavPanelKey={setDragNavPanelKey}
        />
      )}

      {/* Panel Area */}
      <MainWorkspace
        onDrop={onMainDrop}
        onDragOver={onMainDragOver}
        onGridDropInfo={handleGridDropInfo}
        gridRows={GRID_ROWS}
        gridCols={GRID_COLS}
      >
        <main
          style={{
            flex: 1,
            position: "relative",
            background: "var(--background-color)",
            overflow: "hidden",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Top nav branding */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
              color: "#fff",
              padding: "0.5rem 1.5rem",
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: 1,
              position: "sticky",
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
              <UserProfile
                onLogout={() => {
                  localStorage.removeItem("authToken");

                  navigate("/login"); // Redirect to login page after logout
                }}
                onThemeToggle={handleThemeToggle}
                theme={theme}
              />
            </div>
          </div>

          {openPanels.length === 0 ? (
            <div style={{ color: "var(--text-color)", textAlign: "center", marginTop: "2rem" }}>
              No panels open.
              <br />
              Drag one from the navigation bar.
            </div>
          ) : (
            openPanels.map((panel) => (
              <ResizableDraggablePanel
                key={panel.id}
                {...panel}
                onClose={() => handleClose(panel.id)}
                onMove={(dx, dy) => handlePanelMove(panel.id, dx, dy)}
                onResize={(dw, dh) => handlePanelResize(panel.id, dw, dh)}
                // Add a prop to indicate dragging for overlay z-index if needed
              />
            ))
          )}
        </main>
      </MainWorkspace>
    </div>
  );
};

export default HomePage;
