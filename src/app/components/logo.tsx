import Image from "next/image";
import { MdTypography } from "./typography";
import LogoTSLine from "@/../public/logo_tsline.svg";

export default function Logo({
  className,
  ...props
}: Readonly<{
  className?: string;
  [key: string]: any;
}> & { children?: React.ReactNode }) {
  return (
    <div className="flex items-center" {...props}>
      <div className="flex items-center">
        <Image
          aria-label="company logo"
          src="/logo_tsline.svg"
          alt="logo"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="w-px h-6 bg-outlineVariant mx-4"> </div>
      {/* <Image src="/logo_esvc.svg" alt="logo" width={100} height={23} /> */}
      <MdTypography variant="title" size="large">
        e-SERVICE
      </MdTypography>
    </div>
  );
}
