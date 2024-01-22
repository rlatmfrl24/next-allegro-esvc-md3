import type { Metadata } from "next";
import "./globals.css";
import { suit, pretendard } from "./util/font";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Next Allegro E-Service",
  description: "Next Allegro E-Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.variable} ${pretendard.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
