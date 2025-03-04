import { DateTime } from "luxon";
import { atom, selector } from "recoil";
import {
	type ContactInformationType,
	type LocationScheduleType,
	type PartiesType,
	type PartyInterface,
	type CargoPickUpReturnType,
	type CommodityType,
	type AdditionalInformatioType,
	type BookingInformationRequestType,
	ContainerInformationType,
	type ReeferContainerInformationType,
	type DryContainerInformationType,
	type TankContainerInformationType,
	type OpenTopContainerInformationType,
	type FlatRackContainerInformationType,
	type BulkContainerInformationType,
	type BookingStatusTableProps,
	type BookingTemplateProps,
	type MergeTableType,
	type SplitTableType,
} from "../util/typeDef/booking";
import type {
	PlaceInformationType,
	VesselInfoType,
} from "../util/typeDef/schedule";
import { createDummyBooking } from "../main/booking/template/components/util";

export const resetBookingState = selector({
	key: "resetBookingState",
	get: ({ get }) => {
		get(LocationScheduleState);
		get(PartiesState);
		get(CargoPickUpReturnState);
		get(AdditionalInformationState);
		get(ContactInformationState);
		get(ContainerState);
	},
	set: ({ set }) => {
		set(LocationScheduleState, {
			searchType: "schedule",
			originPort: {} as PlaceInformationType,
			destinationPort: {} as PlaceInformationType,
			originType: "cy",
			destinationType: "cy",
			pol: {} as PlaceInformationType,
			pod: {} as PlaceInformationType,
			departureDate: DateTime.now(),
			vessel: {} as VesselInfoType,
			bookingOffice: "",
			contractNumber: "",
		} as LocationScheduleType);
		set(PartiesState, {
			personPlacingRequest: "Shipper",
			shipper: {
				name: "",
				address: "",
			} as PartyInterface,
			freightForwarder: {
				name: "",
				address: "",
			} as PartyInterface,
			consignee: {
				name: "",
				address: "",
			} as PartyInterface,
			actualShipper: "",
		} as PartiesType);
		set(CargoPickUpReturnState, {
			commodity: {
				code: "",
				description: "",
			} as CommodityType,
			grossWeight: "0",
			grossWeightUnit: "KGS",
			emptyPickUpDate: undefined,
			fullReturnDate: undefined,
			emptyPickUpLocation: {
				code: "",
				yardName: "",
				address: "",
				phoneNo: "",
				faxNo: "",
				customerNo: "",
				emailAddress: "",
			} as PlaceInformationType,
			fullReturnLocation: {
				code: "",
				yardName: "",
				address: "",
				phoneNo: "",
				faxNo: "",
				customerNo: "",
				emailAddress: "",
			} as PlaceInformationType,
		} as CargoPickUpReturnType);
		set(AdditionalInformationState, {
			attachment: [],
			specialCargoAttachment: {
				awkwardCargo: [],
				dangerousCargo: [],
				reeferCargo: [],
			},
			specialInstruction: "",
			duplicateCount: 1,
			emailSubscription: {
				rollOver: false,
				vesselAdvanceDelay: false,
				vesselDeparture: false,
			},
		} as AdditionalInformatioType);
		set(ContactInformationState, {
			name: "",
			email: "",
			address: "",
			telNo: "",
			faxNo: "",
			emailRecipient: [],
		} as ContactInformationType);
		set(ContainerState, {
			dry: [],
			reefer: [],
			tank: [],
			opentop: [],
			flatrack: [],
			bulk: [],
		});
		set(BookingRequestStepState, {
			locationSchedule: {
				id: "locationSchedule",
				title: "Location & Schedule",
				isSelected: true,
				isCompleted: false,
				visited: false,
			},
			parties: {
				id: "parties",
				title: "Parties",
				isSelected: false,
				isCompleted: false,
				visited: false,
			},
			cargoPickUpReturn: {
				id: "cargoPickUpReturn",
				title: "Cargo & Pick Up/Return",
				isSelected: false,
				isCompleted: false,
				visited: false,
			},
			container: {
				id: "container",
				title: "Container",
				isSelected: false,
				isCompleted: false,
				visited: false,
			},
			additionalInformation: {
				id: "additionalInformation",
				title: "Addtional Information",
				isSelected: false,
				isCompleted: false,
				visited: false,
			},
			contactInformation: {
				id: "contactInformation",
				title: "Contact Information",
				isSelected: false,
				isCompleted: false,
				visited: false,
			},
		});
	},
});

export const CurrentBookingDataState = atom<
	BookingStatusTableProps | undefined
>({
	key: "currentBookingDataState",
	default: undefined,
});

export const BookingRequestStepState = atom({
	key: "bookingRequestStepState",
	default: {
		locationSchedule: {
			id: "locationSchedule",
			title: "Location & Schedule",
			isSelected: true,
			isCompleted: false,
			visited: false,
		},
		parties: {
			id: "parties",
			title: "Parties",
			isSelected: false,
			isCompleted: false,
			visited: false,
		},
		cargoPickUpReturn: {
			id: "cargoPickUpReturn",
			title: "Cargo & Pick Up/Return",
			isSelected: false,
			isCompleted: false,
			visited: false,
		},
		container: {
			id: "container",
			title: "Container",
			isSelected: false,
			isCompleted: false,
			visited: false,
		},
		additionalInformation: {
			id: "additionalInformation",
			title: "Addtional Information",
			isSelected: false,
			isCompleted: false,
			visited: false,
		},
		contactInformation: {
			id: "contactInformation",
			title: "Contact Information",
			isSelected: false,
			isCompleted: false,
			visited: false,
		},
	},
});

