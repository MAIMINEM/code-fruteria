import React, { useState, useRef } from "react";
import FruitEnrichmentPanel from "./FruitEnrichmentPanel";
import ReactDOM from "react-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "./FruitBookPanel.less";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register ag-grid modules (required for module-based builds)
ModuleRegistry.registerModules([AllCommunityModule]);

const fruits = [
  {
    id: "F001",
    name: "Banana",
    country: "Ecuador",
    type: "Tropical",
    status: "Available",
    details: "Organic, Fair Trade",
  },
  {
    id: "F002",
    name: "Apple",
    country: "Spain",
    type: "Temperate",
    status: "Available",
    details: "Fuji, Premium",
  },
  {
    id: "F003",
    name: "Orange",
    country: "Morocco",
    type: "Citrus",
    status: "Low Stock",
    details: "Navel, Sweet",
  },
  {
    id: "F004",
    name: "Kiwi",
    country: "New Zealand",
    type: "Berry",
    status: "Available",
    details: "Green, Large",
  },
  {
    id: "F005",
    name: "Mango",
    country: "Peru",
    type: "Tropical",
    status: "Pending",
    details: "Kent, Air Freight",
  },
  {
    id: "F006",
    name: "Pineapple",
    country: "Costa Rica",
    type: "Tropical",
    status: "Available",
    details: "Extra Sweet",
  },
  {
    id: "F007",
    name: "Grape",
    country: "Italy",
    type: "Berry",
    status: "Available",
    details: "Red Globe",
  },
  {
    id: "F008",
    name: "Pear",
    country: "Argentina",
    type: "Temperate",
    status: "Available",
    details: "Williams, Fresh",
  },
  {
    id: "F009",
    name: "Lime",
    country: "Mexico",
    type: "Citrus",
    status: "Low Stock",
    details: "Seedless",
  },
  {
    id: "F010",
    name: "Papaya",
    country: "Brazil",
    type: "Tropical",
    status: "Available",
    details: "Formosa",
  },
];

const columnDefs: ColDef[] = [
  { headerName: "ID", field: "id", minWidth: 90 },
  { headerName: "Fruit", field: "name", minWidth: 120 },
  { headerName: "Country", field: "country", minWidth: 120 },
  { headerName: "Type", field: "type", minWidth: 120 },
  {
    headerName: "Status",
    field: "status",
    minWidth: 120,
    cellClass: (params: any) =>
      params.value === "Available"
        ? "fruit-book-status-available"
        : params.value === "Pending"
        ? "fruit-book-status-pending"
        : "fruit-book-status-low",
  },
  { headerName: "Details", field: "details", minWidth: 180 },
];

const defaultColDef = {
  flex: 1,
  resizable: true,
};

const FruitBook: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<any | null>(null);
  const gridRef = useRef<any>(null);

  const onRowDoubleClicked = (event: any) => {
    setSelectedFruit(event.data);
  };

  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    if (selectedNodes && selectedNodes.length > 0) {
      setSelectedFruit(selectedNodes[0].data);
    }
  };

  // Debug: Log fruits to ensure data is present
  console.log("fruits:", fruits);

  return (
    <>
      <div className="fruit-book-container">
        <div className="fruit-book-title">Fruit Book</div>
        <div className="ag-theme-alpine fruit-book-grid">
          <AgGridReact<any>
            theme="legacy"
            ref={gridRef}
            rowData={fruits}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
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
    </>
  );
};

export default FruitBook;
