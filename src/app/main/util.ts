import { DashboardCardInfoType } from "../util/typeDef";

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

export function makeCardLayout(cardList: DashboardCardInfoType[]) {
  const cardLayout = [];
  let currentX = 0;
  let currentY = 0;
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i];
    if (currentX + card.size > 4) {
      currentX = 0;
      currentY += 1;
    }

    const layout = {
      i: card.id,
      x: currentX,
      y: currentY,
      w: card.size,
      h: 12,
      minW: 1,
      maxW: 2,
      isResizable: false,
    };
    currentX += card.size;

    cardLayout.push(layout);
  }
  return cardLayout;
}