export const ContactInformationState = atom<ContactInformationType>({
	key: "contactInformationState",
	default: {
		name: "",
		email: "",
		address: "",
		telNo: "",
		faxNo: "",
		emailRecipient: [],
	},
});

export const LocationScheduleState = atom<LocationScheduleType>({
	key: "locationScheduleState",
	default: {
		searchType: "schedule",
		originPort: {} as PlaceInformationType,
		destinationPort: {} as PlaceInformationType,
		originType: "cy",
		destinationType: "cy",
		pol: {} as PlaceInformationType,
		pod: {} as PlaceInformationType,
		departureDate: DateTime.now(),
		vessel: {} as VesselInfoType,
		bookingOffice: "",
		contractNumber: "",
	},
});

export const PartiesState = atom<PartiesType>({
	key: "partiesState",
	default: {
		personPlacingRequest: "Shipper",
		shipper: {
			name: "",
			address: "",
		} as PartyInterface,
		freightForwarder: {
			name: "",
			address: "",
		} as PartyInterface,
		consignee: {
			name: "",
			address: "",
		} as PartyInterface,
		actualShipper: "",
	},
});

export const CargoPickUpReturnState = atom<CargoPickUpReturnType>({
	key: "cargoPickUpReturnState",
	default: {
		commodity: {
			code: "",
			description: "",
		} as CommodityType,
		grossWeight: "",
		grossWeightUnit: "KGS",
		emptyPickUpDate: undefined,
		fullReturnDate: undefined,
		emptyPickUpLocation: {
			code: "",
			yardName: "",
			address: "",
			phoneNo: "",
			faxNo: "",
			customerNo: "",
			emailAddress: "",
		} as PlaceInformationType,
		fullReturnLocation: {
			code: "",
			yardName: "",
			address: "",
			phoneNo: "",
			faxNo: "",
			customerNo: "",
			emailAddress: "",
		} as PlaceInformationType,
	},
});

export const AdditionalInformationState = atom<AdditionalInformatioType>({
	key: "etcDataState",
	default: {
		attachment: [],
		specialCargoAttachment: {
			awkwardCargo: [],
			dangerousCargo: [],
			reeferCargo: [],
		},
		specialInstruction: "",
		duplicateCount: 1,
		emailSubscription: {
			rollOver: false,
			vesselAdvanceDelay: false,
			vesselDeparture: false,
		},
	},
});

export const ContainerState = atom<{
	dry: DryContainerInformationType[];
	reefer: ReeferContainerInformationType[];
	tank: TankContainerInformationType[];
	opentop: OpenTopContainerInformationType[];
	flatrack: FlatRackContainerInformationType[];
	bulk: BulkContainerInformationType[];
}>({
	key: "containerState",
	default: {
		dry: [],
		reefer: [],
		tank: [],
		opentop: [],
		flatrack: [],
		bulk: [],
	},
});

export const BookingInformationState = atom<BookingInformationRequestType[]>({
	key: "bookingInformationState",
	default: [],
});

export const BookingTemplateListState = atom<BookingTemplateProps[]>({
	key: "bookingTemplateListState",
	default: [
		{
			name: "Template 1",
			information: createDummyBooking(),
		},
		{
			name: "Template 2",
			information: createDummyBooking(),
		},
		{
			name: "Template 3",
			information: createDummyBooking(),
		},
	],
});

export const BookingMergeState = atom<MergeTableType[]>({
	key: "bookingMergeState",
	default: [],
});

export const BookingMergeSelector = selector({
	key: "bookingMergeSelector",
	get: ({ get }) => {
		const totalData = get(BookingMergeState);
		const result = totalData.reduce(
			(acc, cur) => {
				const mergedContainers = cur.containers.reduce((acc, cur) => {
					const index = acc.findIndex(
						(t) => t.type === cur.type && t.size === cur.size,
					);
					if (index !== -1) {
						acc.splice(index, 1, {
							...acc[index],
							quantity: acc[index].quantity + cur.quantity,
						});
					} else {
						acc.push(cur);
					}
					return acc;
				}, acc.containers);

				// acc.bookingNumber = acc.bookingNumber;
				acc.totalWeight = (
					Number.parseInt(acc.totalWeight) + Number.parseInt(cur.totalWeight)
				).toString();
				acc.containers = mergedContainers;
				// acc.emptyPickupPlace = acc.emptyPickupPlace;
				// acc.emptyPickupDate = acc.emptyPickupDate;
				return acc;
			},
			{
				bookingNumber: totalData[0].bookingNumber,
				totalWeight: "0",
				containers: [],
				emptyPickupPlace: totalData[0].emptyPickupPlace,
				emptyPickupDate: totalData[0].emptyPickupDate,
			} as MergeTableType,
		);

		return [result];
	},
});

export const BookingSplitState = atom<SplitTableType[]>({
	key: "bookingSplitState",
	default: [],
});
