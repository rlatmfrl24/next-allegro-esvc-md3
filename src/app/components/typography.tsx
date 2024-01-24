export const MdTypography = ({
  children,
  target,
  size,
  className,
}: {
  children: string | React.ReactNode;
  target: "display" | "headline" | "title" | "label" | "body";
  size: "small" | "medium" | "large";
  className?: string;
}) => {
  let typeScale = "";

  switch (target) {
    case "display":
      typeScale = "font-suit ";
      switch (size) {
        case "large":
          typeScale += "text-[57px] leading-[64px] tracking-[-0.02em]";
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
            "text-[16px] leading-[24px] tracking-[0.015em] font-medium";
          break;
        case "small":
          typeScale +=
            "text-[14px] leading-[20px] tracking-[0.01em] font-medium";
          break;
      }
      break;
    case "label":
      typeScale = "font-pretendard ";
      switch (size) {
        case "large":
          typeScale +=
            "text-[14px] leading-[20px] tracking-[0.01em] font-medium";
          break;
        case "medium":
          typeScale +=
            "text-[12px] leading-[16px] tracking-[0.05em] font-medium";
          break;
        case "small":
          typeScale +=
            "text-[11px] leading-[16px] tracking-[0.05em] font-medium";
          break;
      }
      break;
    case "body":
      typeScale = "font-pretendard ";
      switch (size) {
        case "large":
          typeScale += "text-[16px] leading-[24px] tracking-[0.015em] ";
          break;
        case "medium":
          typeScale += "text-[14px] leading-[20px] tracking-[0.025em] ";
          break;
        case "small":
          typeScale += "text-[12px] leading-[16px] tracking-[0.04em] ";
          break;
      }
      break;
  }

  return <span className={typeScale + ` ` + className}>{children}</span>;
};