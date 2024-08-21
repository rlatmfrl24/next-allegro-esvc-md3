import { DatePicker } from "@/app/components/datepickers/date-picker";
import { DividerComponent } from "@/app/components/divider";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdInputChip,
  MdPrimaryTab,
  MdSecondaryTab,
  MdTabs,
  MdTextButton,
} from "@/app/util/md3";
import { BLIssueRequestTableProps } from "@/app/util/typeDef/documents";
import { faker } from "@faker-js/faker";
import { BackupOutlined } from "@mui/icons-material";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useDraggable } from "react-use-draggable-scroll";

export const HandlingInstructionDialog = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: BLIssueRequestTableProps[];
}) => {
  const [currentEdit, setCurrentEdit] = useState<BLIssueRequestTableProps>(
    data[0]
  );
  const [blCount, setBlCount] = useState({
    originalRated: 0,
    originalUnrated: 0,
    copyRated: 0,
    copyUnrated: 0,
  });
  const tempPorts = useMemo(() => {
    return Array.from(
      { length: 10 },
      (_, i) => faker.location.city() + ", " + faker.location.country()
    );
  }, []);

  const tabWrapperRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(tabWrapperRef); // Now we pass the reference to the useDraggable hook:

  return (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
        setCurrentEdit(data[0]);
      }}
      className="min-w-fit max-w-[1400px] "
    >
      <div slot="headline">B/L Handling Instruction</div>
      <div slot="content" className="p-5">
        <div className="border rounded-2xl border-outlineVariant px-6 max-w-[1400px]">
          <div
            ref={tabWrapperRef}
            {...events}
            className="flex max-w-full whitespace-nowrap overflow-x-scroll scrollbar-hide border-b border-b-outlineVariant"
          >
            {data.map((item, index) => (
              <MdSecondaryTab
                key={item.uuid}
                style={
                  {
                    "--md-secondary-tab-container-color":
                      "var(--md-sys-color-surface-container-low)",
                  } as CSSProperties
                }
                onClick={() => {
                  setCurrentEdit(item);
                }}
                className={`flex-1  ${
                  currentEdit.uuid === item.uuid
                    ? "border-b-2 border-b-primary"
                    : ""
                }`}
              >
                {item.bookingNumber}
              </MdSecondaryTab>
            ))}
            {/* <MdTabs>
            </MdTabs> */}
          </div>
          <div className="flex gap-2 my-6">
            <MdTypography variant="body" size="large" className="w-32">
              B/L Type
            </MdTypography>
            <SimpleRadioGroup
              key="blType"
              groupName="B/L Type"
              selected={currentEdit.blType}
              options={["Original B/L", "eB/L", "Switch B/L", "SeaWaybill"]}
            />
          </div>
          <DividerComponent className="border-dashed" />
          <DetailTitle title="No. of Document to Print" className="mt-6" />
          <div className="grid grid-cols-[120px_1fr] my-4 gap-4">
            <div className="flex items-center">
              <MdTypography variant="body" size="large" className="h-fit">
                Original B/L
              </MdTypography>
            </div>
            <div className="flex gap-2">
              <NAOutlinedNumberField
                label="Rated"
                required
                value={blCount.originalRated.toString()}
                handleValueChange={(value) => {
                  setBlCount((prev) => ({
                    ...prev,
                    originalRated: value!,
                  }));
                }}
              />
              <NAOutlinedNumberField
                label="Unrated"
                required
                value={blCount.originalUnrated.toString()}
                handleValueChange={(value) => {
                  setBlCount((prev) => ({
                    ...prev,
                    originalUnrated: value!,
                  }));
                }}
              />
              <NAOutlinedNumberField
                label="Total"
                readOnly
                value={(
                  blCount.originalRated + blCount.originalUnrated
                ).toString()}
              />
            </div>
            <div className="flex items-center">
              <MdTypography variant="body" size="large">
                Copy B/L
              </MdTypography>
            </div>
            <div className="flex gap-2">
              <NAOutlinedNumberField
                label="Rated"
                required
                value={blCount.copyRated.toString()}
                handleValueChange={(value) => {
                  setBlCount((prev) => ({
                    ...prev,
                    copyRated: value!,
                  }));
                }}
              />
              <NAOutlinedNumberField
                label="Unrated"
                required
                value={blCount.copyUnrated.toString()}
                handleValueChange={(value) => {
                  setBlCount((prev) => ({
                    ...prev,
                    copyUnrated: value!,
                  }));
                }}
              />
              <NAOutlinedNumberField
                label="Total"
                readOnly
                value={(blCount.copyRated + blCount.copyUnrated).toString()}
              />
            </div>
            <div className="flex items-center">
              <MdTypography variant="body" size="large">
                On Board Date
              </MdTypography>
            </div>
            <div className="flex gap-2 relative">
              <DatePicker initialDate={currentEdit.polEtb} />
            </div>
            <div className="flex items-center">
              <MdTypography variant="body" size="large">
                Issue Date
              </MdTypography>
            </div>
            <div className="flex gap-2 relative">
              <DatePicker initialDate={currentEdit.requestBlTypeDate} />
            </div>
            <div className="flex items-center">
              <MdTypography variant="body" size="large">
                Issue Place
              </MdTypography>
            </div>
            <div className="flex gap-2">
              <NAOutlinedListBox
                label="Issue Place"
                options={[currentEdit.vvd.portOfRegistry, ...tempPorts]}
                initialValue={currentEdit.vvd.portOfRegistry}
                className="flex-1 min-h-10"
              />
            </div>
            <div className="flex items-center">
              <MdTypography variant="body" size="large">
                Deliver To
              </MdTypography>
            </div>
            <div>
              <SimpleRadioGroup
                key="deliverTo"
                groupName="Deliver To"
                selected="Shipper"
                options={["Shipper", "Freight Forwarder"]}
              />
            </div>
            <div className="flex items-center">
              <MdTypography variant="body" size="large">
                Method
              </MdTypography>
            </div>
            <div>
              <SimpleRadioGroup
                key="method"
                groupName="Method"
                selected="Express Email"
                options={[
                  "Express Email",
                  "Regular Email",
                  "Pick-up",
                  "e-Service",
                ]}
              />
            </div>
          </div>
          <NAOutlinedTextField
            type="textarea"
            rows={4}
            placeholder="Additional Request"
          />
          <DetailTitle title="Attachment" className="mt-6 mb-4" />
          <DndFileUploadPlaceholder className="mb-6" />
        </div>
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Cancel
        </MdTextButton>
        <MdFilledButton>Save</MdFilledButton>
      </div>
    </MdDialog>
  );
};

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
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
  } = useDropzone({
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

  useEffect(() => {
    console.log(isDragAccept);
  }, [isDragAccept]);

  return (
    <div
      className={`flex flex-col gap-4 ${className ? className : ""}
      }`}
    >
      <div
        className={`border-2 border-dashed border-outlineVariant rounded-lg flex flex-col gap-2 items-center justify-center flex-1 py-8 hover:cursor-pointer hover:bg-surfaceContainerHigh ${
          isDragAccept ? "bg-surfaceContainerHigh" : "bg-surfaceContainerLow"
        }`}
        {...getRootProps({ isFocused, isDragAccept })}
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
