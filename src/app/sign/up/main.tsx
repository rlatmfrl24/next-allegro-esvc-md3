import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { MdCheckbox, MdDialog } from "@/app/util/md3";
import { useCallback, useState } from "react";

export const useRegister = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "policy" | "form" | "preview" | "complete"
  >("policy");

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  function renderRegisterDialog() {
    return (
      <Portal selector="#nav-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
          className="relative z-20"
        >
          <div slot="headline">Sign Up</div>
          <div slot="content"></div>
          <div slot="actions">
            {
              {
                policy: (
                  <>
                    <MdTypography
                      tag="label"
                      variant="label"
                      size="large"
                      className={`flex items-center gap-2 cursor-pointer`}
                    >
                      <MdCheckbox />I have read, understood and agree to the
                      ‘Privacy and Security Policy’
                    </MdTypography>
                  </>
                ),
                form: <></>,
                preview: <></>,
                complete: <></>,
              }[currentStep]
            }
          </div>
        </MdDialog>
      </Portal>
    );
  }

  return {
    openDialog,
    renderRegisterDialog,
  };
};
