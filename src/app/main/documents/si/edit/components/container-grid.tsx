import { SIEditContainerState } from "@/app/store/si.store";
import {
  SIContainerGridProps,
  SIContainerInputProps,
  SealKind,
} from "@/app/util/typeDef/si";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

export default function SIContainerGrid() {
  const [siContainerStore, setSIContainerStore] =
    useRecoilState(SIEditContainerState);

  const parsed: SIContainerGridProps[] = parseData(siContainerStore);
  console.log(parsed);

  const [tableData, setTableData] = useState(parsed);

  // const repackedData = repackData(data);
  // console.log(repackedData);

  // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
  const columns: GridColumn[] = [
    { title: "Container #", id: "containerNumber", group: "Container" },
    { title: "S.O.C", id: "isSocContainer", group: "Container" },
    { title: "Cntr Type", id: "containerType", group: "Container" },
    { title: "Cntr Size", id: "containerSize", group: "Container" },
    { title: "1st Seal #", id: "firstSealNumber", group: "Container" },
    { title: "Seal Kind", id: "firstSealKind", group: "Container" },
    { title: "Seal Type", id: "firstSealType", group: "Container" },
    { title: "2nd Seal #", id: "secondSealNumber", group: "Container" },
    { title: "Seal Kind", id: "secondSealKind", group: "Container" },
    { title: "Seal Type", id: "secondSealType", group: "Container" },
    { title: "Package", id: "packageQuantity", group: "Container" },
    { title: "Unit", id: "packageType", group: "Container" },
    { title: "Weight", id: "packageWeight", group: "Container" },
    { title: "Unit", id: "packageWeightUnit", group: "Container" },
    { title: "Measure", id: "packageMeasurement", group: "Container" },
    { title: "Unit", id: "packageMeasurementUnit", group: "Container" },
    {
      title: "Package",
      id: "cargoPackageQuantity",
      group: "Cargo Information",
    },
    {
      title: "Unit",
      id: "cargoPackageUnit",
      group: "Cargo Information",
    },
    { title: "Weight", id: "cargoWeight", group: "Cargo Information" },
    { title: "Unit", id: "cargoWeightUnit", group: "Cargo Information" },
    { title: "Measure", id: "cargoMeasurement", group: "Cargo Information" },
    { title: "Unit", id: "cargoMeasurementUnit", group: "Cargo Information" },
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
          const sealTypeText = {
            merchanical: "Mechanical Seal",
            electronic: "Electronic Seal",
          }[sealType];

          return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            displayData: sealTypeText,
            data: sealTypeText,
          };

        case "firstSealKind":
        case "secondSealKind":
          const sealKind = dataRow[indexes[col]] as SealKind;
          const sealKindText = {
            [SealKind.Shipper]: "Shipper",
            [SealKind.Carrier]: "Carrier",
            [SealKind.Consolidator]: "Consolidator",
            [SealKind["Quarantine Agency"]]: "Quarantine Agency",
            [SealKind["Terminal Agency"]]: "Customs Agency",
            [SealKind.Customs]: "Customs",
            [SealKind.Unknown]: "Other Agency",
          }[sealKind];

          return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            displayData: sealKindText,
            data: sealKindText,
          };
        case "isSocContainer":
          const soc = dataRow[indexes[col]] as boolean;

          return {
            kind: GridCellKind.Text,
            allowOverlay: false,
            readonly: false,
            displayData: soc ? "Y" : "N",
            data: soc ? "Y" : "N",
          };
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

      if (newValue.kind !== GridCellKind.Text) {
        console.error("Unsupported cell kind", newValue.kind);
        // we only have text cells, might as well just die here.
        return;
      }
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
        />
      </div>
    </div>
  );
}

function repackData(data: SIContainerGridProps[]): SIContainerInputProps[] {
  const repackedData: SIContainerInputProps[] = [];

  // merged by container number
  const mergedData = {
    dry: [] as SIContainerInputProps[],
    reefer: [] as SIContainerInputProps[],
    opentop: [] as SIContainerInputProps[],
    tank: [] as SIContainerInputProps[],
    flatrack: [] as SIContainerInputProps[],
    bulk: [] as SIContainerInputProps[],
  };

  return repackedData;
}

function parseData(store: {
  dry: SIContainerInputProps[];
  reefer: SIContainerInputProps[];
  opentop: SIContainerInputProps[];
  tank: SIContainerInputProps[];
  flatrack: SIContainerInputProps[];
  bulk: SIContainerInputProps[];
  weightUnit: "KGS" | "LBS";
  measurementUnit: "CBM" | "CBF";
}): SIContainerGridProps[] {
  const mergedList = store.dry.concat(
    store.reefer,
    store.opentop,
    store.flatrack,
    store.tank,
    store.bulk
  );

  const dataset: SIContainerGridProps[] = [];

  mergedList.map((container) => {
    const baseData = {
      uuid: container.uuid,
      containerNumber: container.containerNumber,
      isSocContainer: container.isSocContainer,
      containerType: container.containerType,
      containerSize: container.containerSize,
      firstSealNumber: container.firstSeal.description,
      firstSealKind: container.firstSeal.kind,
      firstSealType: container.firstSeal.type,
      secondSealNumber: container.secondSeal.description,
      secondSealKind: container.secondSeal.kind,
      secondSealType: container.secondSeal.type,
      packageType: container.packageType,
      packageQuantity: container.packageQuantity,
      packageWeight: container.packageWeight,
      packageWeightUnit: store.weightUnit,
      packageMeasurement: container.packageMeasurement,
      packageMeasurementUnit: store.measurementUnit,
    };

    if (container.hasCargoManifest) {
      container.cargoManifest.map((manifest) => {
        dataset.push({
          ...baseData,
          cargoPackageQuantity: manifest.packageQuantity,
          cargoPackageUnit: manifest.packageType,
          cargoWeight: manifest.weight,
          cargoWeightUnit: store.weightUnit,
          cargoMeasurement: manifest.measurement,
          cargoMeasurementUnit: store.measurementUnit,
          htsCodeUS: manifest.commodityCode.htsCodeUS,
          hisCodeEUASIA: manifest.commodityCode.hisCodeEUASIA,
        });
      });
    } else {
      // dataset.push(baseData);
      dataset.push({
        ...baseData,
        cargoPackageQuantity: undefined,
        cargoPackageUnit: undefined,
        cargoWeight: undefined,
        cargoWeightUnit: undefined,
        cargoMeasurement: undefined,
        cargoMeasurementUnit: undefined,
        htsCodeUS: undefined,
        hisCodeEUASIA: undefined,
      });
    }
  });

  return dataset;
}
