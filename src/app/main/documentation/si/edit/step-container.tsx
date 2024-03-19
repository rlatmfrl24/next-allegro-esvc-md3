import { MdTypography } from "@/app/components/typography";
import { SIEditStepState } from "@/app/store/si.store";
import { MdFilledButton } from "@/app/util/md3";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export default function StepContainer() {
  const setSIEditStep = useSetRecoilState(SIEditStepState);

  const moveToMarkDescription = useCallback(() => {
    setSIEditStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isSelected: false,
      },
      markDescription: {
        ...prev.markDescription,
        isSelected: true,
      },
    }));
  }, [setSIEditStep]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Container
      </MdTypography>
      <div className="flex-1 flex justify-end items-end">
        <MdFilledButton
          className="h-fit"
          onClick={() => moveToMarkDescription()}
        >
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
