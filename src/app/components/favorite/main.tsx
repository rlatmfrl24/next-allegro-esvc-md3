"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { DrawerState, FavoriteState } from "@/app/store/global.store";
import { useEffect, useRef, useState } from "react";
import { MdTypography } from "../typography";
import { NAOutlinedTextField } from "../na-textfield";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { Close, Favorite } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function FavoriteMain() {
  const [drawerState, setDrawerState] = useRecoilState(DrawerState);
  const [favoriteStore, setFavoriteStore] = useRecoilState(FavoriteState);
  const [searchQuery, setSearchQuery] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close drawer when clicking outside
    function handleClickOutside(event: MouseEvent) {
      // if event target's id is `favorite-button`, return
      if ((event.target as HTMLElement).id === "favorite-button") return;

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDrawerState({
          ...drawerState,
          isFavoriteOpen: false,
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerState, setDrawerState]);

  useEffect(() => {
    setSearchQuery("");
  }, [drawerState.isFavoriteOpen]);

  const FavoriteItem = ({
    name,
    category,
    link,
    query,
  }: {
    name: string;
    link: string;
    category: string;
    query: string;
  }) => {
    function highlightText(text: string) {
      return text.replace(new RegExp(query, "gi"), (match) => {
        return `<span class="text-error">${match}</span>`;
      });
    }

    const router = useRouter();

    return (
      <div
        className="flex py-4 px-6 relative cursor-pointer hover:bg-surfaceContainerHigh"
        onClick={() => {
          router.push(link);
          setDrawerState({
            ...drawerState,
            isFavoriteOpen: false,
          });
        }}
      >
        <div className="flex-1">
          <MdTypography variant="label" size="small">
            {category}
          </MdTypography>
          <MdTypography variant="body" size="large">
            <span dangerouslySetInnerHTML={{ __html: highlightText(name) }} />
          </MdTypography>
        </div>
        <MdIconButton
          onClick={(e) => {
            e.stopPropagation();
            setFavoriteStore(
              favoriteStore.filter((item) => item.title !== name)
            );
          }}
        >
          <MdIcon>
            <Favorite className="text-primary" />
          </MdIcon>
        </MdIconButton>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {drawerState.isFavoriteOpen && (
        <motion.div
          ref={wrapperRef}
          initial={{ x: -360 }}
          animate={{ x: 0 }}
          exit={{ x: -360 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
          className="absolute left-0 top-0 w-[360px] h-full bg-white z-10 flex flex-col border-r border-surfaceVariant"
        >
          <div className="flex items-center justify-between m-6 mb-4">
            <MdTypography variant="title" size="large">
              Favorite
            </MdTypography>
            <MdIconButton
              onClick={() => {
                setDrawerState({
                  ...drawerState,
                  isFavoriteOpen: false,
                });
              }}
            >
              <MdIcon>
                <Close />
              </MdIcon>
            </MdIconButton>
          </div>
          <NAOutlinedTextField
            label="Search Name"
            className="mx-6 mb-4"
            value={searchQuery}
            handleValueChange={(value) => {
              setSearchQuery(value);
            }}
          />
          <OverlayScrollbarsComponent defer>
            <div className="flex flex-col-reverse overflow-auto">
              {favoriteStore
                .filter((item) => {
                  return item.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                })
                .map((item, index) => {
                  return (
                    <FavoriteItem
                      key={index + "_" + item.title}
                      name={item.title}
                      category={item.category}
                      link={item.href}
                      query={searchQuery}
                    />
                  );
                })}
            </div>
          </OverlayScrollbarsComponent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
