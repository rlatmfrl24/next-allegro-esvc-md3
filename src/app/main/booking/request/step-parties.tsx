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
import { useRecoilState } from "recoil";
import { PartiesState } from "@/app/store/booking-request.store";
import { useEffect, useMemo } from "react";

export default function PartiesStep() {
  const [partiesData, setPartiesData] = useRecoilState(PartiesState);

  const tempBookingRequestor = useMemo(() => {
    return {
      name: faker.company.name(),
      address:
        faker.location.streetAddress() +
        ", " +
        faker.location.city() +
        ", " +
        faker.location.country(),
      email: [],
      telNo: faker.phone.number(),
      fax: faker.phone.number(),
    };
  }, []);

  useEffect(() => {
    setPartiesData((prev) => ({
      ...prev,
      bookingRequestor: tempBookingRequestor,
    }));
  }, [setPartiesData, tempBookingRequestor]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Parties
      </MdTypography>
      <SubTitle title="Booking Requestor" className="mb-4" />
      <div className="grid grid-cols-2 gap-4 w-full">
        <SimpleItem
          title="Company Name"
          value={partiesData.bookingRequestor.name}
        />
        <SimpleItem
          title="Address"
          value={partiesData.bookingRequestor.address}
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
          <SimpleItem
            title="Tel No."
            value={partiesData.bookingRequestor.telNo}
          />
          <SimpleItem title="Fax" value={partiesData.bookingRequestor.fax} />
        </div>
      </div>
      <SubTitle title="Shipper" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Company Name"
          required
          value={partiesData.shipper.name}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              shipper: {
                ...prev.shipper,
                name: value,
              },
            }));
          }}
        />
        <div className="flex-1">
          <NAOutlinedTextField
            className="w-full"
            label="Address"
            placeholder="Address (State Name, City, State & Zip Code, Country Name)"
            required
            value={partiesData.shipper.address}
            handleValueChange={(value) => {
              setPartiesData((prev) => ({
                ...prev,
                shipper: {
                  ...prev.shipper,
                  address: value,
                },
              }));
            }}
          />
        </div>
        <NaToggleButton
          label="Same as Booking Requestor"
          state={
            partiesData.shipper.address ===
              partiesData.bookingRequestor.address &&
            partiesData.shipper.name === partiesData.bookingRequestor.name
              ? "checked"
              : "unchecked"
          }
          onClick={() => {
            setPartiesData((prev) => ({
              ...prev,
              shipper: {
                ...prev.shipper,
                address: prev.bookingRequestor.address,
                name: prev.bookingRequestor.name,
              },
            }));
          }}
        />
      </div>
      <SubTitle title="Freight Forwarder" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Company Name"
          value={partiesData.freightForwarder.name}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                name: value,
              },
            }));
          }}
        />
        <div className="flex-1">
          <NAOutlinedTextField
            className="flex-1"
            label="Address"
            placeholder="Address (State Name, City, State & Zip Code, Country Name)"
            value={partiesData.freightForwarder.address}
            handleValueChange={(value) => {
              setPartiesData((prev) => ({
                ...prev,
                freightForwarder: {
                  ...prev.freightForwarder,
                  address: value,
                },
              }));
            }}
          />
        </div>
        <NaToggleButton
          label="Same as Booking Requestor"
          state={
            partiesData.freightForwarder.address ===
              partiesData.bookingRequestor.address &&
            partiesData.freightForwarder.name ===
              partiesData.bookingRequestor.name
              ? "checked"
              : "unchecked"
          }
          onClick={() => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                address: prev.bookingRequestor.address,
                name: prev.bookingRequestor.name,
              },
            }));
          }}
        />
      </div>
      <SubTitle title="Consignee" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Company Name"
          value={partiesData.consignee.name}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              consignee: {
                ...prev.consignee,
                name: value,
              },
            }));
          }}
        />
        <div className="flex-1">
          <NAOutlinedTextField
            className="flex-1"
            label="Address"
            placeholder="Address (State Name, City, State & Zip Code, Country Name)"
            value={partiesData.consignee.address}
            handleValueChange={(value) => {
              setPartiesData((prev) => ({
                ...prev,
                consignee: {
                  ...prev.consignee,
                  address: value,
                },
              }));
            }}
          />
        </div>
      </div>
      <SubTitle title="Actual" className="mt-8 mb-4" />
      <NAOutlinedTextField
        label="Shipper Name"
        value={partiesData.actualShipper}
        handleValueChange={(value) => {
          setPartiesData((prev) => ({
            ...prev,
            actualShipper: value,
          }));
        }}
      />
      <MdFilledButton className="self-end mt-4">Next</MdFilledButton>
    </div>
  );
}
