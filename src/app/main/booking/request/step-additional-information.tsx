import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
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
import { faker } from "@faker-js/faker";

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
            maxFiles={10}
            maxFileSize={
              20 * 1024 * 1024 // 20MB
            }
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
              maxFiles={5}
              maxFileSize={10 * 1024 * 1024} // 10MB
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
  maxFiles = 10,
  maxFileSize = 10485760, // 10MB
}: {
  className?: string;
  initialFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
}) => {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: maxFiles,
      maxSize: maxFileSize,
      // Accept zip, 7z, rar, txt, pdf, xlsx, doc, docx, rtf, html, ppt, ods, odt, odp, jpg, tif, png, .avif, .bmp, jpeg, jpg, svg, tiff
      accept: {
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/svg": [".svg"],
        "image/tiff": [".tiff"],
        "image/tif": [".tif"],
        "image/bmp": [".bmp"],
        "image/avif": [".avif"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/zip": [".zip"],
        "application/x-7z-compressed": [".7z"],
        "application/x-rar-compressed": [".rar"],
        "text/plain": [".txt"],
        "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
        "application/vnd.oasis.opendocument.text": [".odt"],
        "application/vnd.oasis.opendocument.presentation": [".odp"],
        "application/vnd.ms-powerpoint": [".ppt"],
        "application/msword": [".doc"],
        "application/rtf": [".rtf"],
        "text/html": [".html"],
      },
    });
  const [files, setFiles] = useState<File[]>(initialFiles || []);

  useEffect(() => {
    // add accepted files to state
    setFiles((prev) => [...prev, ...acceptedFiles]);

    // if files exceed 10, remove the last file
    if (files.length + acceptedFiles.length > maxFiles) {
      setFiles((prev) => prev.slice(0, maxFiles - 1));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  useEffect(() => {
    // if file rejections exist, show alert
    if (fileRejections.length > 0) {
      alert("Some files are rejected. Please check the file types and sizes.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileRejections]);

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
        <MdTypography variant="body" size="large" prominent>
          <span className="underline text-primary cursor-pointer">
            Click to upload
          </span>
          &nbsp;or drop files here
        </MdTypography>
        <MdTypography
          variant="body"
          size="small"
          prominent
          className="text-outline"
        >
          {`(Maximum ${maxFiles} files, Max file size : ${
            maxFileSize / 1024 / 1024
          }MB)`}
        </MdTypography>
        <MdTypography variant="body" size="small" className="text-outline mt-4">
          zip, 7z, rar, txt, pdf, xlsx, doc, docx, rtf, html, ppt, ods, odt,
          odp, jpg, tif, png, .avif, .bmp, jpeg, jpg, svg, tiff
        </MdTypography>
      </div>
      <MdChipSet>
        {files.map((file) => (
          <div key={faker.string.uuid()}>
            <MdInputChip
              label={file.name}
              selected
              remove={() => {
                setFiles((prev) => prev.filter((f) => f.name !== file.name));
              }}
            />
          </div>
        ))}
      </MdChipSet>
    </div>
  );
};
