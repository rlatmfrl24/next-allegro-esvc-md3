"use client";

import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { ScrollState } from "../store/global.store";
import { set } from "lodash";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollRef = useRef<any>();
  const setScrollState = useSetRecoilState(ScrollState);
  const [initialize, instance] = useOverlayScrollbars({
    defer: true,
    events: {
      scroll: (instance) => {
        const viewport = instance.elements().viewport;
        setScrollState((prevState) => ({
          ...prevState,
          xPosition: viewport.scrollLeft,
          yPosition: viewport.scrollTop,
        }));
      },
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }

    setScrollState((prevState) => ({
      ...prevState,
      instance: instance,
    }));
  }, [initialize, instance, setScrollState]);

  return (
    <div className="relative flex h-full mx-1 py-2">
      <div className="w-full" ref={scrollRef}>
        <div className="flex justify-center flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
