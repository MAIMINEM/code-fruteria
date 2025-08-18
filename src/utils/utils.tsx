import { GRID_COLS, GRID_ROWS, THEME_KEY } from "../constants/constants";

/**
 * Calculates the position and size of a grid cell.
 * @param row Row index
 * @param col Column index
 * @param containerWidth Width of the container
 * @param containerHeight Height of the container
 * @param navBarHeight Height of the navigation bar
 */

const getGridCellPosition = (
  row: number,
  col: number,
  containerWidth: number,
  containerHeight: number,
  navBarHeight: number
) => {
  const cellWidth = containerWidth / GRID_COLS;
  const cellHeight = containerHeight / GRID_ROWS;
  return {
    x: Math.round(col * cellWidth),
    y: Math.round(row * cellHeight + navBarHeight),
    width: Math.round(cellWidth),
    height: Math.round(cellHeight),
  };
};

/**
 * Returns the default position and size for a new panel.
 * @param count Number of currently open panels
 */
const getDefaultPanelPosition = (count: number) => ({
  x: 60 + count * 40,
  y: 60 + count * 40,
  width: 700,
  height: 420,
});

/**
 * Gets the initial theme from localStorage or prompts the user.
 * @returns {'dark' | 'light'}
 */
const getInitialTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);

  console.log("Stored theme:", stored);
  if (stored === "dark" || stored === "light") return stored;
  // Ask user if not set
  const userPref = window.confirm("Use dark theme? Click OK for dark, Cancel for light.");
  const theme = userPref ? "dark" : "light";
  localStorage.setItem(THEME_KEY, theme);

  console.log("Set theme:", theme);
  return theme;
};

export { getGridCellPosition, getDefaultPanelPosition, getInitialTheme };
