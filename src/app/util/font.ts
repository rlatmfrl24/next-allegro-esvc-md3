import localFont from "next/font/local";
import { Noto_Sans } from "next/font/google";

export const suit = localFont({
  src: "../../../public/font/SUIT-Variable.woff2",
  display: "swap",
  variable: "--font-suit",
});

export const pretendard = localFont({
  src: "../../../public/font/Pretendard-Variable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});
