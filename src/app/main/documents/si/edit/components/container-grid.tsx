import { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { head } from "lodash";

export default function SIContainerGrid() {
  const [colDefs, setColDefs] = useState<any>([
    { field: "containerNumber", editable: true },
    {
      field: "soc",
      headerName: "SOC",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Y", "N"],
      },
    },
  ]);
  const [rowData, setRowData] = useState([
    { containerNumber: "ABCD1234567", soc: "Y" },
    { containerNumber: "ABCD1234568" },
    { containerNumber: "ABCD1234569" },
    { containerNumber: "ABCD1234570" },
  ]);

  return (
    <div
      className="ag-theme-quartz h-full" // applying the grid theme
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
