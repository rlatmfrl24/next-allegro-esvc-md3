import { usePathname } from "next/navigation";
import { getRoutePath } from "../main/util";
import { useEffect, useState } from "react";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const [routes, setRoutes] = useState<string[]>([]);

  useEffect(() => {
    setRoutes(getRoutePath(pathName.split("/")));
  }, [pathName]);

  return (
    <div className="flex items-center text-sm font-pretendard">
      {routes.map((item, index) => (
        <div
          key={`breadcrumb-` + index}
          className={`flex ${
            index === routes.length - 1
              ? "font-semibold text-primary"
              : "text-gray-400"
          }`}
        >
          {item}
          {index !== routes.length - 1 && <span className="px-2">{`>`}</span>}
        </div>
      ))}
    </div>
  );
}
