import { faker } from "@faker-js/faker";
import type {
	DashboardCardInfoType,
	DashboardStatisticCardDataType,
	MenuItemType,
} from "./typeDef/generic";
import type { CSSProperties } from "react";

export const LanguageOptions = ["English", "Korean", "Japanese", "Chinese"];

export const allowBeforeLoginMenus = [
	"/schedule/ptp",
	"/schedule/vessel",
	"/schedule/port",
	"/schedule/long-range",
	"/pricing/surcharge",
	"/tariff/dem-det",
	"/tracking/cargo",
];

// TODO: 추후에 API로 받아올 예정
export const menuItems: MenuItemType[] = [
	{
		id: "dashboard",
		name: "Dashboard",
		link: "dashboard",
		subMenu: [],
	},
	{
		id: "schedule",
		name: "Schedule",
		link: "schedule",
		subMenu: [
			{
				id: "ptp",
				name: "Point to Point Schedule",
				link: "ptp",
				subMenu: [],
			},
			{
				id: "vessel",
				name: "Vessel Schedule",
				link: "vessel",
				subMenu: [],
			},
			{
				id: "port",
				name: "Port Schedule",
				link: "port",
				subMenu: [],
			},
			{
				id: "long_range",
				name: "Long Range Schedule",
				link: "long-range",
				subMenu: [],
			},
			{
				id: "my",
				name: "My Schedule",
				link: "my",
				subMenu: [],
			},
		],
	},
	{
		id: "pricing",
		name: "Pricing",
		link: "pricing",
		subMenu: [
			{
				id: "quote",
				name: "Instant Quote",
				link: "quote",
				subMenu: [],
			},
			{
				id: "agreement",
				name: "My Agreement List",
				link: "agreement",
				subMenu: [],
			},
			{
				id: "surcharge",
				name: "Surcharge Search",
				link: "surcharge",
				subMenu: [],
			},
		],
	},
	{
		id: "booking",
		name: "Booking",
		link: "booking",
		subMenu: [
			{
				id: "request",
				name: "Booking Request",
				link: "request",
				subMenu: [],
			},
			{
				id: "status",
				name: "Booking Status",
				link: "status",
				subMenu: [],
			},
			{
				id: "template",
				name: "Booking Template",
				link: "template",
				subMenu: [],
			},
			{
				id: "special_cargo",
				name: "Special Cargo Status Search",
				link: "special-cargo",
				subMenu: [],
			},
			{
				id: "dg_restriction",
				name: "DG Restriction Search",
				link: "dg-restriction",
				subMenu: [],
			},
		],
	},
	{
		id: "documents",
		name: "Documents",
		link: "documents",
		subMenu: [
			{
				id: "si",
				name: "Shipping Instruction",
				link: "si",
				subMenu: [],
			},
			{
				id: "bl_issue_request",
				name: "B/L Issue Request",
				link: "bl-issue",
				subMenu: [],
			},
			{
				id: "bl_check_outbound",
				name: "B/L Check (Outbound)",
				link: "bl-check",
				subMenu: [],
			},
			{
				id: "sea_waybill",
				name: "Sea Waybill Print",
				link: "sea-waybill",
				subMenu: [],
			},
			{
				id: "vgm",
				name: "VGM",
				link: "vgm",
				subMenu: [],
			},
			{
				id: "tare",
				name: "Container Tare Finder",
				link: "tare",
				subMenu: [],
			},
			{
				id: "log",
				name: "Advanced Manifest Log",
				link: "log",
				subMenu: [],
			},
			{
				id: "invoice_outbound",
				name: "Invoice (Outbound)",
				link: "invoice",
				subMenu: [],
			},
		],
	},
	{
		id: "tracking",
		name: "Track & Trace",
		link: "tracking",
		subMenu: [
			{
				id: "cargo",
				name: "Cargo Tracking",
				link: "cargo",
				subMenu: [],
			},
			{
				id: "visibility_summary",
				name: "Visibility Summary",
				link: "visibility",
				subMenu: [],
			},
			{
				id: "my",
				name: "My Tracking",
				link: "my",
				subMenu: [],
			},
		],
	},
	{
		id: "import",
		name: "Import (Inbound)",
		link: "import",
		subMenu: [
			{
				id: "master",
				name: "Inbound Master",
				link: "master",
				subMenu: [],
			},
			{
				id: "surrender",
				name: "BL Surrender Check",
				link: "surrender",
				subMenu: [],
			},
			{
				id: "notice",
				name: "Arrival Notice",
				link: "notice",
				subMenu: [],
			},
			{
				id: "bl_check_inbound",
				name: "B/L Check (Inbound)",
				link: "bl-check",
				subMenu: [],
			},
			{
				id: "invoice_inbound",
				name: "Invoice (Inbound)",
				link: "invoice",
				subMenu: [],
			},
		],
	},
	{
		id: "shipment",
		name: "Manage Shipment",
		link: "shipment",
		subMenu: [
			{
				id: "overview",
				name: "Shipment Overview",
				link: "overview",
				subMenu: [],
			},
			{
				id: "report",
				name: "Report",
				link: "report",
				subMenu: [],
			},
			{
				id: "my_report",
				name: "My Report",
				link: "my-report",
				subMenu: [],
			},
		],
	},
	{
		id: "tariff",
		name: "Detention & Demurrage",
		link: "tariff",
		subMenu: [
			{
				id: "dem_det",
				name: "DEM/DET Tariff",
				link: "dem-det",
				subMenu: [],
			},
			{
				id: "inquiry",
				name: "Charge Inquiry",
				link: "inquiry",
				subMenu: [],
			},
			{
				id: "status",
				name: "Detention Status",
				link: "status",
				subMenu: [],
			},
			{
				id: "freetime",
				name: "Freetime Request",
				link: "freetime",
				subMenu: [],
			},
		],
	},
];

