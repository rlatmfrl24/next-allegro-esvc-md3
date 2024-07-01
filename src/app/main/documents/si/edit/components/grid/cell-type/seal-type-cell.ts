import { GridCellKind } from "@glideapps/glide-data-grid";
import { DropdownCellType } from "@glideapps/glide-data-grid-cells";
import { get } from "lodash";

export const getSealTypeValue = (
  data: string | undefined | boolean | number | null
) => {
  let sealType = data?.toString() ?? "";

  switch (sealType) {
    case "Merchanical Seal":
      return "merchanical";
    case "Electronic Seal":
      return "electronic";
    default:
      return "";
  }
};

export const getSealTypeText = (
  data: string | undefined | boolean | number | null
) => {
  let sealType = data?.toString() ?? "";

  switch (sealType) {
    case "merchanical":
      return "Merchanical Seal";
    case "electronic":
      return "Electronic Seal";
    default:
      return "";
  }
};

export const getSealTypeCell = (
  data: string | undefined | boolean | number | null
) => {
  const allowedValues = [
    { value: "merchanical", label: "Merchanical Seal" },
    { value: "electronic", label: "Electronic Seal" },
  ];
  let sealType = data?.toString();

  // if sealType is not in allowedValues, set it to empty string
  if (!allowedValues.some((value) => value.value === sealType)) {
    sealType = "";
  }

  const sealTypeCell: DropdownCellType = {
    kind: GridCellKind.Custom,
    readonly: false,
    allowOverlay: true,
    copyData: getSealTypeText(sealType),
    data: {
      kind: "dropdown-cell",
      value: sealType,
      allowedValues: allowedValues,
    },
  };

  return sealTypeCell;
};
