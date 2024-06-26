import { GridCellKind } from "@glideapps/glide-data-grid";
import { DropdownCellType } from "@glideapps/glide-data-grid-cells";

export const getContainerSizeValue = (
  data: string | undefined | boolean | number | null
) => {
  let cntrSize = data?.toString() ?? "";

  switch (cntrSize) {
    case "20":
      return "20";
    case "40":
      return "40";
    case "40HC":
      return "40HC";
    case "45":
      return "45";
    default:
      return "";
  }
};

export const getContainerSizeCell = (
  data: string | undefined | boolean | number | null
) => {
  const allowedValues = [
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "40HC", label: "40HC" },
    { value: "45", label: "45" },
  ];
  let cntrSize = data?.toString().replaceAll(" ", "") ?? "";

  // if cntrSize is not in allowedValues, set it to empty string
  if (!allowedValues.some((value) => value.value === cntrSize)) {
    cntrSize = "";
  }

  const cntrSizeCell: DropdownCellType = {
    kind: GridCellKind.Custom,
    readonly: false,
    allowOverlay: true,
    copyData: getContainerSizeValue(cntrSize),
    data: {
      kind: "dropdown-cell",
      value: cntrSize,
      allowedValues: allowedValues,
    },
  };

  return cntrSizeCell;
};
