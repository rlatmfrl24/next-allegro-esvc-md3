import Footer from "../components/footer";
import Header from "./header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none flex h-[60px] px-6 shadow-md">
        <Header />
      </header>
      <main className="flex-1 flex flex-row">
        <aside className="flex-none">
          {/* <Aside /> */}
          asdie
        </aside>
        <section className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
