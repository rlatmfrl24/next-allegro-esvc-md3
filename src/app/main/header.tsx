"use client";

import BreadCrumbs from "../components/breadcrumbs";
import Logo from "../components/logo";
import { MdIcon, MdIconButton, MdMenu, MdMenuItem } from "../util/md3";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import UnknownAvatar from "@/../public/avatar_unknown.svg";
import { useRecoilValue } from "recoil";
import { currentPathState } from "./store";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function Header() {
  const currentPath = useRecoilValue(currentPathState);
  const [currentLanguage, setCurrentLanguage] = useState("English"); // TODO: [P3] Implement language selection
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  return (
    <>
      <Logo />
      <BreadCrumbs list={currentPath} />
      <div className="w-px h-4 bg-gray-200 mx-2.5"> </div>
      <MdIconButton>
        <MdIcon>
          <SearchOutlinedIcon />
        </MdIcon>
      </MdIconButton>
      <MdIconButton>
        <MdIcon>
          <NotificationsNoneOutlinedIcon />
        </MdIcon>
      </MdIconButton>
      <div className="relative">
        <MdIconButton
          id="language-anchor"
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        >
          <MdIcon>
            <LanguageOutlinedIcon />
          </MdIcon>
        </MdIconButton>
        <MdMenu
          id="language-menu"
          anchor="language-anchor"
          open={isLanguageMenuOpen}
          close={() => setIsLanguageMenuOpen(false)}
        >
          <MdMenuItem onClick={() => setCurrentLanguage("Korean")}>
            <div slot="headline">Korean</div>
            {currentLanguage === "Korean" && (
              <MdIcon slot="start">
                <CheckIcon />
              </MdIcon>
            )}
          </MdMenuItem>
          <MdMenuItem onClick={() => setCurrentLanguage("English")}>
            <div slot="headline">English</div>
            {currentLanguage === "English" && (
              <MdIcon slot="start">
                <CheckIcon />
              </MdIcon>
            )}
          </MdMenuItem>
        </MdMenu>
      </div>
      <div className="w-px h-4 bg-gray-200 mx-2.5"> </div>
      <UnknownAvatar />
    </>
  );
}
