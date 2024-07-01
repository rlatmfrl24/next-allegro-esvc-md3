import { GridColumn } from "@glideapps/glide-data-grid";

export const columns: GridColumn[] = [
  {
    title: "Container #",
    id: "containerNumber",
    group: "Container",
    width: 120,
  },
  { title: "S.O.C", id: "isSocContainer", group: "Container", width: 88 },
  { title: "Cntr Type", id: "containerType", group: "Container", width: 88 },
  { title: "Cntr Size", id: "containerSize", group: "Container", width: 88 },
  {
    title: "1st Seal #",
    id: "firstSealNumber",
    group: "Container",
    width: 120,
  },
  { title: "Seal Kind", id: "firstSealKind", group: "Container", width: 140 },
  { title: "Seal Type", id: "firstSealType", group: "Container", width: 120 },
  {
    title: "2nd Seal #",
    id: "secondSealNumber",
    group: "Container",
    width: 120,
  },
  {
    title: "Seal Kind",
    id: "secondSealKind",
    group: "Container",
    width: 140,
  },
  {
    title: "Seal Type",
    id: "secondSealType",
    group: "Container",
    width: 120,
  },
  { title: "Package", id: "packageQuantity", group: "Container", width: 120 },
  { title: "Unit", id: "packageType", group: "Container", width: 88 },
  { title: "Weight", id: "packageWeight", group: "Container", width: 120 },
  { title: "Unit", id: "packageWeightUnit", group: "Container", width: 88 },
  {
    title: "Measure",
    id: "packageMeasurement",
    group: "Container",
    width: 120,
  },
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
    width: 120,
  },
  {
    title: "Unit",
    id: "cargoPackageUnit",
    group: "Cargo Information",
    width: 88,
  },
  {
    title: "Weight",
    id: "cargoWeight",
    group: "Cargo Information",
    width: 120,
  },
  {
    title: "Unit",
    id: "cargoWeightUnit",
    group: "Cargo Information",
    width: 88,
  },

  {
    title: "Measure",
    id: "cargoMeasurement",
    group: "Cargo Information",
    width: 120,
  },
  {
    title: "Unit",
    id: "cargoMeasurementUnit",
    group: "Cargo Information",
    width: 88,
  },
  {
    title: "HTS Code US",
    id: "htsCodeUS",
    group: "Customs Information",
    width: 120,
  },
  {
    title: "HIS Code EU/ASIA",
    id: "hisCodeEUASIA",
    group: "Customs Information",
    width: 120,
  },
];
