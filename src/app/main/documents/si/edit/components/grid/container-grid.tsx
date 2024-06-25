import "@glideapps/glide-data-grid/dist/index.css";

import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import { SIEditContainerState } from "@/app/store/si.store";
import {
  SealKind,
  SIContainerGridProps,
  SIContainerInputProps,
} from "@/app/util/typeDef/si";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";

import { parseData } from "./util";

import {
  DropdownCell,
  DropdownCellType,
  allCells,
} from "@glideapps/glide-data-grid-cells";
import { isBoolean } from "lodash";

export default function SIContainerGrid() {
  const [siContainerStore, setSIContainerStore] =
    useRecoilState(SIEditContainerState);

  const parsed: SIContainerGridProps[] = parseData(siContainerStore);

  const [tableData, setTableData] = useState(parsed);

  // const repackedData = repackData(data);
  // console.log(repackedData);

  // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
  const columns: GridColumn[] = [
    {
      title: "Container #",
      id: "containerNumber",
      group: "Container",
    },
    { title: "S.O.C", id: "isSocContainer", group: "Container", width: 88 },
    { title: "Cntr Type", id: "containerType", group: "Container", width: 88 },
    { title: "Cntr Size", id: "containerSize", group: "Container", width: 88 },
    { title: "1st Seal #", id: "firstSealNumber", group: "Container" },
    { title: "Seal Kind", id: "firstSealKind", group: "Container" },
    { title: "Seal Type", id: "firstSealType", group: "Container" },
    { title: "2nd Seal #", id: "secondSealNumber", group: "Container" },
    { title: "Seal Kind", id: "secondSealKind", group: "Container" },
    { title: "Seal Type", id: "secondSealType", group: "Container" },
    { title: "Package", id: "packageQuantity", group: "Container" },
    { title: "Unit", id: "packageType", group: "Container", width: 88 },
    { title: "Weight", id: "packageWeight", group: "Container" },
    { title: "Unit", id: "packageWeightUnit", group: "Container", width: 88 },
    { title: "Measure", id: "packageMeasurement", group: "Container" },
    {
      title: "Unit",
      id: "packageMeasurementUnit",
      group: "Container",
      width: 88,
    },
    {
      title: "Package",
      id: "cargoPackageQuantity",
      group: "Cargo Information",
    },
    {
      title: "Unit",
      id: "cargoPackageUnit",
      group: "Cargo Information",
      width: 88,
    },
    { title: "Weight", id: "cargoWeight", group: "Cargo Information" },
    {
      title: "Unit",
      id: "cargoWeightUnit",
      group: "Cargo Information",
      width: 88,
    },

    { title: "Measure", id: "cargoMeasurement", group: "Cargo Information" },
    {
      title: "Unit",
      id: "cargoMeasurementUnit",
      group: "Cargo Information",
      width: 88,
    },
    { title: "HTS Code US", id: "htsCodeUS", group: "Customs Information" },
    {
      title: "HIS Code EU/ASIA",
      id: "hisCodeEUASIA",
      group: "Customs Information",
    },
  ];

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof SIContainerGridProps)[] = [
        "containerNumber",
        "isSocContainer",
        "containerType",
        "containerSize",
        "firstSealNumber",
        "firstSealKind",
        "firstSealType",
        "secondSealNumber",
        "secondSealKind",
        "secondSealType",
        "packageQuantity",
        "packageType",
        "packageWeight",
        "packageWeightUnit",
        "packageMeasurement",
        "packageMeasurementUnit",
        "cargoPackageQuantity",
        "cargoPackageUnit",
        "cargoWeight",
        "cargoWeightUnit",
        "cargoMeasurement",
        "cargoMeasurementUnit",
        "htsCodeUS",
        "hisCodeEUASIA",
      ];
      // const d = dataRow[indexes[col]];

      switch (indexes[col]) {
        case "firstSealType":
        case "secondSealType":
          const sealType = dataRow[indexes[col]] as
            | "merchanical"
            | "electronic";
          const sealTypeCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: "4",
            data: {
              kind: "dropdown-cell",
              value: sealType,
              allowedValues: [
                { value: "merchanical", label: "Merchanical Seal" },
                { value: "electronic", label: "Electronic Seal" },
              ],
            },
          };
          return sealTypeCell;
        case "firstSealKind":
        case "secondSealKind":
          const sealKind = dataRow[indexes[col]] as SealKind;
          const sealKindCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: "4",
            data: {
              kind: "dropdown-cell",
              value: sealKind.toString(),
              allowedValues: [
                { value: SealKind.Shipper.toString(), label: "Shipper" },
                { value: SealKind.Carrier.toString(), label: "Carrier" },
                {
                  value: SealKind.Consolidator.toString(),
                  label: "Consolidator",
                },
                {
                  value: SealKind["Quarantine Agency"].toString(),
                  label: "Quarantine Agency",
                },
                {
                  value: SealKind["Terminal Agency"].toString(),
                  label: "Terminal Agency",
                },
                { value: SealKind.Customs.toString(), label: "Customs" },
                { value: SealKind.Unknown.toString(), label: "Other Agency" },
              ],
            },
          };

          return sealKindCell;
        case "isSocContainer":
          const soc = dataRow[indexes[col]];
          const socValue = isBoolean(soc) ? soc : soc === "Y";
          const socCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: "4",
            data: {
              kind: "dropdown-cell",
              value: socValue ? "Y" : "N",
              allowedValues: [
                { value: "Y", label: "Yes" },
                { value: "N", label: "No" },
              ],
            },
          };

          return socCell;

        case "containerType":
          const cntrType = dataRow[indexes[col]]?.toString();
          const cntrTypeCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: "4",
            data: {
              kind: "dropdown-cell",
              value: cntrType,
              allowedValues: [
                { value: "Dry", label: "Dry" },
                { value: "Reefer", label: "Reefer" },
                { value: "OpenTop", label: "Open Top" },
                { value: "FlatRack", label: "Flat Rack" },
                { value: "Tank", label: "Tank" },
                { value: "Bulk", label: "Bulk" },
              ],
            },
          };
          return cntrTypeCell;
        case "containerSize":
          const cntrSize = dataRow[indexes[col]]?.toString();
          const cntrSizeCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: "4",
            data: {
              kind: "dropdown-cell",
              value: cntrSize,
              allowedValues: [
                { value: "20", label: "20" },
                { value: "40", label: "40" },
                { value: "40HC", label: "40HC" },
                { value: "45", label: "45" },
              ],
            },
          };
          return cntrSizeCell;
        case "packageWeightUnit":
        case "cargoWeightUnit":
          const weightUnit = dataRow[indexes[col]]?.toString();
          const weightUnitCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: "4",
            data: {
              kind: "dropdown-cell",
              value: weightUnit,
              allowedValues: [
                { value: "KGS", label: "KGS" },
                { value: "LBS", label: "LBS" },
              ],
            },
          };
          return weightUnitCell;
        default:
          const d = dataRow[indexes[col]];

          return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            displayData: d?.toLocaleString() ?? "",
            data: d?.toLocaleString() ?? "",
          };
      }
    },
    [tableData]
  );

  const onCellEdited = useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      console.log(cell, newValue);

      const indexes: (keyof SIContainerGridProps)[] = [
        "containerNumber",
        "isSocContainer",
        "containerType",
        "containerSize",
        "firstSealNumber",
        "firstSealKind",
        "firstSealType",
        "secondSealNumber",
        "secondSealKind",
        "secondSealType",
        "packageQuantity",
        "packageType",
        "packageWeight",
        "packageWeightUnit",
        "packageMeasurement",
        "packageMeasurementUnit",
        "cargoPackageQuantity",
        "cargoPackageUnit",
        "cargoWeight",
        "cargoWeightUnit",
        "cargoMeasurement",
        "cargoMeasurementUnit",
        "htsCodeUS",
        "hisCodeEUASIA",
      ];

      if (
        newValue.kind === GridCellKind.Custom &&
        (newValue.data as any).kind === "dropdown-cell"
      ) {
        // update the cell with the new value
        const dropdownValue = (newValue as DropdownCellType).data.value;
        console.log("Dropdown cell edited", dropdownValue);
        const [col, row] = cell;
        const key = indexes[col];
        const dataRow = tableData[row];
        const newData = [...tableData];
        newData[row] = { ...dataRow, [key]: dropdownValue };
        console.log(newData);
        setTableData(newData);
        return;
      }

      if (newValue.kind !== GridCellKind.Text) {
        console.error("Unsupported cell kind", newValue.kind);
        // we only have text cells, might as well just die here.
        return;
      }
      const [col, row] = cell;
      const key = indexes[col];
      const dataRow = tableData[row];
      const newData = [...tableData];
      newData[row] = { ...dataRow, [key]: newValue.data };
      setTableData(newData);
    },
    [tableData]
  );

  return (
    <div
      className="flex flex-1" // applying the grid theme
    >
      <div className="flex-auto w-0">
        <DataEditor
          columns={columns}
          getCellContent={getCellContent}
          rows={tableData.length}
          onCellEdited={onCellEdited}
          customRenderers={allCells}
        />
      </div>
    </div>
  );
}
