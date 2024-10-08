import { MdTypography } from "@/app/components/typography";
import { MdRippleEffect } from "@/app/util/md3";
import { useState } from "react";

const ContainerToggleButton = ({
  image,
  onClick,
  isSelected,
  title,
  count,
  hoverText,
}: {
  onClick: () => void;
  image: React.ReactNode;
  isSelected: boolean;
  title: string;
  count?: number;
  hoverText?: string | React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex-1 flex flex-col gap-1 justify-center items-center py-2 rounded-lg border ${
        isSelected ? "border-primary bg-[#19658414]" : "border-outlineVariant"
      } cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {
        // If hovered, show the border
        hoverText && isHovered && (
          <div className="w-full h-full absolute top-0 left-0 bg-[#171C1F66] rounded-lg flex flex-col justify-center p-4">
            {hoverText}
          </div>
        )
      }
      <MdRippleEffect />
      {image}
      <MdTypography variant="body" size="large" prominent>
        {title}
      </MdTypography>
      {count && count > 0 && (
        <MdTypography
          variant="body"
          size="medium"
          tag="div"
          className={`absolute top-2 right-2 text-white rounded-full w-6 h-6 flex justify-center items-center ${
            isSelected ? "bg-primary" : "bg-secondary"
          }`}
        >
          {count}
        </MdTypography>
      )}
    </div>
  );
};

export default ContainerToggleButton;
