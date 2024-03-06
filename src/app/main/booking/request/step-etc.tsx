import { MdTypography } from "@/app/components/typography";
import { SubTitle } from "./components";
import {
  MdChipSet,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdSelectOption,
} from "@/app/util/md3";
import { useRef, useState } from "react";
import { set } from "lodash";
import { useRecoilState } from "recoil";
import { EtcDataState } from "@/app/store/booking-request.store";
import { fi } from "@faker-js/faker";

export default function EtcStep() {
  const [etcData, setEtcData] = useRecoilState(EtcDataState);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const mergedFiles = files.concat(etcData.attachments);
      setEtcData((prev) => {
        return {
          ...prev,
          attachments: mergedFiles,
        };
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Attachment & Special Instruction & Duplicate Bookings
      </MdTypography>
      <SubTitle title="Attachment" className="mb-4 mt-6" />
      <div className="flex items-center gap-4">
        <MdOutlinedButton onClick={handleClick}>File Upload</MdOutlinedButton>
        <MdChipSet>
          {etcData.attachments.map((file, index) => (
            <MdInputChip
              key={file.name}
              label={file.name}
              selected
              handleTrailingActionFocus={() => {
                setEtcData((prev) => {
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
        value={etcData.specialInstruction}
        onInput={(e) => {
          setEtcData((prev) => {
            return {
              ...prev,
              specialInstruction: e.currentTarget.value,
            };
          });
        }}
      />
      <SubTitle
        title="Do you want to make duplicate bookings for the same vessel?"
        className="mb-2 mt-6"
      />
      <MdTypography variant="body" size="medium" className="text-outline mb-4">
        (Multiple booking request may take some time to complete. Please wait a
        moment.)
      </MdTypography>
      <MdOutlinedSelect
        className="w-fit"
        selectedIndex={parseInt(etcData.duplicateBookings) - 1}
        onchange={(e) => {
          const selectiondValue = (e.currentTarget as HTMLSelectElement).value;
          setEtcData((prev) => {
            return {
              ...prev,
              duplicateBookings: selectiondValue,
            };
          });
        }}
      >
        <MdSelectOption value="1">1 Times</MdSelectOption>
        <MdSelectOption value="2">2 Times</MdSelectOption>
        <MdSelectOption value="3">3 Times</MdSelectOption>
        <MdSelectOption value="4">4 Times</MdSelectOption>
      </MdOutlinedSelect>
    </div>
  );
}
