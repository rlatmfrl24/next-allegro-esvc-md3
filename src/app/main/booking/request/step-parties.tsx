import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilledTonalButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdRippleEffect,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { ChevronRight, MailOutline } from "@mui/icons-material";
import { SimpleItem, SubTitle } from "./components";
import { useRecoilState } from "recoil";
import { PartiesState } from "@/app/store/booking-request.store";
import { useEffect, useMemo, useState } from "react";
import Portal from "@/app/components/portal";

export default function PartiesStep() {
  const [partiesData, setPartiesData] = useRecoilState(PartiesState);
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [newEmailRecipients, setNewEmailRecipients] = useState<Array<string>>(
    []
  );
  const [isManageEmailDialogOpen, setIsManageEmailDialogOpen] = useState(false);

  const tempBookingRequestor = useMemo(() => {
    return {
      name: partiesData.bookingRequestor.name || faker.company.name(),
      address:
        partiesData.bookingRequestor.address ||
        faker.location.streetAddress() +
          ", " +
          faker.location.city() +
          ", " +
          faker.location.country(),
      email: partiesData.bookingRequestor.email,
      telNo: partiesData.bookingRequestor.telNo || faker.phone.number(),
      fax: partiesData.bookingRequestor.fax || faker.phone.number(),
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tempEmailRecipients = useMemo(() => {
    return [
      faker.internet.email(),
      faker.internet.email(),
      faker.internet.email(),
      ...partiesData.bookingRequestor.email,
    ];
  }, [partiesData.bookingRequestor.email]);

  const [emailRecipients, setEmailRecipients] =
    useState<Array<string>>(tempEmailRecipients);

  useEffect(() => {
    setPartiesData((prev) => ({
      ...prev,
      bookingRequestor: tempBookingRequestor,
    }));
  }, [setPartiesData, tempBookingRequestor]);

  useEffect(() => {
    console.log(partiesData);
  }, [partiesData]);

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
            {partiesData.bookingRequestor.email.map((email) => {
              return (
                <MdInputChip
                  key={email}
                  label={email}
                  handleTrailingActionFocus={() => {
                    setPartiesData((prev) => ({
                      ...prev,
                      bookingRequestor: {
                        ...prev.bookingRequestor,
                        email: prev.bookingRequestor.email.filter(
                          (e) => e !== email
                        ),
                      },
                    }));
                  }}
                />
              );
            })}
          </MdChipSet>
          <button
            className="relative bg-secondaryContainer rounded-full px-3 py-2 mt-2"
            onClick={() => {
              setIsManageEmailDialogOpen(true);
            }}
          >
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
        <NAOutlinedTextField
          className="flex-1"
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
      <Portal selector="#main-container">
        <MdDialog
          className="min-w-[720px]"
          open={isManageEmailDialogOpen}
          opened={() => {
            setNewEmailRecipients(partiesData.bookingRequestor.email);
          }}
          closed={() => {
            setIsManageEmailDialogOpen(false);
          }}
        >
          <div slot="headline">Manage Email</div>
          <div slot="content" className="flex flex-col">
            <div className="flex w-full gap-2 items-center">
              <NAOutlinedTextField
                className="flex-1"
                label="Email"
                placeholder="e.g. email@email.com"
                type="email"
                value={newEmailInput}
                required
                handleValueChange={(value) => {
                  setNewEmailInput(value);
                }}
              />
              <MdFilledTonalButton
                className="h-fit"
                onClick={() => {
                  //check email validation by regex
                  const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  if (!emailRegex.test(newEmailInput)) {
                    return;
                  } else {
                    setEmailRecipients([...emailRecipients, newEmailInput]);
                    setNewEmailInput("");
                  }
                }}
              >
                Add Email
              </MdFilledTonalButton>
            </div>
            <MdTypography variant="label" size="medium" className="mt-6">
              Email Recipient
            </MdTypography>
            <MdList className="bg-surfaceContainerHigh">
              {emailRecipients.map((email) => {
                return (
                  <MdListItem
                    key={email}
                    className="relative cursor-pointer"
                    onClick={() => {
                      setNewEmailRecipients(
                        newEmailRecipients.includes(email)
                          ? newEmailRecipients.filter((e) => e !== email)
                          : [...newEmailRecipients, email]
                      );
                    }}
                  >
                    <MdRippleEffect />
                    <MdCheckbox
                      slot="start"
                      checked={newEmailRecipients.includes(email)}
                    />
                    <MdTypography variant="label" size="medium">
                      {email}
                    </MdTypography>
                    <div slot="end">
                      <ChevronRight />
                    </div>
                  </MdListItem>
                );
              })}
            </MdList>
          </div>
          <div slot="actions" className="flex gap-2">
            <MdTextButton
              onClick={() => {
                setNewEmailRecipients([]);
                setIsManageEmailDialogOpen(false);
              }}
            >
              Close
            </MdTextButton>
            <MdFilledButton
              onClick={() => {
                setPartiesData((prev) => ({
                  ...prev,
                  bookingRequestor: {
                    ...prev.bookingRequestor,
                    email: newEmailRecipients,
                  },
                }));
                setIsManageEmailDialogOpen(false);
              }}
            >
              Save
            </MdFilledButton>
          </div>
        </MdDialog>
      </Portal>
    </div>
  );
}
