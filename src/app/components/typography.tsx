export const MdTypography = ({
  children,
  variant,
  size,
  className,
}: {
  children: string | React.ReactNode;
  variant: "display" | "headline" | "title" | "label" | "body";
  size: "small" | "medium" | "large";
  className?: string;
}) => {
  let typeScale = "";

  switch (variant) {
    case "display":
      typeScale = "font-suit ";
      switch (size) {
        case "large":
          typeScale += "text-[57px] leading-[64px] tracking-[-0.25px ]";
          break;
        case "medium":
          typeScale += "text-[45px] leading-[52px]";
          break;
        case "small":
          typeScale += "text-[36px] leading-[44px]";
          break;
      }
      break;
    case "headline":
      typeScale = "font-suit ";
      switch (size) {
        case "large":
          typeScale += "text-[32px] leading-[40px]";
          break;
        case "medium":
          typeScale += "text-[28px] leading-[36px]";
          break;
        case "small":
          typeScale += "text-[24px] leading-[32px]";
          break;
      }
      break;
    case "title":
      typeScale = "font-suit ";
      switch (size) {
        case "large":
          typeScale += "text-[22px] leading-[28px]";
          break;
        case "medium":
          typeScale +=
            "text-[16px] leading-[24px] tracking-[0.15px] font-medium";
          break;
        case "small":
          typeScale +=
            "text-[14px] leading-[20px] tracking-[0.1px] font-medium";
          break;
      }
      break;
    case "label":
      typeScale = "font-pretendard ";
      switch (size) {
        case "large":
          typeScale +=
            "text-[14px] leading-[20px] tracking-[0.1px] font-medium";
          break;
        case "medium":
          typeScale +=
            "text-[12px] leading-[16px] tracking-[0.5px] font-medium";
          break;
        case "small":
          typeScale +=
            "text-[11px] leading-[16px] tracking-[0.5px] font-medium";
          break;
      }
      break;
    case "body":
      typeScale = "font-pretendard ";
      switch (size) {
        case "large":
          typeScale += "text-[16px] leading-[24px] tracking-[0.5px] ";
          break;
          0;
        case "medium":
          typeScale += "text-[14px] leading-[20px] tracking-[0.25px] ";
          break;
        case "small":
          typeScale += "text-[12px] leading-[16px] tracking-[0.4px] ";
          break;
      }
      break;
  }

  return <span className={typeScale + ` ` + className}>{children}</span>;
};
