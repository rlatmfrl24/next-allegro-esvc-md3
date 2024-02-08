import Footer from "../components/footer";
import TestHeader from "./header";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <aside>side</aside>
      <main className="flex-1 flex flex-col">
        <TestHeader />
        <section className="w-full flex flex-auto h-0 overflow-auto">
          {children}
        </section>
        <Footer />
      </main>
    </div>
  );
}
