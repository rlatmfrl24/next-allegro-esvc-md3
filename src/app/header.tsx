"use client";

import Logo from "./components/logo";
import Link from "next/link";
import {
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdMenu,
  MdMenuItem,
  MdOutlinedButton,
} from "./util/md3";
import { CSSProperties, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { usePathname } from "next/navigation";
import { AccountCircleOutlined } from "@mui/icons-material";
import {
  autoUpdate,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { MdTypography } from "./components/typography";

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

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isUserMenuOpen,
    onOpenChange: setIsUserMenuOpen,
    middleware: [shift()],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 100,
    },
    initial: { opacity: 0, transform: "translateY(-8px)" },
    open: { opacity: 1, transform: "translateY(0)" },
    close: { opacity: 0, transform: "translateY(-8px)" },
  });

  return (
    <div className="flex gap-3">
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
      <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
        <AccountCircleOutlined />
      </MdIconButton>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-20"
        >
          <MdElevatedCard
            style={
              {
                ...styles,
              } as CSSProperties
            }
            className="w-60 bg-surfaceContainerHigh py-2"
          >
            <div className="w-full flex flex-col justify-center items-center p-6 gap-4">
              <MdTypography variant="headline" size="small" className="w-fit">
                Wy_lee
              </MdTypography>
              <MdTypography variant="body" size="medium">
                Jsahn@cyberlogitec.com
              </MdTypography>
            </div>
            <MdMenuItem>Account Profile</MdMenuItem>
            <Link href={"/sign"}>
              <MdMenuItem>Sign Out</MdMenuItem>
            </Link>
          </MdElevatedCard>
        </div>
      )}
    </div>
  );
};

export default Header;
