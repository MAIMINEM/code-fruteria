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

// Utility to monitor user activity and call a callback on inactivity
// Usage: const stop = monitorUserActivity(() => { ... }, 5 * 60 * 1000)
// Call stop() to remove listeners and clear timer

function monitorUserActivity(onInactive: () => void, timeout: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(onInactive, timeout);
  };

  const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
  activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
  resetTimer();

  return function stop() {
    if (timer) clearTimeout(timer);
    activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
  };
}

export { getGridCellPosition, getDefaultPanelPosition, monitorUserActivity };
