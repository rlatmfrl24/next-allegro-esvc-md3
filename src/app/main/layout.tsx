import Footer from "../components/footer";
import Header from "./header";
import SideNav from "./side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none flex h-[60px] px-6 shadow-md items-center z-10">
        <Header />
      </header>
      <main className="flex-1 flex flex-row bg-surfaceBright">
        <aside className="flex-none flex flex-col w-[290px] p-3 bg-surfaceContainer rounded-tr-3xl">
          <SideNav />
        </aside>
        <section className="flex-1 flex flex-col">
          <div className="flex-auto h-0 overflow-auto flex flex-col">
            {children}
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
