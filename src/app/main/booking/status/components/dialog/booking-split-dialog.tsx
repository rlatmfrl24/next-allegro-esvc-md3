import Portal from "@/app/components/portal";
import { MdDialog } from "@/app/util/md3";
import { useState } from "react";
import {
  BookingSplitConfirmation,
  BookingSplitProcess,
} from "./split-process-component";

export function useBookingSplitDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"process" | "result">(
    "process"
  );

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => setIsDialogOpen(false)}
          cancel={(e) => {
            e.preventDefault();
          }}
          className="min-w-[960px]"
        >
          {currentStep === "process" ? (
            <BookingSplitProcess
              handleAction={(action) => {
                if (action === "split") {
                  setCurrentStep("result");
                } else {
                  setIsDialogOpen(false);
                }
              }}
            />
          ) : (
            <BookingSplitConfirmation
              handleAction={(action) => {
                if (action === "back") {
                  setCurrentStep("process");
                } else {
                  setIsDialogOpen(false);
                }
              }}
            />
          )}
        </MdDialog>
      </Portal>
    );
  }

  return {
    setIsDialogOpen,
    renderDialog,
  };
}
