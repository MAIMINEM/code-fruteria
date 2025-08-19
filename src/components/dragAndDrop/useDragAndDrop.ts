import { useState, useCallback } from "react";
import { DragEvent } from "react";

import antdMessage from "antd/es/message";
import "antd/es/message/style";

import { getDefaultPanelPosition, generateUniqueKey } from "../../utils/utils";

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

interface UseDragAndDropProps {
  panelList: any[];
  openPanels: OpenPanel[];
  setOpenPanels: (panels: OpenPanel[]) => void;
  NAV_BAR_HEIGHT: number;
  getGridCellPosition: (
    row: number,
    col: number,
    width: number,
    height: number,
    navBarHeight: number
  ) => { x: number; y: number; width: number; height: number };
}

/**
 * Custom hook for drag-and-drop panel management in a grid workspace.
 * Handles drag events from the nav, drop logic, and panel positioning.
 */
export function useDragAndDrop({
  panelList,
  openPanels,
  setOpenPanels,
  NAV_BAR_HEIGHT,
  getGridCellPosition,
}: UseDragAndDropProps) {
  // Key of the panel currently being dragged from the nav
  const [dragNavPanelKey, setDragNavPanelKey] = useState<string | null>(null);
  // The grid cell (row, col) where the panel is being dropped
  const [dropCell, setDropCell] = useState<{ row: number; col: number } | null>(null);
  // The size of the grid container (used for calculating drop positions)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  /**
   * Handler for starting a drag from the nav panel list.
   * Sets the drag key and attaches it to the drag event.
   */
  const onNavDragStart = useCallback(
    (key: string) => (e: DragEvent<HTMLLIElement>) => {
      setDragNavPanelKey(key);
      e.dataTransfer.setData("panelKey", key);
    },
    []
  );

  /**
   * Handler for updating drop cell and container size during drag-over.
   * Only updates state if values actually change.
   */
  const handleGridDropInfo = useCallback(
    (info: { cell: { row: number; col: number } | null; size: { width: number; height: number } }) => {
      setDropCell((prev) => (prev?.row !== info.cell?.row || prev?.col !== info.cell?.col ? info.cell : prev));
      setContainerSize((prev) =>
        prev.width !== info.size.width || prev.height !== info.size.height ? info.size : prev
      );
    },
    []
  );

  /**
   * Handler for dropping a panel onto the main workspace.
   * Calculates position and size, prevents duplicate panels, and adds the new panel.
   */
  const onMainDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const key = e.dataTransfer.getData("panelKey");
      if (!key) return;
      const panelDef = panelList.find((p) => p.key === key);
      if (!panelDef) return;
      // Prevent opening duplicate panels
      if (openPanels.some((p) => p.key === panelDef.key)) {
        setDragNavPanelKey(null);
        antdMessage.error(`${panelDef.title} is already open.`);
        return;
      }

      // Generate unique panel id
      const id = generateUniqueKey(key);

      // Default position if not dropped on a grid cell
      let { x, y, width, height } = getDefaultPanelPosition(openPanels.length);

      // If dropped on a grid cell, calculate position and size
      if (dropCell && containerSize.width && containerSize.height) {
        const availableHeight = containerSize.height - NAV_BAR_HEIGHT;
        const pos = getGridCellPosition(
          dropCell.row,
          dropCell.col,
          containerSize.width,
          availableHeight,
          NAV_BAR_HEIGHT
        );
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
    },

    [panelList, openPanels, setOpenPanels, NAV_BAR_HEIGHT, getGridCellPosition, dropCell, containerSize]
  );

  /**
   * Handler for drag-over event on the main workspace.
   * Prevents default to allow drop.
   */
  const onMainDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // Expose handlers and state for use in the workspace
  return {
    onNavDragStart, // Handler for nav drag start
    handleGridDropInfo, // Handler for grid drop info update
    onMainDrop, // Handler for main drop
    onMainDragOver, // Handler for main drag over
    dragNavPanelKey, // Currently dragged nav panel key
    setDragNavPanelKey, // Setter for dragNavPanelKey
    dropCell, // Current drop cell
    containerSize, // Current container size
    setDropCell, // Setter for dropCell
    setContainerSize, // Setter for containerSize
  };
}
