import type { Metadata } from "next";
import { suit, pretendard } from "./util/font";
import Providers from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";

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
          <div className="flex h-screen overflow-hidden bg-surfaceDim">
            <aside className="w-20">side</aside>
            <main className="flex-1 flex flex-col overflow-hidden bg-surfaceContainerHighest rounded-l-3xl">
              <Header />
              <section className="flex-1 overflow-hidden rounded-3xl bg-surfaceContainer">
                {children}
              </section>
              <Footer />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
