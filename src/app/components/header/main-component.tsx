import { SigningState, UserState } from "@/app/store/global.store";
import { basicPopoverStyles } from "@/app/util/constants";
import {
  MdElevatedCard,
  MdIcon,
  MdIconButton,
  MdMenuItem,
} from "@/app/util/md3";
import {
  useFloating,
  shift,
  autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { AccountCircleOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useState, CSSProperties } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MdTypography } from "../typography";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { LanguageSelector } from "./language-selector";
import { useRouter } from "next/navigation";

export const HeaderMainComponent = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const userState = useRecoilValue(UserState);
  const [userState, setUserState] = useRecoilState(UserState);
  const [isSigning, setIsSigning] = useRecoilState(SigningState);
  const router = useRouter();

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
      <Link href={"/main/subscription"}>
        <MdIconButton>
          <MdIcon>
            <NotificationsNoneOutlinedIcon />
          </MdIcon>
        </MdIconButton>
      </Link>
      <LanguageSelector />
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
                {userState.name}
              </MdTypography>
              <MdTypography variant="body" size="medium">
                {userState.email}
              </MdTypography>
            </div>

            <Link href={"/main/profile"}>
              <MdMenuItem>My Profile</MdMenuItem>
            </Link>
            <MdMenuItem
              onClick={() => {
                setUserState({
                  isAuthenticated: false,
                  email: "",
                  name: "",
                });
                setIsSigning(false);
                router.push("/sign");
              }}
            >
              Sign Out
            </MdMenuItem>
          </MdElevatedCard>
        </div>
      )}
    </div>
  );
};
