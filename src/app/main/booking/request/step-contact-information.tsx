import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  BookingRequestStepState,
  ContactInformationState,
} from "@/app/store/booking.store";
import {
  MdCheckbox,
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilledTonalButton,
  MdIconButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdRippleEffect,
  MdTextButton,
} from "@/app/util/md3";
import { DeleteOutline, MailOutline } from "@mui/icons-material";
import Portal from "@/app/components/portal";
import { SubTitle } from "@/app/components/title-components";

export default function ContactInformationStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [contactInformationData, setContactInformationData] = useRecoilState(
    ContactInformationState
  );

  const tempEmailRecipients = useMemo(() => {
    return [
      faker.internet.email(),
      faker.internet.email(),
      faker.internet.email(),
      ...contactInformationData.emailRecipient,
    ];
  }, [contactInformationData.emailRecipient]);

  const [isManageEmailDialogOpen, setIsManageEmailDialogOpen] = useState(false);
  const [emailRecipients, setEmailRecipients] =
    useState<Array<string>>(tempEmailRecipients);
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [newEmailRecipients, setNewEmailRecipients] = useState<Array<string>>(
    []
  );

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
      <div className="grid grid-cols-2 gap-4 w-full">
        <NAOutlinedTextField
          required
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
        <NAOutlinedTextField
          required
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
        />

        <NAOutlinedTextField
          required
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
      <SubTitle title="Email Recipient" className="mt-6 mb-4" />
      <MdChipSet>
        {contactInformationData.emailRecipient.map((email) => {
          return (
            <MdInputChip
              key={email}
              label={email}
              handleTrailingActionFocus={() => {
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
              Save
            </MdFilledButton>
          </div>
        </MdDialog>
      </Portal>
    </div>
  );
}
