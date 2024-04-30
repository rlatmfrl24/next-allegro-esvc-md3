import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AdditionalInformationState,
  BookingRequestStepState,
} from "@/app/store/booking.store";
import NaToggleButton from "@/app/components/na-toggle-button";
import { Upload } from "@mui/icons-material";
import { SubTitle } from "@/app/components/title-components";
import { faker } from "@faker-js/faker";

export default function AdditionalInformationStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [AdditionalInformationData, setAdditionalInformationData] =
    useRecoilState(AdditionalInformationState);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // change attachment to selected single file
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      setAdditionalInformationData((prev) => {
        return {
          ...prev,
          attachment: file,
        };
      });
    }
    e.target.value = "";
  };

  useEffect(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      additionalInformation: {
        ...prev.additionalInformation,
        isCompleted: true,
      },
    }));
  }, [setBookingRequestStep]);

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
        <MdOutlinedButton onClick={handleClick}>
          <div slot="icon">
            <Upload fontSize="small" />
          </div>
          File Upload
        </MdOutlinedButton>
        <MdChipSet>
          {AdditionalInformationData.attachment && (
            <MdInputChip
              key={faker.string.uuid()}
              label={AdditionalInformationData.attachment.name}
              selected
              handleTrailingActionFocus={() => {
                console.log("delete");
                setAdditionalInformationData((prev) => {
                  return {
                    ...prev,
                    attachment: null,
                  };
                });
              }}
            />
          )}
        </MdChipSet>
      </div>
      <input
        type="file"
        ref={fileRef}
        className="hidden"
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
      {/* 
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
      /> */}
      <SubTitle title="Email Notification Subscription" className="mt-6" />
      <div className="flex flex-col">
        <NaToggleButton
          className="w-fit"
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
          className="w-fit"
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
          className="w-fit"
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
