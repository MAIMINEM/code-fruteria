import React, { useState, FC, useEffect, useCallback } from "react";
import ResizableDraggablePanel from "../components/ResizableDraggablePanel";
import { MainWorkspace } from "../components/MainWorkspace";
import UserProfile from "../components/UserProfile";
import TopNavBar from "../components/TopNavBar";
import { panelList } from "../panelList";
import { getGridCellPosition } from "../utils/utils";
import { useThemeStore } from "../store/themeStore";
import { useDragAndDrop } from "../components/useDragAndDrop";
import { NAV_BAR_HEIGHT, INACTIVITY_LIMIT, THEME_KEY, GRID_COLS, GRID_ROWS } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideNavBar";

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
  const [navOpen, setNavOpen] = useState(true);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));

  const theme = useThemeStore((s) => s.theme);
  const navigate = useNavigate();

  // Memoized handlers for panel actions
  const handleClose = React.useCallback((id: string) => {
    setOpenPanels((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handlePanelMove = React.useCallback((id: string, dx: number, dy: number) => {
    setOpenPanels((panels) => panels.map((p) => (p.id === id ? { ...p, x: p.x + dx, y: p.y + dy } : p)));
  }, []);

  const handlePanelResize = React.useCallback((id: string, dw: number, dh: number) => {
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
  }, []);

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

  useEffect(() => {
    if (authToken == null) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  // Inactivity logout timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("authToken");
        setAuthToken(null);
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
          <TopNavBar navOpen={navOpen} setNavOpen={setNavOpen} />

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
