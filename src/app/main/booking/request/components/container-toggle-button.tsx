import { MdTypography } from "@/app/components/typography";
import { MdRippleEffect } from "@/app/util/md3";

const ContainerToggleButton = ({
  image,
  onClick,
  isSelected,
  title,
  count,
}: {
  onClick: () => void;
  image: React.ReactNode;
  isSelected: boolean;
  title: string;
  count?: number;
}) => {
  return (
    <div
      className={`relative flex-1 flex flex-col gap-1 justify-center items-center px-7 py-4 rounded-lg border ${
        isSelected ? "border-primary bg-[#19658414]" : "border-outlineVariant"
      } cursor-pointer`}
      onClick={onClick}
    >
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
