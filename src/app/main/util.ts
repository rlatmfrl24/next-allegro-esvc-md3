import { DashboardCardInfoType, MenuItemType } from "../util/typeDef";

// TODO: 추후에 API로 받아올 예정
export const meunItems: MenuItemType[] = [
  {
    name: "Dashboard",
    children: [],
    isLeaf: true,
  },
  {
    name: "Schedule",
    children: [
      {
        name: "Point to Point Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "Vessel Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "Port Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "Long Range Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "My Schedule",
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    name: "Booking",
    children: [
      {
        name: "Booking Request",
        children: [],
        isLeaf: true,
      },
      {
        name: "Booking Status",
        children: [],
        isLeaf: true,
      },
      {
        name: "Booking Template",
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    name: "Documentation",
    children: [
      {
        name: "Shipping Instruction",
        children: [
          {
            name: "SI Submission & Amendment",
            children: [],
            isLeaf: true,
          },
          {
            name: "SI Template",
            children: [],
            isLeaf: true,
          },
        ],
        isLeaf: false,
      },
      {
        name: "B/L Processing",
        children: [
          {
            name: "Draft N/N B/L",
            children: [],
            isLeaf: true,
          },
          {
            name: "Sea Waybill Print",
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
    children: [
      {
        name: "Cargo Tracking",
        children: [],
        isLeaf: true,
      },
    ],
    isLeaf: false,
  },
  {
    name: "Manage Shipment",
    children: [
      {
        name: "Shipment Overview",
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
