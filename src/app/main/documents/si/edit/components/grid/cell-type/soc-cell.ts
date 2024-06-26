import { GridCellKind } from "@glideapps/glide-data-grid";
import { DropdownCellType } from "@glideapps/glide-data-grid-cells";

export const getSocValue = (
  data: string | undefined | boolean | number | null
) => {
  let modifiedData = true;

  if (typeof data === "boolean") {
    modifiedData = data;
  } else if (typeof data === "string") {
    modifiedData = data === "Yes" ? true : false;
  } else if (typeof data === "number") {
    modifiedData = data === 1 ? true : false;
  } else {
    modifiedData = false;
  }

  return modifiedData;
};

export const getSocCell = (data: string | undefined | boolean | number) => {
  const modifiedData = getSocValue(data);

  const socCellType: DropdownCellType = {
    kind: GridCellKind.Custom,
    readonly: false,
    allowOverlay: true,
    copyData: modifiedData ? "Yes" : "No",
    data: {
      kind: "dropdown-cell",
      value: modifiedData ? "Yes" : "No",
      allowedValues: ["Yes", "No"],
    },
  };

  return socCellType;
};
