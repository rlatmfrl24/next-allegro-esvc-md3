import "@glideapps/glide-data-grid/dist/index.css";

import { set } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import { SIEditContainerState } from "@/app/store/si.store";
import { SIContainerGridProps } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  CompactSelection,
  DataEditor,
  DataEditorProps,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import { allCells, DropdownCellType } from "@glideapps/glide-data-grid-cells";

import { getContainerSizeCell } from "./cell-type/container-size-cell";
import {
  getContainerTypeCell,
  getContainerTypeValue,
} from "./cell-type/container-type-cell";
import { getSealKindCell, getSealKindValue } from "./cell-type/seal-kind-cell";
import { getSealTypeCell, getSealTypeValue } from "./cell-type/seal-type-cell";
import { getSocCell, getSocValue } from "./cell-type/soc-cell";
import { columns } from "./util/columnDef";
import { parseData } from "./util/parser";

function getHexCodeFromToken(token: string) {
  return window
    .getComputedStyle(document.documentElement.querySelector("body") as Element)
    .getPropertyValue(token);
}

export default function SIContainerGrid() {
  const tempPackageList = useMemo(() => {
    return (
      Array.from({ length: 20 }, (_, i) => faker.commerce.productMaterial())
        // remove duplicate packageType
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, []);

  const [siContainerStore, setSIContainerStore] =
    useRecoilState(SIEditContainerState);

  const parsed: SIContainerGridProps[] = parseData(siContainerStore);

  const [tableData, setTableData] = useState<SIContainerGridProps[]>(parsed);
  const [selection, setSelection] = useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  const [highlightRegion, setHighlightRegion] = useState<
    DataEditorProps["highlightRegions"]
  >([]);

  function addHighlightRegion(col: number, row: number) {
    setHighlightRegion((prev) => {
      return [
        ...(prev as any[]),
        {
          color: getHexCodeFromToken("--md-sys-color-error") + "10",
          range: {
            x: col,
            y: row,
            width: 1,
            height: 1,
          },
          style: "solid",
        },
      ];
    });
  }

  function removeHighlightRegion(col: number, row: number) {
    setHighlightRegion((prev) => {
      return (prev as any[]).filter((region) => {
        return region.range.x !== col || region.range.y !== row;
      });
    });
  }

  useEffect(() => {
    addHighlightRegion(2, 2);
    addHighlightRegion(3, 2);
  }, []);

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

      switch (indexes[col]) {
        case "firstSealType":
        case "secondSealType":
          return getSealTypeCell(dataRow[indexes[col]]);
        case "firstSealKind":
        case "secondSealKind":
          return getSealKindCell(dataRow[indexes[col]]);
        case "isSocContainer":
          const soc = dataRow[indexes[col]];
          return getSocCell(soc);
        case "containerType":
          return getContainerTypeCell(dataRow[indexes[col]]);
        case "containerSize":
          return getContainerSizeCell(dataRow[indexes[col]]);
        case "packageWeightUnit":
        case "cargoWeightUnit":
          const weightUnit = dataRow[indexes[col]]?.toString();
          const weightUnitCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: weightUnit ?? "",
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
        case "packageMeasurementUnit":
        case "cargoMeasurementUnit":
          const measurementUnit = dataRow[indexes[col]]?.toString();
          const measurementUnitCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: measurementUnit ?? "",
            data: {
              kind: "dropdown-cell",
              value: measurementUnit,
              allowedValues: [
                { value: "CBM", label: "CBM" },
                { value: "CBF", label: "CBF" },
              ],
            },
          };
          return measurementUnitCell;

        case "packageWeight":
        case "packageMeasurement":
        case "cargoWeight":
        case "cargoMeasurement":
        case "packageQuantity":
        case "cargoPackageQuantity":
          const numValue = dataRow[indexes[col]] as number;
          return {
            kind: GridCellKind.Number,
            allowOverlay: true,
            copyData: numValue ? numValue.toString() : "",
            readonly: false,
            displayData: numValue ? numValue.toLocaleString() : "",
            data: numValue,
          };

        case "htsCodeUS":
        case "hisCodeEUASIA":
          const code = dataRow[indexes[col]] as number;
          return {
            kind: GridCellKind.Number,
            allowOverlay: true,
            readonly: false,
            copyData: code?.toString() ?? "",
            thousandSeparator: false,
            displayData: code?.toString() ?? "",
            data: code,
          };

        case "packageType":
        case "cargoPackageUnit":
          const packageType = dataRow[indexes[col]]?.toString();
          const packageTypeCell: DropdownCellType = {
            kind: GridCellKind.Custom,
            readonly: false,
            allowOverlay: true,
            copyData: packageType ?? "",
            data: {
              kind: "dropdown-cell",
              value: packageType,
              allowedValues: tempPackageList.map((value) => ({
                value,
                label: value,
              })),
            },
          };
          return packageTypeCell;

        default:
          const d = dataRow[indexes[col]];

          return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            copyData: d?.toString() ?? "",
            displayData: d?.toString() ?? "",
            data: d?.toString() ?? "",
          };
      }
    },
    [tableData, tempPackageList]
  );

  const onCellEdited = useCallback(
    (cell: Item, newValue: EditableGridCell) => {
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
      const [col, row] = cell;
      const key = indexes[col];

      if (col === 1) {
        // soc cell
        const socValue = (newValue as DropdownCellType).data.value;
        setTableData((prev) => {
          const newData = [...prev];
          const dataRow = newData[row];
          const updatedRow = { ...dataRow, [key]: getSocValue(socValue) };
          newData[row] = updatedRow;
          return newData;
        });
        return;
      }

      if (col === 2) {
        // container type cell
        const containerTypeValue = (newValue as DropdownCellType).data.value;
        setTableData((prev) => {
          const newData = [...prev];
          const dataRow = newData[row];
          const updatedRow = {
            ...dataRow,
            [key]: containerTypeValue,
          };
          newData[row] = updatedRow;
          return newData;
        });
      }

      // case for cargo weight unit and package weight unit
      if (key === "packageWeightUnit" || key === "cargoWeightUnit") {
        const weightUnitValue = (newValue as DropdownCellType).data.value as
          | "KGS"
          | "LBS";

        setSIContainerStore((prev) => {
          return {
            ...prev,
            weightUnit: weightUnitValue,
          };
        });

        // change all the weight unit in the table
        setTableData((prev) => {
          return prev.map((data) => {
            return {
              ...data,
              packageWeightUnit: weightUnitValue,
              cargoWeightUnit: weightUnitValue,
            };
          });
        });

        return;
      }

      // case for cargo measurement unit and package measurement unit
      if (key === "packageMeasurementUnit" || key === "cargoMeasurementUnit") {
        const measurementUnitValue = (newValue as DropdownCellType).data
          .value as "CBM" | "CBF";

        setSIContainerStore((prev) => {
          return {
            ...prev,
            measurementUnit: measurementUnitValue,
          };
        });

        // change all the measurement unit in the table
        setTableData((prev) => {
          return prev.map((data) => {
            return {
              ...data,
              packageMeasurementUnit: measurementUnitValue,
              cargoMeasurementUnit: measurementUnitValue,
            };
          });
        });

        return;
      }

      if (
        newValue.kind === GridCellKind.Custom &&
        (newValue.data as any).kind === "dropdown-cell"
      ) {
        // update the cell with the new value
        const dropdownValue = (newValue as DropdownCellType).data.value;
        setTableData((prev) => {
          const newData = [...prev];
          const dataRow = newData[row];
          const updatedRow = { ...dataRow, [key]: dropdownValue };
          newData[row] = updatedRow;
          return newData;
        });
        return;
      }

      if (
        newValue.kind !== GridCellKind.Text &&
        newValue.kind !== GridCellKind.Number
      ) {
        console.error("Unsupported cell kind", newValue.kind);
        // we only have text cells, might as well just die here.
        return;
      }
      setTableData((prev) => {
        const newData = [...prev];
        const dataRow = newData[row];
        const value = newValue.data;
        const updatedRow = { ...dataRow, [key]: value };
        newData[row] = updatedRow;
        return newData;
      });
    },
    [setSIContainerStore]
  );

  return (
    <div
      className="flex flex-1" // applying the grid theme
    >
      <div className="flex-auto w-0">
        <DataEditor
          columns={columns}
          rows={tableData.length}
          gridSelection={selection}
          onGridSelectionChange={setSelection}
          getCellContent={getCellContent}
          onCellEdited={onCellEdited}
          rowMarkers={"both"}
          highlightRegions={highlightRegion}
          theme={{
            accentColor: getHexCodeFromToken("--md-sys-color-primary"),
            // accentFg: getHexCodeFromToken("--md-sys-color-primary"),
            accentLight: getHexCodeFromToken(
              "--md-sys-color-secondary-container"
            ),
            // bgBubble: getHexCodeFromToken("--md-sys-color-primary"),
            // bgBubbleSelected: getHexCodeFromToken("--md-sys-color-primary"),
          }}
          onKeyDown={(event) => {
            if (event.shiftKey && event.key === "Delete") {
              event.preventDefault();
              event.stopPropagation();
              const selectedRowIndex = selection.current?.cell[1];

              if (selectedRowIndex !== undefined) {
                setTableData((prev) => {
                  return prev.filter((_, index) => {
                    return index !== selectedRowIndex;
                  });
                });
              }
            }
          }}
          onRowAppended={() => {
            setTableData((prev) => {
              return [
                ...prev,
                {
                  packageWeightUnit: siContainerStore.weightUnit,
                  packageMeasurementUnit: siContainerStore.measurementUnit,
                  cargoWeightUnit: siContainerStore.weightUnit,
                  cargoMeasurementUnit: siContainerStore.measurementUnit,
                } as SIContainerGridProps,
              ];
            });
          }}
          fillHandle
          customRenderers={allCells}
          onPaste={(target, values) => {
            const [col, row] = target;
            const newData = [...tableData];
            values.forEach((rowValues, i) => {
              rowValues.forEach((value, j) => {
                const dataRow = newData[row + i];
                const key = columns[col + j].id;
                console.log("key", key);
                // add paste logic here
                if (key === "isSocContainer") {
                  set(dataRow, key, getSocValue(value));
                  return;
                }

                if (key === "containerType") {
                  set(dataRow, key, getContainerTypeValue(value));
                  return;
                }

                if (key === "firstSealKind" || key === "secondSealKind") {
                  set(dataRow, key, getSealKindValue(value));
                  return;
                }

                if (key === "firstSealType" || key === "secondSealType") {
                  set(dataRow, key, getSealTypeValue(value));
                  return;
                }

                if (key) {
                  set(dataRow, key, value);
                }
              });
            });
            setTableData(newData);

            return false;
          }}
          getCellsForSelection
        />
      </div>
    </div>
  );
}
