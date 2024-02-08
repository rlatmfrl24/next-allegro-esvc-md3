"use client";

import { useRecoilValue } from "recoil";
import Logo from "./logo";
import { UserState } from "../store";
import Link from "next/link";
import { MdFilledButton, MdOutlinedButton } from "../util/md3";

export const Header = () => {
  const userData = useRecoilValue(UserState);

  return (
    <header className="relative h-16 flex items-center px-4">
      <Logo />
      <div className="mx-6 flex-1"></div>
      {userData.isAuthenticated ? (
        <HeaderMainComponent />
      ) : (
        <HeaderSignComponent />
      )}
    </header>
  );
};

const HeaderSignComponent = () => {
  return (
    <div>
      <Link href={"/sign/up"}>
        <MdOutlinedButton className="w-32 font-pretendard font-medium">
          Sign Up
        </MdOutlinedButton>
      </Link>
      <Link href={"/sign/in"}>
        <MdFilledButton className="w-32 font-pretendard font-medium">
          Sign In
        </MdFilledButton>
      </Link>
    </div>
  );
};
const HeaderMainComponent = () => {
  return <div></div>;
};

export default Header;
