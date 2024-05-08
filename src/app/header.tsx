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
  MdNavigationTab,
  MdOutlinedButton,
} from "./util/md3";
import { CSSProperties, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { usePathname } from "next/navigation";
import { AccountCircleOutlined, PlaceOutlined } from "@mui/icons-material";
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
import TariffIcon from "@/../public/icon_menu_pricing.svg";
import QuickSurchargeSearchIcon from "@/../public/icon_quick_surcharge_search.svg";
import QuickGuideIcon from "@/../public/icon_quick_guide.svg";
import QuickSimpleSIIcon from "@/../public/icon_quick_simple_si.svg";
import QuickDEMDETTariffIcon from "@/../public/icon_quick_dem_det_tariff.svg";
import QuickSiteMapIcon from "@/../public/icon_quick_sitemap.svg";
import { basicPopoverStyles } from "./util/constants";
import { useRegister } from "./sign/up/main";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="relative h-16 flex items-center px-4">
      <Link href={"/main/dashboard"}>
        <Logo />
      </Link>
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
  const [onHoverAt, setOnHoverAt] = useState(0);
  const { renderRegisterDialog, openDialog } = useRegister();

  return (
    <div className="flex gap-3 items-center">
      {renderRegisterDialog()}
      <div className="flex">
        <MdNavigationTab
          label="Surcharge Search"
          className={`w-32`}
          onMouseEnter={() => setOnHoverAt(1)}
          onMouseLeave={() => setOnHoverAt(0)}
          active={onHoverAt === 1}
        >
          <MdIcon slot="inactive-icon">
            <QuickSurchargeSearchIcon />
          </MdIcon>
          <MdIcon slot="active-icon">
            <QuickSurchargeSearchIcon />
          </MdIcon>
        </MdNavigationTab>
        <MdNavigationTab
          label="Guide"
          className="w-32"
          onMouseEnter={() => setOnHoverAt(2)}
          onMouseLeave={() => setOnHoverAt(0)}
          active={onHoverAt === 2}
        >
          <MdIcon slot="inactive-icon">
            <QuickGuideIcon />
          </MdIcon>
          <MdIcon slot="active-icon">
            <QuickGuideIcon />
          </MdIcon>
        </MdNavigationTab>
        <MdNavigationTab
          label="Simple SI"
          className="w-32"
          onMouseEnter={() => setOnHoverAt(3)}
          onMouseLeave={() => setOnHoverAt(0)}
          active={onHoverAt === 3}
        >
          <MdIcon slot="inactive-icon">
            <QuickSimpleSIIcon />
          </MdIcon>
          <MdIcon slot="active-icon">
            <QuickSimpleSIIcon />
          </MdIcon>
        </MdNavigationTab>
        <MdNavigationTab
          label="DEM/DET Tariff"
          className="w-32"
          onMouseEnter={() => setOnHoverAt(4)}
          onMouseLeave={() => setOnHoverAt(0)}
          active={onHoverAt === 4}
        >
          <MdIcon slot="inactive-icon">
            <QuickDEMDETTariffIcon />
          </MdIcon>
          <MdIcon slot="active-icon">
            <QuickDEMDETTariffIcon />
          </MdIcon>
        </MdNavigationTab>
        <MdNavigationTab
          label="SiteMap"
          className="w-32"
          onMouseEnter={() => setOnHoverAt(5)}
          onMouseLeave={() => setOnHoverAt(0)}
          active={onHoverAt === 5}
        >
          <MdIcon slot="inactive-icon">
            <QuickSiteMapIcon />
          </MdIcon>
          <MdIcon slot="active-icon">
            <QuickSiteMapIcon />
          </MdIcon>
        </MdNavigationTab>
      </div>
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
          <MdOutlinedButton
            className="w-32 font-pretendard font-medium"
            onClick={() => {
              openDialog();
            }}
          >
            Register
          </MdOutlinedButton>
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

  const { isMounted, styles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

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
