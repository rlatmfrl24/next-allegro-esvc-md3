import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdFilledButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AdditionalInformationState,
  BookingRequestStepState,
} from "@/app/store/booking.store";
import NaToggleButton from "@/app/components/na-toggle-button";
import { BackupOutlined } from "@mui/icons-material";
import { SubTitle } from "@/app/components/title-components";
import { useDropzone } from "react-dropzone";
import { RemovableChip } from "@/app/components/chips/removable-chip";

export default function AdditionalInformationStep() {
  // const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [BookingRequestStep, setBookingRequestStep] = useRecoilState(
    BookingRequestStepState
  );
  const [AdditionalInformationData, setAdditionalInformationData] =
    useRecoilState(AdditionalInformationState);

  const [selectedSpecialCargoTab, setSelectedSpecialCargoTab] = useState<
    "dangerous" | "reefer" | "awkward"
  >("dangerous");

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
        visited: true,
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
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <SubTitle title="Attachment" />
          <DndFileUploadPlaceholder
            className="flex-1"
            initialFiles={AdditionalInformationData.attachment}
            onFilesChange={(files) => {
              setAdditionalInformationData((prev) => {
                return {
                  ...prev,
                  attachment: files,
                };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <SubTitle title="Special Cargo Attachment" />
          <MdOutlinedSegmentedButtonSet>
            <MdOutlinedSegmentedButton
              label="Dangerous"
              onClick={() => setSelectedSpecialCargoTab("dangerous")}
              selected={selectedSpecialCargoTab === "dangerous"}
            />
            <MdOutlinedSegmentedButton
              label="Reefer"
              onClick={() => setSelectedSpecialCargoTab("reefer")}
              selected={selectedSpecialCargoTab === "reefer"}
            />
            <MdOutlinedSegmentedButton
              label="Awkward"
              onClick={() => setSelectedSpecialCargoTab("awkward")}
              selected={selectedSpecialCargoTab === "awkward"}
            />
          </MdOutlinedSegmentedButtonSet>
          {selectedSpecialCargoTab === "dangerous" && (
            <DndFileUploadPlaceholder
              initialFiles={
                AdditionalInformationData.specialCargoAttachment.dangerousCargo
              }
              onFilesChange={(files) => {
                setAdditionalInformationData((prev) => {
                  return {
                    ...prev,
                    specialCargoAttachment: {
                      ...prev.specialCargoAttachment,
                      dangerousCargo: files,
                    },
                  };
                });
              }}
            />
          )}
          {selectedSpecialCargoTab === "reefer" && (
            <DndFileUploadPlaceholder
              initialFiles={
                AdditionalInformationData.specialCargoAttachment.reeferCargo
              }
              onFilesChange={(files) => {
                setAdditionalInformationData((prev) => {
                  return {
                    ...prev,
                    specialCargoAttachment: {
                      ...prev.specialCargoAttachment,
                      reeferCargo: files,
                    },
                  };
                });
              }}
            />
          )}
          {selectedSpecialCargoTab === "awkward" && (
            <DndFileUploadPlaceholder
              initialFiles={
                AdditionalInformationData.specialCargoAttachment.awkwardCargo
              }
              onFilesChange={(files) => {
                setAdditionalInformationData((prev) => {
                  return {
                    ...prev,
                    specialCargoAttachment: {
                      ...prev.specialCargoAttachment,
                      awkwardCargo: files,
                    },
                  };
                });
              }}
            />
          )}
        </div>
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
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
        </div>
      </div>

      {/* <SubTitle title="Attachment" className="mb-4" />
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
              remove={() => {
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
      /> */}

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

      <div className="flex-1 flex items-end justify-end">
        <MdFilledButton onClick={() => moveToContactInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}

const DndFileUploadPlaceholder = ({
  className,
  initialFiles,
  onFilesChange,
}: {
  className?: string;
  initialFiles?: File[];
  onFilesChange?: (files: File[]) => void;
}) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const [files, setFiles] = useState<File[]>(initialFiles || []);

  useEffect(() => {
    // add accepted files to state
    setFiles((prev) => [...prev, ...acceptedFiles]);

    // if files exceed 10, remove the last file
    if (files.length + acceptedFiles.length > 10) {
      setFiles((prev) => prev.slice(0, 9));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  useEffect(() => {
    onFilesChange && onFilesChange(files);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div
      className={`flex flex-col gap-4 ${className ? className : ""}
    }`}
    >
      <div
        className="border-2 border-dashed border-outlineVariant bg-surfaceContainerLow rounded-lg flex flex-col gap-2 items-center justify-center flex-1 py-8"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <BackupOutlined className="text-outline" />
        <MdTypography variant="body" size="large">
          <span className="underline text-primary cursor-pointer">
            Click to upload
          </span>
          &nbsp;or drop files here
        </MdTypography>
        <MdTypography variant="label" size="medium" className="text-outline">
          You can only upload up to 10 files.
        </MdTypography>
      </div>
      <MdChipSet>
        {files.map((file) => (
          <RemovableChip
            key={file.name}
            label={file.name}
            onRemove={() => {
              setFiles((prev) => prev.filter((f) => f.name !== file.name));
            }}
          />
        ))}
      </MdChipSet>
    </div>
  );
};
