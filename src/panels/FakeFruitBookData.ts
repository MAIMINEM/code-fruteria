import { ColDef } from "ag-grid-community";

export const fruits = [
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

export const columnDefs: ColDef[] = [
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
