import { faker } from "@faker-js/faker";
import { menuItems } from "../util/constants";
import {
	type BulkContainerInformationType,
	type ContainerInformationType,
	ContainerType,
	type DryContainerInformationType,
	type FlatRackContainerInformationType,
	type OpenTopContainerInformationType,
	type ReeferContainerInformationType,
	type TankContainerInformationType,
} from "../util/typeDef/booking";
import {
	type CargoManifestType,
	type SIContainerInputProps,
	SealKind,
} from "../util/typeDef/si";

export function FocusOnResult(
	areaRef: React.RefObject<HTMLDivElement>,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	scrollInstance: any,
	additionalHeight?: number,
) {
	const areaHeight = areaRef.current?.clientHeight || 200;
	setTimeout(() => {
		if (scrollInstance) {
			scrollInstance()
				?.elements()
				.viewport?.scrollTo({
					top: areaHeight + (additionalHeight || 80),
					behavior: "smooth",
				});
		}
	}, 100);
}

export function getRoutePath(paths: string[]) {
	let itemTree = menuItems;
	const pathList = Object.assign([], paths).slice(2);
	const routes: string[] = [];

	while (pathList.length > 0) {
		const currentPath = pathList.shift();
		const currentItem = itemTree.find((item) => item.link === currentPath);
		if (currentItem?.subMenu) {
			routes.push(currentItem.name);
			itemTree = currentItem.subMenu;
		}
	}

	return routes;
}

export function getEmptyCargoManifest() {
	return {
		packageType: "",
		packageQuantity: 0,
		weight: 0,
		measurement: 0,
		cargoInformation: {
			description: "",
		},
		commodityCode: {
			htsCodeUS: "",
			hisCodeEUASIA: "",
		},
	} as CargoManifestType;
}

export function getEmptySIEditContainerData(type: ContainerType) {
	return {
		uuid: faker.string.uuid(),
		containerType: type,
		containerSize: "20",
		containerNumber: "",
		isSocContainer: false,
		// firstSeal: {
		//   kind: SealKind.Shipper,
		//   type: "merchanical",
		//   description: "",
		// },
		// secondSeal: {
		//   kind: SealKind.Shipper,
		//   type: "merchanical",
		//   description: "",
		// },
		sealData: [
			{
				index: 0,
				sealNumber: "",
				sealKind: "",
				sealType: "",
			},
		],
		packageType: "",
		packageQuantity: undefined,
		packageWeight: undefined,
		packageMeasurement: undefined,
		hasCargoManifest: false,
		cargoManifest: [],
	} as SIContainerInputProps;
}

export function getEmptyContainerData(
	type: ContainerType,
	sizeOptions?: string[],
) {
	switch (type) {
		case ContainerType.dry:
			return {
				uuid: faker.string.uuid(),
				type: ContainerType.dry,
				size: sizeOptions ? sizeOptions[0] : "",
				soc: 0,
				quantity: 1,
				isDangerous: false,
				isSeparated: false,
				dangerousCargoInformation: [],
			} as DryContainerInformationType;
		case ContainerType.reefer:
			return {
				uuid: faker.string.uuid(),
				type: ContainerType.reefer,
				size: sizeOptions ? sizeOptions[0] : "",
				soc: 0,
				quantity: 1,
				temperature: undefined,
				temperatureUnit: "℃",
				ventilation: undefined,
				ventilationType: "open",
				nature: "",
				humidity: undefined,
				genset: false,
				isDangerous: false,
				isSeparated: false,
				dangerousCargoInformation: [],
			} as ReeferContainerInformationType;
		case ContainerType.opentop:
			return {
				uuid: faker.string.uuid(),
				type: ContainerType.opentop,
				size: sizeOptions ? sizeOptions[0] : "",
				soc: 0,
				quantity: 1,
				isAwkward: false,
				package: undefined,
				packageType: "",
				grossWeight: undefined,
				grossWeightUnit: "KGS",
				netWeight: undefined,
				netWeightUnit: "KGS",
				awkward: {
					commodity: {
						code: "",
						description: "",
					},
					length: undefined,
					width: undefined,
					height: undefined,
					unit: "CM",
					remark: "",
				},
				isDangerous: false,
				isSeparated: false,
				dangerousCargoInformation: [],
			} as OpenTopContainerInformationType;
		case ContainerType.flatrack:
			return {
				uuid: faker.string.uuid(),
				type: ContainerType.flatrack,
				size: sizeOptions ? sizeOptions[0] : "",
				soc: 0,
				quantity: 1,
				isAwkward: false,
				package: undefined,
				packageType: "",
				grossWeight: undefined,
				grossWeightUnit: "KGS",
				netWeight: undefined,
				netWeightUnit: "KGS",
				awkward: {
					commodity: {
						code: "",
						description: "",
					},
					length: undefined,
					width: undefined,
					height: undefined,
					unit: "CM",
					remark: "",
				},
				isDangerous: false,
				isSeparated: false,
				dangerousCargoInformation: [],
			} as FlatRackContainerInformationType;
		case ContainerType.tank:
			return {
				uuid: faker.string.uuid(),
				type: ContainerType.tank,
				size: sizeOptions ? sizeOptions[0] : "",
				soc: 0,
				quantity: 1,
				isDangerous: false,
				isSeparated: false,
				dangerousCargoInformation: [],
			} as TankContainerInformationType;
		case ContainerType.bulk:
			return {
				uuid: faker.string.uuid(),
				type: ContainerType.bulk,
				commodity: {
					code: "",
					description: "",
				},
				grossWeight: undefined,
				grossWeightUnit: "KGS",
				netWeight: undefined,
				netWeightUnit: "KGS",
				package: undefined,
				packageType: "",
				height: undefined,
				width: undefined,
				length: undefined,
				unit: "CM",
				remark: "",
				totalMeasurement: undefined,
			} as BulkContainerInformationType;
		default:
			return {} as ContainerInformationType;
	}
}

export function sumContainerWeight(siContainers: SIContainerInputProps[]) {
	return siContainers
		.reduce((acc, container) => {
			return acc + (container.packageWeight ?? 0);
		}, 0)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function sumContainerQuantity(siContainers: SIContainerInputProps[]) {
	return siContainers
		.reduce((acc, container) => {
			return acc + (container.packageQuantity ?? 0);
		}, 0)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function sumContainerMeasurement(siContainers: SIContainerInputProps[]) {
	return siContainers
		.reduce((acc, container) => {
			return acc + (container.packageMeasurement ?? 0);
		}, 0)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getNumberWithCommas(num: number) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
