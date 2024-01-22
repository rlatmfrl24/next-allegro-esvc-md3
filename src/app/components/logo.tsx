import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-1 items-center">
      <div className="flex items-center h-8">
        <Image
          aria-label="company logo"
          src="/logo_tsline.svg"
          alt="logo"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="w-px h-4 bg-gray-200 mx-4"> </div>
      <Image src="/logo_esvc.svg" alt="logo" width={100} height={23} />
    </div>
  );
}
