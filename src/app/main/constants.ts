import { DashboardCardInfoType, MenuItemType } from "../util/typeDef";

// TODO: 추후에 API로 받아올 예정
export const meunItems: MenuItemType[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    children: [],
    isLeaf: true,
  },
  {
    name: "Schedule",
    path: "schedule",
    children: [
      {
        name: "Point to Point Schedule",
        path: "ptp",
        children: [],
        isLeaf: true,
      },
      {
        name: "Vessel Schedule",
        path: "vessel",
        children: [],
        isLeaf: true,
      },
      {
        name: "Port Schedule",
        path: "port",
        children: [],
        isLeaf: true,
      },
      {
        name: "Long Range Schedule",
        path: "long-range",
        children: [],
        isLeaf: true,
      },
      {
        name: "My Schedule",
        path: "my-schedule",
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    name: "Booking",
    path: "booking",
    children: [
      {
        name: "Booking Request",
        path: "request",
        children: [],
        isLeaf: true,
      },
      {
        name: "Booking Status",
        path: "status",
        children: [],
        isLeaf: true,
      },
      {
        name: "Booking Template",
        path: "template",
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    name: "Documentation",
    path: "documentation",
    children: [
      {
        name: "Shipping Instruction",
        path: "si",
        children: [
          {
            name: "SI Submission & Amendment",
            path: "submission",
            children: [],
            isLeaf: true,
          },
          {
            name: "SI Template",
            path: "template",
            children: [],
            isLeaf: true,
          },
        ],
        isLeaf: false,
      },
      {
        name: "B/L Processing",
        path: "bl-processing",
        children: [
          {
            name: "Draft N/N B/L",
            path: "draft",
            children: [],
            isLeaf: true,
          },
          {
            name: "Sea Waybill Print",
            path: "sea-waybill",
            children: [],
            isLeaf: true,
          },
        ],
        isLeaf: false,
      },
    ],
    isLeaf: false,
  },
  {
    name: "Tracking",
    path: "tracking",
    children: [
      {
        name: "Cargo Tracking",
        path: "cargo",
        children: [],
        isLeaf: true,
      },
    ],
    isLeaf: false,
  },
  {
    name: "Manage Shipment",
    path: "shipment",
    children: [
      {
        name: "Shipment Overview",
        path: "overview",
        children: [],
        isLeaf: true,
      },
    ],
    isLeaf: false,
  },
];

export const cardList: DashboardCardInfoType[] = [
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
    id: "bl_information",
    title: "B/L Information",
    size: 1,
    type: "statistic",
  },
  {
    id: "booking",
    title: "Booking",
    size: 1,
    type: "chart",
  },
  {
    id: "shipping_instruction",
    title: "Shipping Instruction",
    size: 1,
    type: "chart",
  },
  {
    id: "tracking",
    title: "Tracking",
    size: 2,
    type: "etc",
  },
  {
    id: "attachment",
    title: "Attachment",
    size: 2,
    type: "etc",
  },
  {
    id: "notice",
    title: "Notice",
    size: 2,
    type: "etc",
  },
  {
    id: "schedule",
    title: "Schedule",
    size: 2,
    type: "etc",
  },
];

export const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
