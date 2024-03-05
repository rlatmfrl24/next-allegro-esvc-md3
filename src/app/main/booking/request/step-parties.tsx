import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdFilledButton,
  MdFilledTonalButton,
  MdInputChip,
  MdOutlinedTextField,
  MdRippleEffect,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { MailOutline } from "@mui/icons-material";
import { SimpleItem, SubTitle } from "./components";

export default function PartiesStep() {
  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Parties
      </MdTypography>
      <SubTitle title="Booking Requestor" className="mb-4" />
      <div className="grid grid-cols-2 gap-4 w-full">
        <SimpleItem title="Company Name" value={faker.company.name()} />
        <SimpleItem
          title="Address"
          value={
            faker.location.streetAddress() +
            ", " +
            faker.location.city() +
            ", " +
            faker.location.country()
          }
        />
        <div className="mt-4">
          <MdTypography
            variant="label"
            size="medium"
            className="text-outline mb-2"
          >
            Email Recipient
          </MdTypography>
          <MdChipSet>
            <MdInputChip label="John Doe" />
            <MdInputChip label="John Doe" />
            <MdInputChip label="John Doe" />
          </MdChipSet>
          <button className="relative bg-secondaryContainer rounded-full px-3 py-2 mt-2">
            <MdRippleEffect />
            <MdTypography variant="label" size="medium">
              <MailOutline
                sx={{
                  fontSize: "16px",
                }}
                className="mr-1"
              />
              Manage Email
            </MdTypography>
          </button>
        </div>
        <div className="flex w-full mt-4">
          <SimpleItem title="Tel No." value={faker.phone.number()} />
          <SimpleItem title="Fax" value={faker.phone.number()} />
        </div>
      </div>
      <SubTitle title="Shipper" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Company Name"
          required
          value=""
          handleValueChange={() => {}}
        />
        <div className="flex-1">
          <NAOutlinedTextField
            className="w-full"
            label="Address"
            placeholder="Address (State Name, City, State & Zip Code, Country Name)"
            required
            value=""
            handleValueChange={() => {}}
          />
        </div>
        <NaToggleButton label="Same as Booking Requestor" state="checked" />
      </div>
      <SubTitle title="Freight Forwarder" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <MdOutlinedTextField label="Company Name" />
        <MdOutlinedTextField
          className="flex-1"
          label="Address"
          placeholder="Address (State Name, City, State & Zip Code, Country Name)"
        />
        <NaToggleButton label="Same as Booking Requestor" state="checked" />
      </div>
      <SubTitle title="Consignee" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <MdOutlinedTextField label="Company Name" />
        <MdOutlinedTextField
          className="flex-1"
          label="Address"
          placeholder="Address (State Name, City, State & Zip Code, Country Name)"
        />
      </div>
      <SubTitle title="Actual" className="mt-8 mb-4" />
      <MdOutlinedTextField label="Shipper Name" />
      <MdFilledButton className="self-end mt-4">Next</MdFilledButton>
    </div>
  );
}
