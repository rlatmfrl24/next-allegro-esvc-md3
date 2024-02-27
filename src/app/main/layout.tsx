"use client";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full flex px-1 py-2">{children}</div>;
}
