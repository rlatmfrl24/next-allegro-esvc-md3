import type { Metadata } from "next";
import "./globals.css";
import { suit, pretendard } from "./util/font";
import Providers from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";

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
          <div className="flex h-screen overflow-hidden bg-slate-300">
            <aside className="w-20">side</aside>
            <main className="flex-1 flex flex-col overflow-hidden bg-[#DFE3E7] rounded-l-3xl">
              <Header />
              <section className="flex-1 overflow-auto rounded-3xl bg-[#EAEEF2]">
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
