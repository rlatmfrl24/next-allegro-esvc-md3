import {
  MdFilledButton,
  MdIcon,
  MdNavigationTab,
  MdOutlinedButton,
} from "@/app/util/md3";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuickDEMDETTariffIcon from "@/../public/icon_quick_dem_det_tariff.svg";
import QuickGuideIcon from "@/../public/icon_quick_guide.svg";
import QuickSimpleSIIcon from "@/../public/icon_quick_simple_si.svg";
import QuickSiteMapIcon from "@/../public/icon_quick_sitemap.svg";
import QuickSurchargeSearchIcon from "@/../public/icon_quick_surcharge_search.svg";
import { LanguageSelector } from "./language-selector";
import { useRecoilState } from "recoil";
import { SigningState } from "@/app/store/global.store";

export const HeaderSignComponent = () => {
  // const [isSigning, setIsSigning] = useState(false);
  const [isSigning, setIsSigning] = useRecoilState(SigningState);
  const [onHoverAt, setOnHoverAt] = useState(0);

  return (
    <div className="flex gap-3 items-center">
      <div className="flex">
        <Link href={`/quick/surcharge`}>
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
        </Link>
        <Link href={`/quick/guide`}>
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
        </Link>
        <Link href={`/quick/si`}>
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
        </Link>
        <Link href={`/quick/tariff`}>
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
        </Link>
        <Link href={`/quick/sitemap`}>
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
        </Link>
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
          <Link
            href={"/sign/up"}
            onClick={() => {
              setIsSigning(true);
            }}
          >
            <MdOutlinedButton className="w-32 font-pretendard font-medium">
              Register
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
      <LanguageSelector />
    </div>
  );
};
