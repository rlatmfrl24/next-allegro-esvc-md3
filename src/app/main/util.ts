import { faker } from "@faker-js/faker";
import { menuItems } from "../util/constants";
import {
  BulkContainerInformationType,
  ContainerInformationType,
  ContainerType,
  DryContainerInformationType,
  FlatRackContainerInformationType,
  OpenTopContainerInformationType,
  ReeferContainerInformationType,
  TankContainerInformationType,
} from "../util/typeDef/boooking";

export function getRoutePath(paths: string[]) {
  let itemTree = menuItems;
  let pathList = Object.assign([], paths).slice(2);
  const routes: string[] = [];

  while (pathList.length > 0) {
    let currentPath = pathList.shift();
    let currentItem = itemTree.find((item) => item.link === currentPath);
    if (currentItem && currentItem.subMenu) {
      routes.push(currentItem.name);
      itemTree = currentItem.subMenu;
    }
  }

  return routes;
}

export function getEmptyContainerData(type: ContainerType) {
  switch (type) {
    case ContainerType.dry:
      return {
        uuid: faker.string.uuid(),
        type: ContainerType.dry,
        size: "20",
        soc: 0,
        quantity: 0,
        isDangerous: false,
        dangerousCargoInformation: {
          unNumber: "",
          class: "",
          flashPoint: "",
          packingGroup: "",
          properShippingName: "",
          dangerousCargoCertificate: [],
        },
      } as DryContainerInformationType;
    case ContainerType.reefer:
      return {
        uuid: faker.string.uuid(),
        type: ContainerType.reefer,
        size: "20",
        soc: 0,
        quantity: 0,
        temperature: 0,
        temperatureUnit: "℃",
        ventilation: 0,
        ventilationType: "open",
        nature: "",
        humidity: 0,
        genset: false,
        isDangerous: false,
        dangerousCargoInformation: {
          unNumber: "",
          class: "",
          flashPoint: "",
          packingGroup: "",
          properShippingName: "",
          dangerousCargoCertificate: [],
        },
      } as ReeferContainerInformationType;
    case ContainerType.opentop:
      return {
        uuid: faker.string.uuid(),
        type: ContainerType.opentop,
        size: "20",
        soc: 0,
        quantity: 0,
        isAwkward: false,
        awkward: {
          package: 0,
          packageType: "",
          grossWeight: 0,
          grossWeightUnit: "KGS",
          netWeight: 0,
          netWeightUnit: "KGS",
          commodity: {
            code: "",
            description: "",
          },
          length: 0,
          width: 0,
          height: 0,
          unit: "CM",
          remark: "",
        },
        isDangerous: false,
        dangerousCargoInformation: {
          unNumber: "",
          class: "",
          flashPoint: "",
          packingGroup: "",
          properShippingName: "",
          dangerousCargoCertificate: [],
        },
      } as OpenTopContainerInformationType;
    case ContainerType.flatrack:
      return {
        uuid: faker.string.uuid(),
        type: ContainerType.flatrack,
        size: "20",
        soc: 0,
        quantity: 0,
        isAwkward: false,
        awkward: {
          package: 0,
          packageType: "",
          grossWeight: 0,
          grossWeightUnit: "KGS",
          netWeight: 0,
          netWeightUnit: "KGS",
          commodity: {
            code: "",
            description: "",
          },
          length: 0,
          width: 0,
          height: 0,
          unit: "CM",
          remark: "",
        },
        isDangerous: false,
        dangerousCargoInformation: {
          unNumber: "",
          class: "",
          flashPoint: "",
          packingGroup: "",
          properShippingName: "",
          dangerousCargoCertificate: [],
        },
      } as FlatRackContainerInformationType;
    case ContainerType.tank:
      return {
        uuid: faker.string.uuid(),
        type: ContainerType.tank,
        size: "20",
        soc: 0,
        quantity: 0,
        isDangerous: false,
        dangerousCargoInformation: {
          unNumber: "",
          class: "",
          flashPoint: "",
          packingGroup: "",
          properShippingName: "",
          dangerousCargoCertificate: [],
        },
      } as TankContainerInformationType;
    case ContainerType.bulk:
      return {
        uuid: faker.string.uuid(),
        type: ContainerType.bulk,
        commodity: {
          code: "",
          description: "",
        },
        grossWeight: 0,
        grossWeightUnit: "KGS",
        package: 0,
        packageType: "",
        height: 0,
        width: 0,
        length: 0,
        unit: "CM",
        totalMeasurement: 0,
      } as BulkContainerInformationType;
    default:
      return {} as ContainerInformationType;
  }
}
