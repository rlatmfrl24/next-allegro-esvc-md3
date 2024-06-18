"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./components/logo";
import { useRecoilValue } from "recoil";
import { UserState } from "./store/global.store";
import { HeaderMainComponent } from "./components/header/main-component";
import { HeaderSignComponent } from "./components/header/sign-component";

export const Header = () => {
  const pathname = usePathname();
  const userData = useRecoilValue(UserState);
  const isMain =
    pathname.split("/").includes("main") && userData.isAuthenticated;

  return (
    <header className="relative h-16 flex items-center px-4">
      <Link href={isMain ? "/main/dashboard" : "/"}>
        <Logo />
      </Link>
      <div className="mx-6 flex-1"></div>
      {isMain ? <HeaderMainComponent /> : <HeaderSignComponent />}
    </header>
  );
};

export default Header;
