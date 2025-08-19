import React, { useState, useRef, useMemo, useCallback } from "react";
import FruitEnrichmentPanel from "./FruitEnrichmentPanel";
import ReactDOM from "react-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "./FruitBookPanel.less";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register ag-grid modules (required for module-based builds)
ModuleRegistry.registerModules([AllCommunityModule]);

import { fruits, columnDefs } from "./DruitBookFakeData";

const FruitBook: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<any | null>(null);
  const gridRef = useRef<any>(null);

  // Memoize columnDefs and defaultColDef for performance
  const memoizedColumnDefs = useMemo(() => columnDefs, []);
  const memoizedDefaultColDef = useMemo(() => ({ flex: 1, resizable: true }), []);

  // Memoize event handlers to avoid unnecessary re-renders
  const onRowDoubleClicked = useCallback((event: any) => {
    setSelectedFruit(event.data);
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    if (selectedNodes && selectedNodes.length > 0) {
      setSelectedFruit(selectedNodes[0].data);
    }
  }, []);

  return (
    <>
      <div className={`fruit-book-flex`}>
        <div className="fruit-book-container">
          <div className="fruit-book-title-row">
            <div className="fruit-book-title">Fruit Book</div>
          </div>
          <div className="ag-theme-alpine fruit-book-grid">
            <AgGridReact<any>
              theme="legacy"
              ref={gridRef}
              rowData={fruits}
              columnDefs={memoizedColumnDefs}
              defaultColDef={memoizedDefaultColDef}
              headerHeight={38}
              rowHeight={38}
              rowSelection={{ mode: "singleRow" }}
              onSelectionChanged={onSelectionChanged}
              onRowDoubleClicked={onRowDoubleClicked}
              getRowClass={(params) => {
                if (selectedFruit && params.data.id === selectedFruit.id) {
                  return "fruit-book-row-selected";
                }
                return [
                  "fruit-book-row",
                  params.node.rowIndex % 2 === 0 ? "fruit-book-row-even" : "fruit-book-row-odd",
                ].join(" ");
              }}
              suppressCellFocus={true}
            />
          </div>
        </div>
        {selectedFruit &&
          ReactDOM.createPortal(
            <FruitEnrichmentPanel fruit={selectedFruit} onClose={() => setSelectedFruit(null)} />,
            document.body
          )}
      </div>
    </>
  );
};

export default FruitBook;
