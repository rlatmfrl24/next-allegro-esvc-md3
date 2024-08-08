import { DatePicker } from "@/app/components/datepickers/date-picker";
import { DividerComponent } from "@/app/components/divider";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdFilledButton,
  MdPrimaryTab,
  MdSecondaryTab,
  MdTabs,
  MdTextButton,
} from "@/app/util/md3";
import { BLIssueRequestTableProps } from "@/app/util/typeDef/documents";
import { faker } from "@faker-js/faker";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
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
            className="max-w-full whitespace-nowrap overflow-x-scroll scrollbar-hide border-b border-b-outlineVariant"
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
                className={`${
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
