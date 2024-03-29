import type { Metadata } from "next";
import { suit, pretendard } from "./util/font";
import Providers from "./providers";
import Header from "./header";
import "./globals.css";
import SideNavigation from "./components/side-nav/side-nav";

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
        <Providers>
          <div
            id="nav-container"
            className="flex h-screen overflow-hidden bg-surfaceDim"
          >
            <SideNavigation />
            <main className="flex-1 flex flex-col overflow-hidden bg-surfaceContainerHighest rounded-l-3xl">
              <Header />
              <section
                id="main-container"
                className="relative flex-1 overflow-hidden rounded-3xl bg-surfaceContainer"
              >
                {children}
              </section>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
