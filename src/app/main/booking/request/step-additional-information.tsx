import { MdTypography } from "@/app/components/typography";
import { SubTitle } from "./components";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AdditionalInformationState,
  BookingRequestStepState,
} from "@/app/store/booking-request.store";
import NaToggleButton from "@/app/components/na-toggle-button";

export default function AdditionalInformationStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [AdditionalInformationData, setAdditionalInformationData] =
    useRecoilState(AdditionalInformationState);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const mergedFiles = files.concat(AdditionalInformationData.attachments);
      setAdditionalInformationData((prev) => {
        return {
          ...prev,
          attachments: mergedFiles,
        };
      });
    }
  };

  const moveToContactInformationStep = () => {
    setBookingRequestStep((prev) => ({
      ...prev,
      additionalInformation: {
        ...prev.additionalInformation,
        isSelected: false,
      },
      contactInformation: {
        ...prev.contactInformation,
        isSelected: true,
      },
    }));
  };

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Additional Information
      </MdTypography>
      <SubTitle title="Attachment" className="mb-4" />
      <div className="flex items-center gap-4">
        <MdOutlinedButton onClick={handleClick}>File Upload</MdOutlinedButton>
        <MdChipSet>
          {AdditionalInformationData.attachments.map((file, index) => (
            <MdInputChip
              key={file.name}
              label={file.name}
              selected
              handleTrailingActionFocus={() => {
                setAdditionalInformationData((prev) => {
                  return {
                    ...prev,
                    attachments: prev.attachments.filter(
                      (item) => item.name !== file.name
                    ),
                  };
                });
              }}
            />
          ))}
        </MdChipSet>
      </div>
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        multiple
        onInput={handleFileChange}
      />

      <SubTitle title="Special Instruction" className="mb-4 mt-6" />
      <MdOutlinedTextField
        type="textarea"
        className="resize-y"
        rows={3}
        placeholder="Special Instruction on Booking"
        value={AdditionalInformationData.specialInstruction}
        onInput={(e) => {
          setAdditionalInformationData((prev) => {
            return {
              ...prev,
              specialInstruction: e.currentTarget.value,
            };
          });
        }}
      />

      <SubTitle
        title="Do you want to make duplicate bookings for the same vessel?"
        className="mt-6"
      />
      <MdTypography variant="body" size="medium" className="text-outline">
        Enter the number of bookings to duplicate. (Maximum 50)
      </MdTypography>
      <MdOutlinedTextField
        value={AdditionalInformationData.duplicateCount.toString()}
        className="w-fit text-right mt-4"
        onKeyDown={(e) => {
          // Only allow numbers and backspace
          if (
            !(
              (e.key >= "0" && e.key <= "9") ||
              e.key === "Backspace" ||
              e.key === "Delete" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight" ||
              e.key === "Tab" ||
              e.key === "Shift" ||
              e.key === "Control" ||
              e.key === "Alt" ||
              e.key === "ArrowUp" ||
              e.key === "ArrowDown"
            )
          ) {
            e.preventDefault();
          }
        }}
        onBlur={(e) => {
          const value = parseInt(e.currentTarget.value);
          if (value > 50) {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                duplicateCount: 50,
              };
            });
          } else if (value < 1) {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                duplicateCount: 1,
              };
            });
          } else if (isNaN(value)) {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                duplicateCount: 1,
              };
            });
          } else {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                duplicateCount: value,
              };
            });
          }
        }}
      />
      <SubTitle title="Email Notification Subscription" className="mt-6" />
      <div className="flex flex-col">
        <NaToggleButton
          label="Roll-Over (Including T/S)"
          state={
            AdditionalInformationData.emailSubscription.rollOver
              ? "checked"
              : "unchecked"
          }
          onClick={() => {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                emailSubscription: {
                  ...prev.emailSubscription,
                  rollOver: !prev.emailSubscription.rollOver,
                },
              };
            });
          }}
        />
        <NaToggleButton
          label="Vessel Departure"
          state={
            AdditionalInformationData.emailSubscription.vesselDeparture
              ? "checked"
              : "unchecked"
          }
          onClick={() => {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                emailSubscription: {
                  ...prev.emailSubscription,
                  vesselDeparture: !prev.emailSubscription.vesselDeparture,
                },
              };
            });
          }}
        />
        <NaToggleButton
          label="Vessel Advance / Delay"
          state={
            AdditionalInformationData.emailSubscription.vesselAdvanceDelay
              ? "checked"
              : "unchecked"
          }
          onClick={() => {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                emailSubscription: {
                  ...prev.emailSubscription,
                  vesselAdvanceDelay:
                    !prev.emailSubscription.vesselAdvanceDelay,
                },
              };
            });
          }}
        />
      </div>
      <div className="flex-1 flex items-end justify-end">
        <MdFilledButton onClick={() => moveToContactInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
