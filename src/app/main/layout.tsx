import Footer from "../components/footer";
import Header from "./header";
import SideNav from "./side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex-none flex h-[60px] px-6 shadow-md items-center z-20">
        <Header />
      </header>
      <main className="flex-1 flex flex-row bg-background">
        <aside className="flex-none flex flex-col w-[336px] bg-surfaceContainerLow  rounded-tr-3xl">
          <SideNav />
        </aside>
        <section
          id="main-container"
          className="relative flex-1 flex flex-col items-center"
        >
          <div className="flex-auto h-0 overflow-auto w-full flex flex-col items-center ">
            {children}
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
