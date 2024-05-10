"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdCircularProgress } from "./util/md3";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <MdCircularProgress indeterminate />
    </main>
  );
}
