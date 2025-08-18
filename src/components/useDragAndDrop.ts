import { useState } from "react";
import { DragEvent } from "react";

import { message as antdMessage } from "antd";

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

export function useDragAndDrop({
  panelList,
  openPanels,
  setOpenPanels,
  NAV_BAR_HEIGHT,
  getGridCellPosition,
}: UseDragAndDropProps) {
  const [dragNavPanelKey, setDragNavPanelKey] = useState<string | null>(null);
  const [dropCell, setDropCell] = useState<{ row: number; col: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const onNavDragStart = (key: string) => (e: DragEvent<HTMLLIElement>) => {
    setDragNavPanelKey(key);
    e.dataTransfer.setData("panelKey", key);
  };

  const handleGridDropInfo = (info: {
    cell: { row: number; col: number } | null;
    size: { width: number; height: number };
  }) => {
    setDropCell(info.cell);
    setContainerSize(info.size);
  };

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
      const availableHeight = containerSize.height - NAV_BAR_HEIGHT;
      const pos = getGridCellPosition(dropCell.row, dropCell.col, containerSize.width, availableHeight, NAV_BAR_HEIGHT);
      width = Math.min(pos.width, containerSize.width);
      height = Math.min(pos.height, availableHeight);
      x = pos.x;
      y = pos.y;
    }
    // Only open if not already open by key
    if (openPanels.some((p) => p.key === panelDef.key)) {
      setDragNavPanelKey(null);

      antdMessage.error(`${panelDef.title} with same  has been opened.`);
      return;
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

  const onMainDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return {
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
  };
}
