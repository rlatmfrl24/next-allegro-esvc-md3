import { da } from "@faker-js/faker";
import { GridCellKind } from "@glideapps/glide-data-grid";
import { DropdownCellType } from "@glideapps/glide-data-grid-cells";

export const getContainerTypeValue = (
  data: string | undefined | boolean | number | null
) => {
  let cntrType = data?.toString() ?? "";

  switch (cntrType) {
    case "Dry":
      return "Dry";
    case "Reefer":
      return "Reefer";
    case "OpenTop":
    case "Open Top":
      return "Open Top";
    case "FlatRack":
    case "Flat Rack":
      return "Flat Rack";
    case "Tank":
      return "Tank";
    case "Bulk":
      return "Bulk";
    default:
      return "";
  }
};

export const getContainerTypeCell = (
  data: string | undefined | boolean | number | null
) => {
  const allowedValues = [
    { value: "Dry", label: "Dry" },
    { value: "Reefer", label: "Reefer" },
    { value: "OpenTop", label: "Open Top" },
    { value: "FlatRack", label: "Flat Rack" },
    { value: "Tank", label: "Tank" },
    { value: "Bulk", label: "Bulk" },
  ];
  let cntrType = data?.toString().replaceAll(" ", "") ?? "";

  // if cntrType is not in allowedValues, set it to empty string
  if (!allowedValues.some((value) => value.value === cntrType)) {
    cntrType = "";
  }

  const cntrTypeCell: DropdownCellType = {
    kind: GridCellKind.Custom,
    readonly: false,
    allowOverlay: true,
    copyData: getContainerTypeValue(cntrType),
    data: {
      kind: "dropdown-cell",
      value: cntrType,
      allowedValues: allowedValues,
    },
  };

  return cntrTypeCell;
};
