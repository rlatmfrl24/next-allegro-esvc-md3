import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";

export default function SIContainerGrid() {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Maria",
      lastName: "Garcia",
    },
    {
      firstName: "Nancy",
      lastName: "Jones",
    },
    {
      firstName: "James",
      lastName: "Smith",
    },
  ];

  // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
  const columns: GridColumn[] = [
    { title: "First Name", width: 100 },
    { title: "Last Name", width: 100 },
  ];

  function getData([col, row]: Item): GridCell {
    const person = data[row];

    if (col === 0) {
      return {
        kind: GridCellKind.Text,
        data: person.firstName,
        allowOverlay: false,
        displayData: person.firstName,
      };
    } else if (col === 1) {
      return {
        kind: GridCellKind.Text,
        data: person.lastName,
        allowOverlay: false,
        displayData: person.lastName,
      };
    } else {
      throw new Error();
    }
  }

  return (
    <div
      className="h-full" // applying the grid theme
    >
      <DataEditor
        columns={columns}
        getCellContent={getData}
        rows={data.length}
      />
    </div>
  );
}
