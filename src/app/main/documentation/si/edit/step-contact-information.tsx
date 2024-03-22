import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  SIEditContactInformationState,
  SIEditStepState,
} from "@/app/store/si.store";
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
  MdOutlinedTextField,
  MdRippleEffect,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { DeleteOutline, MailOutline } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function StepContactInformation() {
  const setSIEditStep = useSetRecoilState(SIEditStepState);
  const [contactInformationStore, setContactInformationStore] = useRecoilState(
    SIEditContactInformationState
  );
  const [isManageEmailDialogOpen, setIsManageEmailDialogOpen] = useState(false);
  const tempEmailRecipients = useMemo(() => {
    return [
      faker.internet.email(),
      faker.internet.email(),
      faker.internet.email(),
      ...contactInformationStore.emailRecipient,
    ];
  }, [contactInformationStore.emailRecipient]);
  const [emailRecipients, setEmailRecipients] =
    useState<Array<string>>(tempEmailRecipients);
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [newEmailRecipients, setNewEmailRecipients] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    setSIEditStep((prev) => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        isCompleted:
          !!contactInformationStore.name &&
          !!contactInformationStore.telNumber &&
          !!contactInformationStore.phone &&
          !!contactInformationStore.fax,
      },
    }));
  }, [
    contactInformationStore.fax,
    contactInformationStore.name,
    contactInformationStore.phone,
    contactInformationStore.telNumber,
    setSIEditStep,
  ]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Contact Information
      </MdTypography>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <NAOutlinedTextField
            required
            label="Name"
            value={contactInformationStore.name}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  name: value,
                };
              });
            }}
          />
          <NAOutlinedTextField
            required
            label="Tel No."
            type="tel"
            value={contactInformationStore.telNumber}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  telNumber: value,
                };
              });
            }}
          />
          <NAOutlinedTextField
            required
            label="Phone"
            type="tel"
            value={contactInformationStore.phone}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  phone: value,
                };
              });
            }}
          />
          <NAOutlinedTextField
            required
            label="Fax"
            type="tel"
            value={contactInformationStore.fax}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  fax: value,
                };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <DetailTitle title="Email Recipient" />
          {contactInformationStore.emailRecipient.length > 0 && (
            <MdChipSet>
              {contactInformationStore.emailRecipient.map((email) => {
                return (
                  <MdInputChip
                    key={email}
                    label={email}
                    handleTrailingActionFocus={() => {
                      setContactInformationStore((prev) => {
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

          <button
            className="relative bg-secondaryContainer rounded-full px-3 py-2 w-fit"
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
        <div className="flex flex-col gap-4">
          <DetailTitle title="Email Notification Subscription" />
          <div className="flex flex-col gap-1">
            <NaToggleButton
              label="Roll-Over (Including T/S)"
              state={
                contactInformationStore.subscrition.rollOver
                  ? "checked"
                  : "unchecked"
              }
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    subscrition: {
                      ...prev.subscrition,
                      rollOver: !prev.subscrition.rollOver,
                    },
                  };
                });
              }}
            />
            <NaToggleButton
              label="Vessel Departure"
              state={
                contactInformationStore.subscrition.vesselDeparture
                  ? "checked"
                  : "unchecked"
              }
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    subscrition: {
                      ...prev.subscrition,
                      vesselDeparture: !prev.subscrition.vesselDeparture,
                    },
                  };
                });
              }}
            />
            <NaToggleButton
              label="Vessel Advance / Delay"
              state={
                contactInformationStore.subscrition.vesselAdvanceDelay
                  ? "checked"
                  : "unchecked"
              }
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    subscrition: {
                      ...prev.subscrition,
                      vesselAdvanceDelay: !prev.subscrition.vesselAdvanceDelay,
                    },
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      <Portal selector="#main-container">
        <MdDialog
          className="min-w-[720px]"
          open={isManageEmailDialogOpen}
          opened={() => {
            setNewEmailRecipients(contactInformationStore.emailRecipient);
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
                setContactInformationStore((prev) => {
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