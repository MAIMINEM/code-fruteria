import React from "react";
import { Rnd } from "react-rnd";

type Props = {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  onClose: () => void;
  onMove: (dx: number, dy: number) => void;
  onResize: (dw: number, dh: number) => void;
};

const ResizableDraggablePanel: React.FC<Props> = ({
  id,
  title,
  content,
  x,
  y,
  width,
  height,
  minWidth,
  minHeight,
  onClose,
  onMove,
  onResize,
}) => {
  return (
    <Rnd
      default={{ x, y, width, height }}
      position={{ x, y }}
      size={{ width, height }}
      minWidth={minWidth || 150}
      minHeight={minHeight || 100}
      bounds="parent"
      onDragStop={(_e, d) => {
        onMove(d.x - x, d.y - y);
        window.dispatchEvent(new Event("panel-drag-end"));
      }}
      onDragStart={() => {
        window.dispatchEvent(new Event("panel-drag-start"));
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        const newWidth = parseInt(ref.style.width, 10);
        const newHeight = parseInt(ref.style.height, 10);
        onResize(newWidth - width, newHeight - height);
        if (position) {
          onMove(position.x - x, position.y - y);
        }
      }}
      style={{ zIndex: 1000 }}
      dragHandleClassName="panel-drag-handle"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#232b3e",
          borderRadius: 8,
          boxShadow: "0 2px 8px #0006",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #3e4a6b",
        }}
      >
        <div
          className="panel-drag-handle"
          style={{
            cursor: "move",
            background: "#2b3556",
            color: "#fff",
            padding: "8px 16px",
            fontWeight: 700,
            fontFamily: "monospace",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            userSelect: "none",
          }}
        >
          <span>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer",
              marginLeft: 8,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", background: "#232b3e" }}>{content}</div>
        {/* Resize handle is built-in with react-rnd */}
      </div>
    </Rnd>
  );
};

// (Old code removed, see above for new Rnd-based implementation)

export default ResizableDraggablePanel;
