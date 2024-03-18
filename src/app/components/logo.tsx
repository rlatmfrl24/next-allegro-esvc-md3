import Image from "next/image";

export default function Logo({
  className,
  ...props
}: Readonly<{
  className?: string;
  [key: string]: any;
}> & { children?: React.ReactNode }) {
  return (
    <div className="flex items-center" {...props}>
      <div className="flex items-center h-8">
        <Image
          aria-label="company logo"
          src="/logo_transfar_shipping.svg"
          alt="logo"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="w-px h-6 bg-outlineVariant mx-4"> </div>
      <Image src="/logo_esvc.svg" alt="logo" width={100} height={23} />
    </div>
  );
}
