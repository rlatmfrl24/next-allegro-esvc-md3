"use client";

import Logo from "../components/logo";
import {
  EditCalendarOutlined as ScheduleIcon,
  DesktopWindowsOutlined as SurchargeIcon,
} from "@mui/icons-material";
import TariffIcon from "@/../public/icon_tariff_outlined.svg";
import TrackingIcon from "@/../public/icon_tracking_outlined.svg";
import { useRecoilState } from "recoil";
import { isSigningState } from "./store";
import Link from "next/link";
import { MdFilledButton, MdOutlinedButton } from "../util/md3";

export default function Header() {
  const [isSigning, setIsSigning] = useRecoilState(isSigningState);

  return (
    <div className="h-[4.5rem] flex items-center px-6 shadow-md gap-6">
      <Logo />
      <NavButtonGroup />
      {isSigning ? (
        <Link href={"/sign"}>
          <MdOutlinedButton className="w-32 font-pretendard font-medium">
            Cancel
          </MdOutlinedButton>
        </Link>
      ) : (
        <>
          <Link href={"/sign/up"}>
            <MdOutlinedButton
              className="w-32 font-pretendard font-medium"
              onClick={() => {
                setIsSigning(true);
              }}
            >
              Sign Up
            </MdOutlinedButton>
          </Link>
          <Link href={"/sign/in"}>
            <MdFilledButton
              className="w-32 font-pretendard font-medium"
              onClick={() => {
                setIsSigning(true);
              }}
            >
              Sign In
            </MdFilledButton>
          </Link>
        </>
      )}
    </div>
  );
}

const NavButtonGroup = () => {
  const NavButton = ({
    icon,
    text,
  }: {
    icon: React.ReactNode;
    text: string;
  }) => (
    <div className="flex flex-1 flex-col items-center group cursor-pointer">
      <div className="px-4 py-1 rounded-full group-hover:bg-secondaryContainer">
        {icon}
      </div>
      <span className="font-pretendard font-semibold text-xs m-1">{text}</span>
    </div>
  );

  return (
    <div className="flex w-96 justify-around">
      <NavButton icon={<ScheduleIcon />} text="Schedule" />
      <NavButton icon={<TrackingIcon />} text="Tracking" />
      <NavButton icon={<SurchargeIcon />} text="Surcharge" />
      <NavButton icon={<TariffIcon />} text="DEM/DET Tariff" />
    </div>
  );
};
