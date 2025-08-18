import React, { useState, DragEvent, FC, useEffect } from "react";
import ResizableDraggablePanel from "./components/ResizableDraggablePanel";
import TermsIcon from "./assets/Icons/TermsIcon";
import AboutIcon from "./assets/Icons/AboutIcon";
import FruitViewIcon from "./assets/Icons/FruitViewIcon";
import { MainWorkspace } from "./components/MainWorkspace";
import UserProfile from "./components/UserProfile";
import { panelList } from "./panelList";
import { getInitialTheme, getGridCellPosition } from "./utils/utils";
import { NAV_BAR_HEIGHT, INACTIVITY_LIMIT, THEME_KEY, GRID_COLS, GRID_ROWS } from "./constants/constants";
import { isLoggedIn } from "./utils/utils";
import { Navigate, useNavigate } from "react-router-dom";

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
const App: FC = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [openPanels, setOpenPanels] = useState<OpenPanel[]>([]);
  const [dragNavPanelKey, setDragNavPanelKey] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [dropCell, setDropCell] = useState<{ row: number; col: number } | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme());

  // Drag from nav: set key in dataTransfer
  /**
   * Handles drag start from the navigation bar.
   * @param key Panel key
   */
  const onNavDragStart = (key: string) => (e: DragEvent<HTMLLIElement>) => {
    setDragNavPanelKey(key);
    e.dataTransfer.setData("panelKey", key);
  };

  /**
   * Called by MainWorkspace to update container size and drop cell.
   */
  const handleGridDropInfo = (info: {
    cell: { row: number; col: number } | null;
    size: { width: number; height: number };
  }) => {
    setDropCell(info.cell);
    setContainerSize(info.size);
  };

  /**
   * Handles drop event on the main workspace to open a new panel.
   */
  const onMainDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const key = e.dataTransfer.getData("panelKey");
    if (!key) return;
    const panelDef = panelList.find((p) => p.key === key);
    if (!panelDef) return;
    const id = `${key}-${Date.now()}`;
    let x = 60,
      y = NAV_BAR_HEIGHT + 10,
      width = 700,
      height = 420;
    if (dropCell && containerSize.width && containerSize.height) {
      // Subtract nav bar height from available height for grid
      const availableHeight = containerSize.height - NAV_BAR_HEIGHT;
      const pos = getGridCellPosition(dropCell.row, dropCell.col, containerSize.width, availableHeight, NAV_BAR_HEIGHT);
      // Clamp width/height to not exceed window
      width = Math.min(pos.width, containerSize.width);
      height = Math.min(pos.height, availableHeight);
      x = pos.x;
      y = pos.y;
    }
    setOpenPanels([
      ...openPanels,
      {
        id,
        key: panelDef.key,
        title: panelDef.title,
        content: panelDef.content,
        x,
        y,
        width,
        height,
      },
    ]);
    setDragNavPanelKey(null);
  };

  /**
   * Handles drag over event on the main workspace.
   */
  const onMainDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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
    if (!loggedIn) {
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
        localStorage.removeItem("isLoggedIn");
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

  // Set theme class on body or root
  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  /**
   * Toggles the application theme between dark and light.
   */
  const handleThemeToggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  };

  return (
    <div className={`app-root theme-${theme}`} style={{ display: "flex", height: "100vh" }}>
      {/* Navigation Bar */}
      {navOpen && (
        <nav
          style={{
            width: 90, // Increased width
            background: "#232b3e",
            padding: "0.5rem 0.25rem",
            borderRight: "1px solid #3e4a6b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 90, // Increased minWidth
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
                  textAlign: "center", // Center text
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
                    textAlign: "center", // Center text
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
            background: "#232b3e",
            overflow: "hidden",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Top nav branding */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #2b3556 0%, #3e4a6b 100%)",
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
              borderBottom: "1px solid #3e4a6b",
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
                  localStorage.removeItem("isLoggedIn");
                  // window.dispatchEvent(new Event("login-success"));
                  navigate("/login"); // Redirect to login page after logout
                }}
                onThemeToggle={handleThemeToggle}
                theme={theme}
              />
            </div>
          </div>
          {openPanels.length === 0 ? (
            <div style={{ color: "#888", textAlign: "center", marginTop: "2rem" }}>
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

export default App;
