import { SealKind } from "@/app/util/typeDef/si";
import { GridCellKind } from "@glideapps/glide-data-grid";
import { DropdownCellType } from "@glideapps/glide-data-grid-cells";
import { parse } from "path";

export const getSealKindValue = (
  data: string | undefined | boolean | number | null
) => {
  let sealKind = data?.toString() ?? "";

  switch (sealKind) {
    case "Shipper":
      return SealKind.Shipper;
    case "Carrier":
      return SealKind.Carrier;
    case "Customs":
      return SealKind.Customs;
    case "Consolidator":
      return SealKind.Consolidator;
    case "Quarantine Agency":
      return SealKind["Quarantine Agency"];
    case "Terminal Agency":
      return SealKind["Terminal Agency"];
    case "Unknown":
      return SealKind.Unknown;
    default:
      return SealKind.Unknown;
  }
};

export const getSealKindCell = (
  data: string | undefined | boolean | number | null
) => {
  const allowedValues = [
    { value: SealKind.Shipper.toString(), label: "Shipper" },
    { value: SealKind.Carrier.toString(), label: "Carrier" },
    { value: SealKind.Customs.toString(), label: "Customs" },
    { value: SealKind.Consolidator.toString(), label: "Consolidator" },
    {
      value: SealKind["Quarantine Agency"].toString(),
      label: "Quarantine Agency",
    },
    { value: SealKind["Terminal Agency"].toString(), label: "Terminal Agency" },
    { value: SealKind.Unknown.toString(), label: "Unknown" },
  ];
  let sealKind = parseInt(
    data?.toString() ?? SealKind.Unknown.toString()
  ) as SealKind;

  // if sealKind is not in allowedValues, set it to Unknown
  if (
    !allowedValues.some(
      (value) => value.value.toString() === sealKind.toString()
    )
  ) {
    sealKind = SealKind.Unknown;
  }

  const sealKindCell: DropdownCellType = {
    kind: GridCellKind.Custom,
    readonly: false,
    allowOverlay: true,
    copyData: {
      0: "Shipper",
      1: "Carrier",
      2: "Consolidator",
      3: "Customs",
      4: "Unknown",
      5: "Quarantine Agency",
      6: "Terminal Agency",
    }[sealKind],
    data: {
      kind: "dropdown-cell",
      value: sealKind.toString(),
      allowedValues: allowedValues,
    },
  };

  return sealKindCell;
};
