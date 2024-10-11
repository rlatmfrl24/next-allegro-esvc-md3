import type { Metadata } from "next";
import "./globals.css";

import SideNavigation from "./components/side-nav/side-nav";
import Header from "./header";
import Providers from "./providers";
import { notoSans, pretendard, suit } from "./util/font";
import FavoriteMain from "./components/favorite/main";

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
      <body
        className={`${suit.variable} ${pretendard.variable} ${notoSans.variable}`}
      >
        <Providers>
          <div
            id="nav-container"
            className="relative flex h-screen overflow-hidden bg-onPrimaryFixedVariant"
          >
            <SideNavigation />
            <main className="flex-1 flex flex-col overflow-hidden bg-surfaceContainerLowest rounded-l-3xl">
              <Header />
              <section
                id="main-container"
                className="relative flex-1 overflow-hidden rounded-3xl bg-surfaceContainerLow"
              >
                <FavoriteMain />
                {children}
              </section>
            </main>
          </div>
        </Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
