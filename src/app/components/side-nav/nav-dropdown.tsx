import {
  MdElevation,
  MdFilledIconButton,
  MdIcon,
  MdIconButton,
  MdRippleEffect,
} from "@/app/util/md3";
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  autoUpdate,
  safePolygon,
  useClick,
  useDismiss,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useRole,
  useFloating,
  offset,
  flip,
  shift,
  arrow,
} from "@floating-ui/react";
import React, { CSSProperties, useRef } from "react";
import { menuItems } from "@/app/util/constants";
import { MdTypography } from "../typography";
import PlaceholdeIcon from "@/../public/icon_tracking_outlined.svg";
import DropDownArrow from "@/../public/img_dropdown_arrow.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter } from "next/navigation";
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
import { MenuIconButton } from "./menu-button";
import { OpenInNew } from "@mui/icons-material";

export const DropdownMenu = () => {
  return menuItems.map((item) => (
    <FloatingTree key={item.id}>
      <MenuComponent item={item} path={[item.link || ""]} />
    </FloatingTree>
  ));
};

const MenuComponent = ({
  item,
  path,
}: {
  item: MenuItemType;
  path: string[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const nodeId = useFloatingNodeId();
  const arrowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isNested = parentId != null;

  const { floatingStyles, refs, context, middlewareData } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start",
    middleware: [offset(15), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss]
  );

  React.useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  // Placeholder Icon
  // const itemIcon = <PlaceholdeIcon />;

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
  }[item.name];

  return (
    <FloatingNode id={nodeId}>
      {isNested ? (
        <div
          className="relative h-10 flex items-center pl-4 pr-2.5 cursor-pointer rounded-lg"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <MdRippleEffect />
          <MdTypography variant="label" size="large" className="flex-1">
            {item.name}
          </MdTypography>
          <MdIcon className="w-5 h-5 ml-8">
            <ChevronRightIcon fontSize="small" />
          </MdIcon>
        </div>
      ) : item.subMenu && item.subMenu.length > 0 ? (
        <div ref={refs.setReference} {...getReferenceProps()}>
          <MenuIconButton
            icon={itemIcon}
            isSelected={
              item.link !== undefined && pathname.includes("/main/" + item.link)
            }
            isFocused={isOpen}
          />
        </div>
      ) : (
        <MenuIconButton
          icon={itemIcon}
          isSelected={
            isOpen ||
            (item.link !== undefined && pathname.includes("/main/" + item.link))
          }
          onClick={(e) => {
            console.log(item.link);
            (item.subMenu === undefined || item.subMenu.length === 0) &&
              item.link &&
              router.push("/main/" + path.join("/"));
          }}
        />
      )}
      {item.subMenu && item.subMenu.length > 0 && isOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            returnFocus={false}
          >
            <div
              ref={refs.setFloating}
              className="flex flex-col bg-white rounded-lg relative z-10 w-[308px] max-w-[308px]"
              style={
                {
                  "--md-elevation-level": 4,
                  ...floatingStyles,
                } as CSSProperties
              }
              {...getFloatingProps()}
            >
              <MdElevation />
              {!isNested && (
                <>
                  <div className="h-9 flex items-center bg-secondaryContainer rounded-t-lg">
                    <MdTypography
                      variant="label"
                      size="large"
                      prominent
                      className="flex-1 px-4 text-outline"
                    >
                      {item.name}
                    </MdTypography>
                  </div>
                  <div className="w-full h-px bg-surfaceVariant"></div>
                </>
              )}
              <div className="flex flex-col mx-2 my-1">
                {item.subMenu.map((subItem) =>
                  subItem.subMenu && subItem.subMenu.length > 0 ? (
                    <MenuComponent
                      key={subItem.id}
                      item={subItem}
                      path={[...path, subItem.link || ""]}
                    />
                  ) : (
                    <div
                      key={subItem.id}
                      className="group relative h-10 flex items-center pl-4 cursor-pointer rounded-lg hover:font-semibold hover:bg-surfaceContainerLow"
                      role="menuitem"
                      {...getItemProps({
                        onClick(event) {
                          router.push(
                            "/main/" + [...path, subItem.link || ""].join("/")
                          );
                          tree?.events.emit("click");
                        },
                      })}
                    >
                      {/* <MdRippleEffect /> */}
                      <MdTypography
                        variant="body"
                        size="medium"
                        className="flex-1"
                      >
                        {subItem.name}
                      </MdTypography>
                      <MdIconButton
                        className="group-hover:visible group-hover:opacity-100 invisible opacity-0"
                        onClick={() => {
                          // open in new tab
                          window.open(
                            "/main/" + [...path, subItem.link || ""].join("/"),
                            "_blank"
                          );
                        }}
                      >
                        <OpenInNew
                          fontSize="small"
                          className="text-outlineVariant"
                        />
                      </MdIconButton>
                      {/* <MdIcon className="w-1 h-1 ml-8 rounded-full bg-surfaceVariant"></MdIcon> */}
                    </div>
                  )
                )}
              </div>

              <div
                ref={arrowRef}
                className={`absolute left-${middlewareData.arrow?.x} top-${middlewareData.arrow?.y} w-4 h-4 -ml-6 -mt-1 text-secondaryContainer`}
              >
                <DropDownArrow />
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </FloatingNode>
  );
};
