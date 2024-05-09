"use client";

import { MenuItemType } from "@/app/util/typeDef/generic";
import DashboardIcon from "@/../public/icon_menu_dashboard.svg";
import ScheduleIcon from "@/../public/icon_menu_schedule.svg";
import BookingIcon from "@/../public/icon_menu_booking.svg";
import PricingIcon from "@/../public/icon_menu_pricing.svg";
import DocumentsIcon from "@/../public/icon_menu_documents.svg";
import TrackTraceIcon from "@/../public/icon_menu_tracktrace.svg";
import ImportIcon from "@/../public/icon_menu_import.svg";
import ManageShipmentIcon from "@/../public/icon_menu_manage_shipment.svg";
import DententionIcon from "@/../public/icon_menu_dentention.svg";
import SubsumIndicator from "@/../public/icon_subsum_indicator.svg";

import { menuItems } from "@/app/util/constants";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/components/divider";
import { MdRippleEffect } from "@/app/util/md3";

export default function Sitemap() {
  return (
    <div className="p-6 h-full grid grid-cols-4 gap-2 mx-4 overflow-auto">
      {menuItems
        .filter((item) => item.id !== "dashboard")
        .map((item) => {
          return <CategoryItem key={item.id} {...item} />;
        })}
    </div>
  );
}

const CategoryItem = (props: MenuItemType) => {
  const itemIcon = {
    Dashboard: <DashboardIcon />,
    Schedule: <ScheduleIcon />,
    Booking: <BookingIcon />,
    Pricing: <PricingIcon />,
    Documents: <DocumentsIcon />,
    "Track & Trace": <TrackTraceIcon />,
    "Import (Inbound)": <ImportIcon />,
    "Manage Shipment": <ManageShipmentIcon />,
    "Detention & Demurrage": <DententionIcon />,
  }[props.name];

  return (
    <div>
      <div className="flex gap-4 items-center px-8 py-4">
        <div className="w-fit">{itemIcon}</div>
        <MdTypography
          variant="title"
          size="medium"
          className="whitespace-nowrap"
        >
          {props.name}
        </MdTypography>
        <DividerComponent />
      </div>
      <div className="px-4">
        {props.subMenu?.map((subItem) => {
          return (
            <div
              key={subItem.id}
              className="p-4 flex items-center gap-4 relative rounded-full cursor-pointer hover:bg-secondaryContainer"
            >
              <MdRippleEffect />
              <SubsumIndicator />
              <MdTypography variant="body" size="large">
                {subItem.name}
              </MdTypography>
            </div>
          );
        })}
      </div>
    </div>
  );
};
