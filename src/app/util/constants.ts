import { fa, faker } from "@faker-js/faker";
import {
  DashboardCardInfoType,
  DashboardStatisticCardDataType,
  MenuItemType,
} from "./typeDef/generic";

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
        id: "online_quote",
        name: "Online Quote",
        link: "online-quote",
        subMenu: [],
      },
      {
        id: "surcharge",
        name: "Surcharge Search",
        link: "surchage-search",
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
        name: "Search Cargo Status Search",
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
        id: "template",
        name: "Shipping Instruction Template",
        link: "template",
        subMenu: [],
      },
      {
        id: "draft",
        name: "Draft N/N B/L",
        link: "draft",
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
        id: "check",
        name: "B/L Check",
        link: "check",
        subMenu: [],
      },
      {
        id: "invoice",
        name: "Invoice",
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
    ],
  },
];

export const cardList: DashboardCardInfoType[] = [
  {
    id: "booking",
    title: "Booking",
    size: 1,
    type: "chart",
    data: [
      { key: "Accepted", value: faker.number.int(50) },
      { key: "Requested", value: faker.number.int(50) },
      { key: "Rejected", value: faker.number.int(50) },
      { key: "Cancelled", value: faker.number.int(50) },
    ],
    palette: [
      { key: "Accepted", value: "#196584" },
      { key: "Requested", value: "#71787D" },
      { key: "Rejected", value: "#BA1A1A" },
      { key: "Cancelled", value: "#8DCFF2" },
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
      { key: "Confirmed", value: "#196584" },
      { key: "Submit", value: "#71787D" },
      { key: "Rejected", value: "#BA1A1A" },
      { key: "Temporary Saved", value: "#8DCFF2" },
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
      { key: "Original B/L", value: "#196584" },
      { key: "Surredered B/L", value: "#8DCFF2" },
      { key: "Sea Waybill", value: "#C8C2EA" },
      { key: "Internet Original B.L", value: "#B5C9D7" },
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
