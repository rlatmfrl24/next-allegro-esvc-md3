import {
  SIContainerGridProps,
  SIContainerInputProps,
} from "@/app/util/typeDef/si";

export function parseData(store: {
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
        cargoWeightUnit: store.weightUnit,
        cargoMeasurement: undefined,
        cargoMeasurementUnit: store.measurementUnit,
        htsCodeUS: undefined,
        hisCodeEUASIA: undefined,
      });
    }
  });

  return dataset;
}
