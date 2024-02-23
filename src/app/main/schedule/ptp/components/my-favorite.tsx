import { MdTypography } from "@/app/components/typography";
import { FavoriteRouteListState } from "@/app/store/ptp.store";
import {
  MdElevatedCard,
  MdFilledTonalButton,
  MdIconButton,
  MdList,
  MdListItem,
  MdTextButton,
} from "@/app/util/md3";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function MyFavorite({
  onSelection,
}: {
  onSelection?: (origin: string[], destination: string[]) => void;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [favoriteList, setFavoriteList] = useRecoilState(
    FavoriteRouteListState
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    placement: "bottom-end",
    onOpenChange: setIsPopoverOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useDismiss(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
    click,
  ]);

  return (
    <div className="z-10 relative">
      <MdFilledTonalButton
        ref={refs.setReference}
        {...getReferenceProps}
        className="h-fit mt-2"
        onClick={() => {
          setIsPopoverOpen(!isPopoverOpen);
        }}
      >
        My Favorite
      </MdFilledTonalButton>
      <FloatingFocusManager context={context} modal={true}>
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
        >
          <AnimatePresence>
            {isPopoverOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1 }}
              >
                <MdElevatedCard className="flex flex-col min-w-[720px]">
                  <MdTypography
                    variant="headline"
                    size="small"
                    className="pt-6 px-6 pb-0"
                  >
                    My Favorite
                  </MdTypography>
                  <MdList className="bg-surfaceContainerLow">
                    {favoriteList.map((favorite) => {
                      return (
                        <MdListItem
                          key={favorite.id}
                          className="hover:bg-surfaceDim cursor-pointer"
                          onClick={() => {
                            onSelection?.(
                              favorite.origin,
                              favorite.destination
                            );
                            setIsPopoverOpen(false);
                          }}
                        >
                          <div slot="headline" className="px-2">
                            {favorite.origin.join(", ") +
                              " - " +
                              favorite.destination.join(", ")}
                          </div>
                          <div slot="end">
                            <MdIconButton
                              onClick={() => {
                                setFavoriteList(
                                  favoriteList.filter(
                                    (item) => item.id !== favorite.id
                                  )
                                );
                              }}
                            >
                              <DeleteOutlineIcon />
                            </MdIconButton>
                          </div>
                        </MdListItem>
                      );
                    })}
                  </MdList>
                  <MdTextButton
                    className="w-fit self-end mb-6 mx-5 mt-0"
                    onClick={() => {
                      setIsPopoverOpen(false);
                    }}
                  >
                    Close
                  </MdTextButton>
                </MdElevatedCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FloatingFocusManager>
    </div>
  );
}
