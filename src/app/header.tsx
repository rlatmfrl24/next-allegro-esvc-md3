"use client";

import Logo from "./components/logo";
import Link from "next/link";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdMenu,
  MdMenuItem,
  MdOutlinedButton,
} from "./util/md3";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import UnknownAvatar from "@/../public/avatar_unknown.svg";
import CheckIcon from "@mui/icons-material/Check";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="relative h-16 flex items-center px-4">
      <Logo />
      <div className="mx-6 flex-1"></div>
      {pathname.split("/").includes("main") ? (
        <HeaderMainComponent />
      ) : (
        <HeaderSignComponent />
      )}
    </header>
  );
};

const HeaderSignComponent = () => {
  const [isSigning, setIsSigning] = useState(false);

  return (
    <div className="flex gap-3">
      {isSigning ? (
        <Link
          href={"/sign"}
          onClick={() => {
            setIsSigning(false);
          }}
        >
          <MdOutlinedButton className="w-32 font-pretendard font-medium">
            Cancel
          </MdOutlinedButton>
        </Link>
      ) : (
        <>
          <Link
            href={"/sign/up"}
            onClick={() => {
              setIsSigning(true);
            }}
          >
            <MdOutlinedButton className="w-32 font-pretendard font-medium">
              Sign Up
            </MdOutlinedButton>
          </Link>
          <Link
            href={"/sign/in"}
            onClick={() => {
              setIsSigning(true);
            }}
          >
            <MdFilledButton className="w-32 font-pretendard font-medium">
              Sign In
            </MdFilledButton>
          </Link>
        </>
      )}
    </div>
  );
};
const HeaderMainComponent = () => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  return (
    <div className="flex gap-3">
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
      <Link href={"/sign"}>
        <UnknownAvatar />
      </Link>
    </div>
  );
};

export default Header;
