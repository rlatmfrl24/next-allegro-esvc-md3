"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign");
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      Main Page
    </main>
  );
}
