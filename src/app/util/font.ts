import localFont from "next/font/local";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
