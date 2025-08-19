import React, { useState, useRef, useMemo, useCallback, Suspense } from "react";
import SelectedFruitDetailPopup from "./SelectedFruitDetailPopup";
import ReactDOM from "react-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "./FruitInventoryPanel.less";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register ag-grid modules (required for module-based builds)
ModuleRegistry.registerModules([AllCommunityModule]);

import { fakeFruitInventoryList, inventoryColumnDefs } from "../../fakeData/FakeFruitInventoryData";

const FruitInventoryPanel: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<any | null>(null);
  const gridRef = useRef<any>(null);

  // Memoize columnDefs and defaultColDef for performance
  const memoizedColumnDefs = useMemo(() => inventoryColumnDefs, []);
  const memoizedDefaultColDef = useMemo(() => ({ flex: 1, resizable: true }), []);

  // Memoize event handlers to avoid unnecessary re-renders
  const onRowDoubleClicked = useCallback((event: any) => {
    setSelectedFruit(event.data);
    // Programmatically select the row (check the checkbox)
    if (event.node && event.api) {
      event.api.deselectAll();
      event.node.setSelected(true);
    }
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
          <div className="ag-theme-alpine fruit-book-grid">
            <AgGridReact<any>
              theme="legacy"
              ref={gridRef}
              rowData={fakeFruitInventoryList}
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
            <Suspense fallback={<div>Loading...</div>}>
              <SelectedFruitDetailPopup fruit={selectedFruit} onClose={() => setSelectedFruit(null)} />
            </Suspense>,
            document.body
          )}
      </div>
    </>
  );
};

export default FruitInventoryPanel;
