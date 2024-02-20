"use client";

import { useRecoilValue } from "recoil";
import { UserState } from "../store/global.store";

export default function Footer() {
  const isAuthenticated = useRecoilValue(UserState).isAuthenticated;

  return (
    !isAuthenticated && (
      <div className="h-10 flex w-full justify-end items-center text-xs font-pretendard text-gray-900 px-6 border-y border-gray-300">
        Copyright © CyberLogitec All Rights Reserved.
      </div>
    )
  );
}