export const cardList: DashboardCardInfoType[] = [
	{
		id: "booking",
		title: "Booking",
		size: 1,
		type: "chart",
		// data: [
		//   { key: "Accepted", value: faker.number.int(50) },
		//   { key: "Requested", value: faker.number.int(50) },
		//   { key: "Rejected", value: faker.number.int(50) },
		//   { key: "Cancelled", value: faker.number.int(50) },
		// ],
		data: [
			{ key: "Accepted", value: 0 },
			{ key: "Requested", value: 0 },
			{ key: "Rejected", value: 0 },
			{ key: "Cancelled", value: 0 },
		],

		palette: [
			{ key: "Accepted", value: "--md-sys-color-primary" },
			{ key: "Requested", value: "--md-sys-color-outline" },
			{ key: "Rejected", value: "--md-sys-color-error" },
			{ key: "Cancelled", value: "--md-sys-color-primary-fixed-dim" },
		],
	} as DashboardStatisticCardDataType,
	{
		id: "shipping_instruction",
		title: "Shipping Instruction",
		size: 1,
		type: "chart",
		data: [
			{ key: "Confirmed", value: faker.number.int(50) },
			{ key: "Submit", value: faker.number.int(50) },
			{ key: "Rejected", value: faker.number.int(50) },
			{ key: "Temporary Saved", value: faker.number.int(50) },
		],
		palette: [
			{ key: "Confirmed", value: "--md-sys-color-primary" },
			{ key: "Submit", value: "--md-sys-color-outline" },
			{ key: "Rejected", value: "--md-sys-color-error" },
			{ key: "Temporary Saved", value: "--md-sys-color-primary-fixed-dim" },
		],
	},
	{
		id: "bl_information",
		title: "B/L Information",
		size: 1,
		type: "chart",
		data: [
			{ key: "Original B/L", value: faker.number.int(50) },
			{ key: "Surredered B/L", value: faker.number.int(50) },
			{ key: "Sea Waybill", value: faker.number.int(50) },
			{ key: "Internet Original B/L", value: faker.number.int(50) },
		],
		palette: [
			{ key: "Original B/L", value: "--md-sys-color-primary" },
			{ key: "Surredered B/L", value: "--md-sys-color-primary-fixed-dim" },
			{ key: "Sea Waybill", value: "--md-sys-color-outline-variant" },
			{
				key: "Internet Original B.L",
				value: "--md-sys-color-secondary-fixed-dim",
			},
		],
	} as DashboardStatisticCardDataType,
	{
		id: "outstanding_tasks",
		title: "Outstanding Tasks",
		size: 1,
		type: "etc",
	},
	{
		id: "bl_status",
		title: "B/L Status",
		size: 1,
		type: "input",
	},
	{
		id: "surrender_bl",
		title: "Surrender B/L",
		size: 1,
		type: "input",
	},
	{
		id: "demurrage_and_detention",
		title: "Demurrage & Detention",
		size: 1,
		type: "input",
	},
	{
		id: "delivery_order",
		title: "Delivery Order",
		size: 1,
		type: "input",
	},

	{
		id: "tracking",
		title: "Tracking",
		size: 2,
		type: "etc",
	},
	{
		id: "schedule",
		title: "Schedule",
		size: 4,
		type: "etc",
	},
	{
		id: "notice",
		title: "Notice",
		size: 2,
		type: "etc",
	},
];

export const getBasicDropdownStyles = (direction: "down" | "up") => {
	return {
		duration: {
			open: 200,
			close: 100,
		},
		initial: {
			opacity: 0,
			transformOrigin: direction === "down" ? "top" : "bottom",
			transform:
				direction === "down"
					? "scaleY(0.55) translateY(-10px)"
					: "scaleY(0.55) translateY(10px)",
		},
		open: {
			opacity: 1,
			transformOrigin: direction === "down" ? "top" : "bottom",
			transform: "scaleY(1) translateY(0)",
		},
		close: {
			opacity: 0,
			transformOrigin: direction === "down" ? "top" : "bottom",
			transform:
				direction === "down"
					? "scaleY(0.55) translateY(-10px)"
					: "scaleY(0.55) translateY(10px)",
		},
	};
};

export const basicDropdownStyles = {
	duration: {
		open: 200,
		close: 100,
	},
	initial: {
		opacity: 0,
		transformOrigin: "top",
		transform: "scaleY(0.55) translateY(-10px)",
	},
	open: {
		opacity: 1,
		transformOrigin: "top",
		transform: "scaleY(1) translateY(0)",
	},
	close: {
		opacity: 0,
		transformOrigin: "top",
		transform: "scaleY(0.55) translateY(-10px)",
	},
};

export const basicPopoverStyles = {
	duration: {
		open: 200,
		close: 150,
	},
	initial: { opacity: 0, transform: "translateY(-8px)" },
	open: { opacity: 1, transform: "translateY(0px)" },
	close: { opacity: 0, transform: "translateY(-8px)" },
};

export const tinyInputStyles = {
	"--md-sys-typescale-body-large-size": "14px",
	"--md-outlined-field-top-space": "6px",
	"--md-outlined-field-bottom-space": "6px",
} as CSSProperties;

export const tinySwitchStyles = {
	"--md-switch-track-height": "18px",
	"--md-switch-track-width": "32px",
	"--md-switch-handle-height": "12px",
	"--md-switch-handle-width": "12px",
	"--md-switch-selected-handle-height": "12px",
	"--md-switch-selected-handle-width": "12px",
	"--md-switch-pressed-handle-height": "12px",
	"--md-switch-pressed-handle-width": "12px",
	"--md-switch-state-layer-size": "18px",
} as CSSProperties;
