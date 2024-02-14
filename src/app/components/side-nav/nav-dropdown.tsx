import { MdIcon, MdIconButton, MdTextButton } from "@/app/util/md3";
import { MenuItemType } from "@/app/util/typeDef";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
  useFloating,
} from "@floating-ui/react";
import React, { useEffect } from "react";
import PlaceholdeIcon from "@/../public/icon_tracking_outlined.svg";

const MenuContext = React.createContext<{
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  isOpen: false,
});

interface MenuProps {
  label: string;
  nested?: boolean;
  children?: React.ReactNode;
}

interface MenuItemProps {
  label: string;
  disabled?: boolean;
}

export const MenuItem = React.forwardRef<
  HTMLButtonElement,
  MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function MenuItem({ label, disabled, ...props }, forwardedRef) {
  const menu = React.useContext(MenuContext);
  const tree = useFloatingTree();

  return (
    <button
      {...props}
      ref={useMergeRefs([forwardedRef])}
      type="button"
      role="menuitem"
      disabled={disabled}
      {...menu.getItemProps({
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          props.onClick?.(event);
          tree?.events.emit("click");
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event);
          menu.setHasFocusInside(true);
        },
      })}
    >
      {label}
    </button>
  );
});

export const MenuComponent = ({ item }: { item: MenuItemType }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const nodeId = useFloatingNodeId();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start",
    middleware: [],
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
  const itemIcon = <PlaceholdeIcon />;

  return (
    <FloatingTree>
      <FloatingNode id={nodeId}>
        {isNested ? (
          <MdTextButton ref={refs.setReference} {...getReferenceProps()}>
            {item.name}
          </MdTextButton>
        ) : (
          <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
            <MdIcon>{itemIcon}</MdIcon>
          </MdIconButton>
        )}
        {item.subMenu && item.subMenu.length > 0 && isOpen && (
          <FloatingPortal>
            <FloatingFocusManager
              context={context}
              modal={false}
              initialFocus={isNested ? -1 : 0}
              returnFocus={!isNested}
            >
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {item.subMenu.map((subItem, index) =>
                  subItem.subMenu && subItem.subMenu.length > 0 ? (
                    <MenuComponent key={subItem.id} item={subItem} />
                  ) : (
                    <MenuItem
                      key={subItem.id}
                      label={subItem.name}
                      {...getItemProps()}
                    />
                  )
                )}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </FloatingNode>
    </FloatingTree>
  );
};
