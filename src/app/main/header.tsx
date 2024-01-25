"use client";

import BreadCrumbs from "../components/breadcrumbs";
import Logo from "../components/logo";
import { MdIcon, MdIconButton } from "../util/md3";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import UnknownAvatar from "@/../public/avatar_unknown.svg";
import { useRecoilValue } from "recoil";
import { currentPathState } from "./store";

export default function Header() {
  const currentPath = useRecoilValue(currentPathState);

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
      <MdIconButton>
        <MdIcon>
          <LanguageOutlinedIcon />
        </MdIcon>
      </MdIconButton>
      <div className="w-px h-4 bg-gray-200 mx-2.5"> </div>
      <UnknownAvatar />
    </>
  );
}
