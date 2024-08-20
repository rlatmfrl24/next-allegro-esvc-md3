import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import {
  BookingRequestStepState,
  ContactInformationState,
} from "@/app/store/booking.store";
import { UserProfileState } from "@/app/store/global.store";
import { faker } from "@faker-js/faker";
import { DetailTitle } from "@/app/components/title-components";
import {
  MdCheckbox,
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdRippleEffect,
  MdTextButton,
} from "@/app/util/md3";
import { DeleteOutline, MailOutline } from "@mui/icons-material";
import Portal from "@/app/components/portal";

export default function ContactInformationStep() {
  // const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
    BookingRequestStepState
  );
  const [contactInformationData, setContactInformationData] = useRecoilState(
    ContactInformationState
  );

  const [isManageEmailDialogOpen, setIsManageEmailDialogOpen] = useState(false);
  const tempEmailRecipients = useMemo(() => {
    return [
      faker.internet.email(),
      faker.internet.email(),
      faker.internet.email(),
      ...contactInformationData.emailRecipient,
    ];
  }, [contactInformationData.emailRecipient]);
  const [emailRecipients, setEmailRecipients] =
    useState<Array<string>>(tempEmailRecipients);
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [newEmailRecipients, setNewEmailRecipients] = useState<Array<string>>(
    []
  );

  const [userData] = useRecoilState(UserProfileState);

  useEffect(() => {
    if (bookingRequestStep.contactInformation.visited) {
      return;
    }

    setContactInformationData((prev) => {
      return {
        ...prev,
        name:
          prev.name === ""
            ? userData.firstName + " " + userData.lastName
            : prev.name,
        email: prev.email === "" ? userData.email : prev.email,
        telNo: prev.telNo === "" ? userData.tel : prev.telNo,
        faxNo: prev.faxNo === "" ? userData.fax : prev.faxNo,
        address:
          prev.address === ""
            ? userData.address.street +
              ", " +
              userData.address.city +
              ", " +
              userData.address.country +
              ", " +
              userData.address.zipCode
            : prev.address,
      };
    });
  }, [
    bookingRequestStep.contactInformation.visited,
    setContactInformationData,
    userData.address.city,
    userData.address.country,
    userData.address.street,
    userData.address.zipCode,
    userData.email,
    userData.fax,
    userData.firstName,
    userData.lastName,
    userData.tel,
  ]);

  const ValidateRequired = useCallback(() => {
    if (
      contactInformationData.name === "" ||
      contactInformationData.address === "" ||
      contactInformationData.telNo === "" ||
      contactInformationData.email === ""
    ) {
      return false;
    } else {
      return true;
    }
  }, [contactInformationData]);

  useEffect(() => {
    if (ValidateRequired()) {
      setBookingRequestStep((prev) => ({
        ...prev,
        contactInformation: {
          ...prev.contactInformation,
          isCompleted: true,
        },
      }));
    } else {
      setBookingRequestStep((prev) => ({
        ...prev,
        contactInformation: {
          ...prev.contactInformation,
          isCompleted: false,
        },
      }));
    }
  }, [ValidateRequired, contactInformationData, setBookingRequestStep]);

  return (
    <div className="w-full">
      <MdTypography variant="title" size="large" className="mb-6">
        Contact Information
      </MdTypography>
      <div className="grid grid-cols-4 gap-4 w-full">
        <NAOutlinedTextField
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.name === ""
          }
          errorText="Name is required"
          value={contactInformationData.name}
          label="Name"
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                name: value,
              };
            });
          }}
        />
        {/* <NAOutlinedTextField
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.email === ""
          }
          errorText="Email is required"
          value={contactInformationData.email}
          label="Email"
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                email: value,
              };
            });
          }}
        /> */}

        <NAOutlinedTextField
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.telNo === ""
          }
          errorText="Tel No. is required"
          value={contactInformationData.telNo}
          label="Tel No."
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                telNo: value,
              };
            });
          }}
        />
        <NAOutlinedTextField
          value={contactInformationData.faxNo}
          label="Fax No."
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                faxNo: value,
              };
            });
          }}
        />
        <NAOutlinedTextField
          className="col-span-2"
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.address === ""
          }
          errorText="Address is required"
          type="textarea"
          value={contactInformationData.address}
          label="Address"
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                address: value,
              };
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <DetailTitle title="Email Recipient" />
        <div className="flex items-center gap-4">
          <MdOutlinedButton
            hasIcon
            onClick={() => {
              setIsManageEmailDialogOpen(true);
            }}
          >
            <MdIcon slot="icon">
              <MailOutline fontSize="small" />
            </MdIcon>
            Manage Email
          </MdOutlinedButton>
          {contactInformationData.emailRecipient.length > 0 && (
            <MdChipSet>
              {contactInformationData.emailRecipient.map((email) => {
                return (
                  <MdInputChip
                    selected
                    key={email}
                    label={email}
                    remove={() => {
                      setContactInformationData((prev) => {
                        return {
                          ...prev,
                          emailRecipient: prev.emailRecipient.filter(
                            (e) => e !== email
                          ),
                        };
                      });
                    }}
                  />
                );
              })}
            </MdChipSet>
          )}
        </div>
      </div>
      <Portal selector="#main-container">
        <MdDialog
          className="min-w-[720px]"
          open={isManageEmailDialogOpen}
          opened={() => {
            setNewEmailRecipients(contactInformationData.emailRecipient);
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
            <MdTypography variant="title" size="medium" className="mt-6">
              Email Recipient
            </MdTypography>
            <MdList className="bg-surfaceContainerLow">
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
                    <MdTypography variant="body" size="large">
                      {email}
                    </MdTypography>
                    <div slot="end">
                      <MdIconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setEmailRecipients(
                            emailRecipients.filter((e) => e !== email)
                          );
                          setNewEmailRecipients(
                            newEmailRecipients.filter((e) => e !== email)
                          );
                        }}
                      >
                        <DeleteOutline fontSize="small" />
                      </MdIconButton>
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
                setContactInformationData((prev) => {
                  return {
                    ...prev,
                    emailRecipient: newEmailRecipients,
                  };
                });
                setIsManageEmailDialogOpen(false);
              }}
            >
              Apply
            </MdFilledButton>
          </div>
        </MdDialog>
      </Portal>
    </div>
  );
}
